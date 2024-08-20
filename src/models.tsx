export interface Element {
    symbol: string;
    z: number;
  }
  
  export interface Edge {
    name: string;
    id: number;
  }
  
  export interface Person {
    identifier: string;
  }
  
  export interface XASData {
    energy: Array<number>;
    mutrans: Array<number>;
    mufluor: Array<number>;
    murefer: Array<number>;
  }
  
  export interface Beamline {
    name: string;
    facility: Facility;
    id: number;
  }
  
  export interface Facility {
    name: string;
  }
  
  export interface XASStandard {
    id: number;
    element: Element;
    edge: Edge;
    sample_name: string;
    sample_prep: string;
    sample_comp: string;
    doi: string;
    citation: string;
    facility: string;
    collection_date: string;
    beamline: Beamline;
  }
  
  export interface AdminXASStandard extends XASStandard {
    submitter: Person
  }
  
  export interface XASStandardInput {
    file1: File;
    licence: string;
  }
  
  export interface AppMetadata {
    beamlines: Beamline[];
    elements: Element[];
    edges: Edge[];
    licences: string[];
    sample_forms: string[];
  }
  
  export interface User {
    identifier: string;
    admin: boolean;
  }