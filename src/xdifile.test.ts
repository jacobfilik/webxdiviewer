import { it, expect, describe } from "vitest";

import fs from "fs";
import XDIFile from "./xdifile";

describe("Parse info from xdi file", () =>
  new Promise((done) => {
    fs.readFile(
      "test.xdi",
      "utf8",
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) throw err;
        const xdi = XDIFile.parseFile(data);

        it("Check element", () => {
          expect(xdi.element).toBe("Cu");
        });

        it("Check edge", () => {
          expect(xdi.edge).toBe("K");
        });

        it("Check sample", () => {
          expect(xdi.sample?.name).toBe("Cu Formate");
          expect(xdi.sample?.prep).toBe("Pressed pellet");
          expect(xdi.sample?.stoichiometry).toBe("C2 H2 Cu O4");
        });

        it("Check date", () => {
          expect(xdi.date).toBe("2001-06-26T22:27:31");
        });

        it("Check columns valid", () => {
          expect(xdi.checkValid()).toBe(true);
        });

        it("Check mu trans valid", () => {
          expect(xdi.muTrans()).not.toEqual(null);
        });

        it("Check mu ref valid", () => {
          expect(xdi.muRefer()).not.toEqual(null);
        });

        it("Check mu fluor null", () => {
          expect(xdi.muFluor()).toEqual(null);
        });

        done();
      }
    );
  }));
