export interface Element {
  symbol: string;
}

export interface Edge {
  name: string;
}

export interface XASData {
  energy: Array<number>;
  mutrans: Array<number> | null;
  mufluor: Array<number> | null;
  murefer: Array<number> | null;
}

export interface Beamline {
  name: string;
}

export interface Facility {
  name: string;
}

export interface Sample {
  name: string;
  formula: string;
  prep: string;
}

export interface XASStandard {
  id: number;
  element: Element;
  edge: Edge;
  sample: Sample;
  doi: string;
  facility: Facility;
  start_time: string;
  beamline: Beamline;
  location: string;
}

// export interface XASStandardCollection {
//   [key: string] : XASStandard
// }
