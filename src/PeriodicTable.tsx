import PeriodicTable, { OnClick } from "@celadora/periodic-table";
import { Context } from "@celadora/periodic-table";
import elements from "@celadora/periodic-table/elements";
import { useContext } from "react";

import { useTheme } from "@mui/material";

import { Box } from "@mui/material";

type Props = {
  atomicNumber: number;
};

type OuterProps = {
  backgroundColor: string;
  textColor: string;
};

function OuterNewElement({ backgroundColor, textColor }: OuterProps) {
  return function NewElement({ atomicNumber }: Props) {
    const { onClick } = useContext(Context);

    const element = elements[atomicNumber - 1];
    if (!element) {
      return <div></div>;
    }

    return (
      <div
        className="element"
        onClick={(e) => {
          onClick?.apply(null, [e, element]);
        }}
        style={{
          backgroundColor: backgroundColor,
          textAlign: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          borderRadius: 3,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="symbol"
          style={{
            color: textColor,
            fontSize: "small",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {element.Symbol}
        </div>
        {/* <div className="number" style={{ position: 'absolute', top: 0, left: 1 }}>{atomicNumber}</div> */}
      </div>
    );
  };
}

function SimplePeriodicTable(props: {
  onClickElement: React.Dispatch<number>;
  elementSize: number;
}) {
  const handleClick: OnClick = (e, element) => {
    props.onClickElement(Number(element.Number));
  };

  const theme = useTheme();

  const bg = theme.palette.background.default;
  const fg = theme.palette.primary.main;
  const text = theme.palette.primary.contrastText;

  return (
    <Box sx={{ bgcolor: bg }}>
      <PeriodicTable
        onClick={handleClick}
        Element={OuterNewElement({ backgroundColor: fg, textColor: text })}
        squareSize={props.elementSize}
        margin={0}
      />
    </Box>
  );
}

export default SimplePeriodicTable;
