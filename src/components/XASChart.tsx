import {
  LineVis,
  getDomain,
  Separator,
  Selector,
  Toolbar,
  ScaleType,
  CurveType,
  ToggleBtn,
  getCombinedDomain,
} from "@h5web/lib";

import "@h5web/lib/dist/styles.css";

import Paper from "@mui/material/Paper";

import { MdGridOn } from "react-icons/md";
import { useTheme, Theme } from "@mui/material";
import { useState, useEffect } from "react";

import ndarray from "ndarray";
import { Box } from "@mui/material";
import { XASData } from "../models";

export interface XASChartState {
  showTrans: boolean;
  showFluor: boolean;
  showRefer: boolean;
}

function XASChart(props: { xasData: XASData | null }) {
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
  const [curveOption, setCurveOption] = useState(curveOptions[0]);

  const theme = useTheme();

  const { showTrans, showFluor, showRefer } = chartState;
  const xasdata = props.xasData;

  const contains = [
    props.xasData?.mutrans != null,
    props.xasData?.mufluor != null,
    props.xasData?.murefer != null,
  ];

  let xdata: ndarray.NdArray<number[]> = ndarray([0]);
  let ydata: ndarray.NdArray<number[]> = ndarray([0]);

  const aux = [];

  let ydataLabel = "";

  const hideAll = !showTrans && !showFluor && !showRefer;

  if (xasdata != null && !hideAll) {
    xdata = ndarray(xasdata.energy, [xasdata.energy.length]);

    let primaryFound = false;

    if (showTrans && xasdata.mutrans) {
      primaryFound = true;
      ydata = ndarray(xasdata.mutrans, [xasdata.mutrans.length]);
      ydataLabel = "Transmission";
    }

    if (showFluor && xasdata.mufluor) {
      const fdata = ndarray(xasdata.mufluor, [xasdata.mufluor.length]);
      if (!primaryFound) {
        primaryFound = true;
        ydata = fdata;
        ydataLabel = "Fluorescence";
      } else {
        aux.push({ label: "Fluorescence", array: fdata });
      }
    }

    if (showRefer && xasdata.murefer) {
      const rdata = ndarray(xasdata.murefer, [xasdata.murefer.length]);
      if (!primaryFound) {
        primaryFound = true;
        ydata = rdata;
        ydataLabel = "Reference";
      } else {
        aux.push({ label: "Reference", array: rdata });
      }
    }
  }

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
    "--h5w-line--colorAux": [
      theme.palette.success.light,
      theme.palette.secondary.dark,
    ],
  } as React.CSSProperties;

  const domain = getCombinedDomain(
    [getDomain(ydata)].concat(aux.map((a) => getDomain(a.array)))
  );

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
        <LineVis
          abscissaParams={{
            value: xdata.data,
            scaleType: ScaleType.Linear,
            label: "Energy",
          }}
          dataArray={ydata}
          ordinateLabel={ydataLabel}
          domain={domain}
          showGrid={useGrid}
          curveType={curveOption}
          scaleType={ScaleType.SymLog}
          auxiliaries={aux}
        />
      </Box>
    </Paper>
  );
}

export { XASChart };
