import { createContext } from "react";
import XDIFile from "../xdifile";

interface XDIState {
  xdiFile: XDIFile | null;
  setXDIFile: (xdiFile: XDIFile) => void;
  comparisonFiles: XDIFile[];
  setComparisonFiles: (xdiFiles: XDIFile[]) => void;
}

const XDIFileContext = createContext<XDIState>({
  xdiFile: null,
  setXDIFile: () => {},
  comparisonFiles: [],
  setComparisonFiles: () => {},
});

function XDIFileProvider(props: {
  children: React.ReactNode;
  value: XDIState;
}) {
  const { children } = props;

  return (
    <XDIFileContext.Provider value={props.value}>
      {children}
    </XDIFileContext.Provider>
  );
}

export { XDIFileContext, XDIFileProvider };
