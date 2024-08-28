import { createContext } from "react";
import { XASStandard } from "../models";
import useMetadata from "../hooks/useMetadata";

const MetadataContext = createContext<XASStandard[]>([]);

function MetadataProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const appMetadata = useMetadata();

  return (
    <MetadataContext.Provider value={appMetadata}>
      {children}
    </MetadataContext.Provider>
  );
}

export { MetadataContext, MetadataProvider };