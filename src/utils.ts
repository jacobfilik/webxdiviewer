import ndarray from "ndarray";
import { PolynomialRegression } from "ml-regression-polynomial";
import { sgg } from "ml-savitzky-golay-generalized";

function closest_index(data, value) {
  let minDiff = Infinity;
  let index = 0;

  for (let i = 0; i < data.length; i++) {
    const absdiff = Math.abs(data[i] - value);

    if (absdiff < minDiff) {
      minDiff = absdiff;
      index = i;
    }
  }

  return index;
}

function argmax(data) {
  let maxVal = -Infinity;
  let index = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i] > maxVal) {
      maxVal = data[i];
      index = i;
    }
  }

  return index;
}

export function pre_edge(energy: number[], ydata: number[]) {
  //hastely copied from https://github.com/xraypy/xraylarch larch/xafs/pre_edge.py
  //Use argmax of derivate to get e0
  const der = sgg(ydata, energy, {
    windowSize: 9,
    derivative: 1,
    polynomial: 3,
  });

  const ie0 = argmax(der);

  const e0 = energy[ie0];

  //Guess sensible
  let scale = 5.0;

  if (ie0 < 20) {
    scale = 2.0;
  }

  const pre1 = scale * Math.round((energy[1] - e0) / scale);
  const pre2 = 0.5 * pre1;

  const ipre1 = closest_index(energy, pre1 + e0);
  const ipre2 = closest_index(energy, pre2 + e0);

  //Guess start and end position for pre-edge fit (needs refinement)
  //then fit with linear and subtract
  const ypre = ydata.slice(ipre1, ipre2);
  const xpre = energy.slice(ipre1, ipre2);

  const pre_edge_function = new PolynomialRegression(xpre, ypre, 1);

  const norm = ydata.map((y, i) => y - pre_edge_function.predict(energy[i]));

  //Guess start and end for post-edge fit
  //then fit, determine edge step and flatten
  const norm2 = 5.0 * Math.round((energy[energy.length - 1] - e0) / 5.0);
  const norm1 = 5.0 * Math.round(norm2 / 15.0);
  const nnorm = 2;

  const p1 = closest_index(energy, norm1 + e0);
  const p2 = closest_index(energy, norm2 + e0);

  const post_edge_function = new PolynomialRegression(
    energy.slice(p1, p2),
    norm.slice(p1, p2),
    nnorm
  );

  const edge_step = post_edge_function.predict(e0);

  for (let i = ie0; i < norm.length; i++) {
    norm[i] = norm[i] - post_edge_function.predict(energy[i]) + edge_step;
  }

  const ansArray = ndarray(
    norm.map((x) => x / edge_step),
    [norm.length]
  );

  return ansArray;
}
