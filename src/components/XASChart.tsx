import {
  DataCurve,
  TooltipMesh,
  getDomain,
  Separator,
  Selector,
  Toolbar,
  CurveType,
  ToggleBtn,
  VisCanvas,
  getCombinedDomain,
  DefaultInteractions,
  Domain,
  ResetZoomButton,
  AxisConfig,
  Overlay,
} from "@h5web/lib";

import "@h5web/lib/dist/styles.css";

import { darken, lighten } from "@mui/material";

import { ReactElement } from "react";

import Paper from "@mui/material/Paper";

import { MdGridOn } from "react-icons/md";
import { useTheme, Theme } from "@mui/material";
import { useState, useEffect, useMemo } from "react";

import ndarray, { TypedArray } from "ndarray";
import { Box } from "@mui/material";
import { XASData } from "../models";
import { pre_edge } from "../utils";

interface DisplayData {
  label: string;
  x: TypedArray;
  y: TypedArray;
  color: string;
}

export interface XASChartState {
  showTrans: boolean;
  showFluor: boolean;
  showRefer: boolean;
}

function buildDisplayData(
  xasData: XASData,
  type: Pick<XASData, "mutrans" | "mufluor" | "murefer">,
  normalize: boolean,
  label: string,
  color: string
): DisplayData {
  const ydata = xasData[type];
  const xdata = xasData.energy;

  const y = normalize ? pre_edge(xdata, ydata) : ndarray(ydata, [ydata.length]);

  return { x: xdata, y: y, label: label + ":" + type, color: color };
}

function createDisplayData(
  xasData: XASData | null,
  showTrans: boolean,
  showFluor: boolean,
  showRefer: boolean,
  normalize: boolean,
  colors: string[]
): DisplayData[] {
  const hideAll = !showTrans && !showFluor && !showRefer;

  const alldata: DisplayData[] = [];

  if (hideAll || xasData == null) {
    return alldata;
  }

  if (showRefer && xasData.murefer) {
    alldata.push(
      buildDisplayData(xasData, "murefer", normalize, xasData.id, colors[2])
    );
  }

  if (showFluor && xasData.mufluor) {
    alldata.push(
      buildDisplayData(xasData, "mufluor", normalize, xasData.id, colors[1])
    );
  }

  if (showTrans && xasData.mutrans) {
    alldata.push(
      buildDisplayData(xasData, "mutrans", normalize, xasData.id, colors[0])
    );
  }

  return alldata;
}

function displayDataToDataCurve(
  displayData: DisplayData,
  curveType: CurveType
): JSX.Element {
  return (
    <DataCurve
      key={displayData.label}
      abscissas={displayData.x}
      ordinates={displayData.y.data}
      curveType={curveType}
      color={displayData.color}
    />
  );
}

function XASChart(props: {
  xasData: XASData | null;
  comparisonFiles: XASData[];
}) {
  const [chartState, setChartState] = useState<XASChartState>({
    showTrans: false,
    showFluor: false,
    showRefer: false,
  });

  useEffect(() => {
    setChartState({
      showTrans: props.xasData?.mutrans != null,
      showFluor: props.xasData?.mufluor != null,
      showRefer: props.xasData?.murefer != null,
    });
  }, [props.xasData]);

  const curveOptions: CurveType[] = Object.values(
    CurveType
  ) as Array<CurveType>;

  const [useGrid, setUseGrid] = useState(true);
  const [useNorm, setUseNorm] = useState(true);
  const [curveOption, setCurveOption] = useState(curveOptions[0]);

  const theme = useTheme();

  const { showTrans, showFluor, showRefer } = chartState;

  const contains = [
    props.xasData?.mutrans != null,
    props.xasData?.mufluor != null,
    props.xasData?.murefer != null,
  ];

  const tooltipText = (x: number, y: number): ReactElement<string> => {
    return (
      <p>
        {x.toPrecision(8)}, {y.toPrecision(8)}
      </p>
    );
  };

  const dd = createDisplayData(
    props.xasData,
    showTrans,
    showFluor,
    showRefer,
    useNorm,
    [
      darken(theme.palette.primary.dark, 0.3),
      darken(theme.palette.success.light, 0.3),
      darken(theme.palette.secondary.dark, 0.3),
    ]
  );

  const filteredComparison: XASData[] = props.comparisonFiles.filter(
    (f) => f.id != props.xasData?.id
  );

  const ddcompare: DisplayData[] = filteredComparison
    .map((f, i) => {
      return createDisplayData(f, showTrans, showFluor, showRefer, useNorm, [
        lighten(theme.palette.primary.dark, i * 0.3),
        lighten(theme.palette.success.light, i * 0.3),
        lighten(theme.palette.secondary.dark, i * 0.3),
      ]);
    })
    .flat();

  dd.push(...ddcompare);

  const domain: Domain | undefined = getCombinedDomain(
    dd.map((a) => getDomain(a.y))
  );
  const xdomain: Domain | undefined = getCombinedDomain(
    dd.map((a) => getDomain(a.x))
  );

  const abscissaConfig: AxisConfig = {
    visDomain: xdomain ?? [0, 1],
    showGrid: true,
    isIndexAxis: false,
    label: "Energy (eV)",
  };

  const ordinateConfig: AxisConfig = {
    visDomain: domain ?? [0, 1],
    showGrid: true,
    isIndexAxis: false,
    label: useNorm ? "mu(E) (norm)" : "mu(E)",
  };

  const legendColor = theme.palette.action.hover;

  const toolbarstyle = {
    "--h5w-toolbar--bgColor": theme.palette.action.hover,
    "--h5w-tickLabels--color": theme.palette.text.primary,
    "--h5w-ticks--color": theme.palette.text.primary,
    "--h5w-grid--color": "black",
    "--h5w-toolbar-label--color": theme.palette.primary.dark,
    "--h5w-btn-hover--bgColor": theme.palette.action.hover,
    "--h5w-btnPressed--bgColor": theme.palette.action.selected,
    "--h5w-selector-menu--bgColor": theme.palette.background.default,
    "--h5w-selector-option-selected--bgColor": theme.palette.action.selected,
  } as React.CSSProperties;

  const plotstyle = {
    "--h5w-tickLabels--color": theme.palette.text.primary,
    "--h5w-ticks--color": theme.palette.text.primary,
    "--h5w-grid--color": theme.palette.text.secondary,
    "--h5w-axisLabels--color": theme.palette.text.primary,
    "--h5w-line--color": theme.palette.primary.dark,
    "--h5w-tooltip--bgColor": theme.palette.action.hover,
    "--h5w-tooltip--color": theme.palette.text.primary,
    "--h5w-line--colorAux": [
      theme.palette.success.light,
      theme.palette.secondary.dark,
    ],
  } as React.CSSProperties;

  return (
    <Paper
      // flexdirection="column"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: (theme: Theme) => theme.palette.background.default,
        fontFamily: (theme: Theme) => theme.typography.fontFamily,
      }}
    >
      <Box style={toolbarstyle}>
        <Toolbar>
          <ToggleBtn
            label="Normalize"
            value={useNorm}
            onToggle={() => {
              setUseNorm(!useNorm);
            }}
          />
          <Separator />
          <ToggleBtn
            label="Transmission"
            value={showTrans}
            onToggle={() => {
              setChartState({ ...chartState, showTrans: !showTrans });
            }}
            disabled={!contains[0]}
          />
          <ToggleBtn
            label="Fluorescence"
            value={showFluor}
            onToggle={() => {
              setChartState({ ...chartState, showFluor: !showFluor });
            }}
            disabled={!contains[1]}
          />
          <ToggleBtn
            label="Reference"
            value={showRefer}
            onToggle={() => {
              setChartState({ ...chartState, showRefer: !showRefer });
            }}
            disabled={!contains[2]}
          />
          <Separator />
          <Selector<CurveType>
            label="Line Style"
            onChange={(o) => {
              setCurveOption(o);
            }}
            options={curveOptions}
            value={curveOption}
            renderOption={(option) => (
              <div>
                <span>{String(option)}</span>
              </div>
            )}
          />
          <Separator />
          <ToggleBtn
            label="Grid"
            icon={MdGridOn}
            value={useGrid}
            onToggle={() => setUseGrid(!useGrid)}
          />
        </Toolbar>
      </Box>
      <Box style={plotstyle} flex={1} display="flex">
        <VisCanvas
          title={props.xasData?.id ?? " "}
          abscissaConfig={abscissaConfig}
          ordinateConfig={ordinateConfig}
        >
          {dd.map((d) => displayDataToDataCurve(d, curveOption))}
          <TooltipMesh renderTooltip={tooltipText} />
          <DefaultInteractions />
          <ResetZoomButton />
          <Overlay>
            <div
              style={{
                color: theme.palette.text.primary,
                position: "absolute",
                maxWidth: "35%",
                minWidth: "15em",
                padding: "0 1rem",
                bottom: "2.5rem",
                right: "0px",
                background: legendColor,
              }}
            >
              {dd.reverse().map((d) => (
                <div key={d.label}>
                  <span style={{ color: d.color }}> &#9632;</span>
                  <span>{"\xa0" + d.label}</span>
                </div>
              ))}
            </div>
          </Overlay>
        </VisCanvas>
      </Box>
    </Paper>
  );
}

export { XASChart };
