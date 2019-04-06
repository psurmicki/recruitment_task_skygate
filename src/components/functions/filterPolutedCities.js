import { sortBy, take, filter } from "lodash";
import calculateMediumPolution from "./calculateMediumPolution";

export default function filterPolutedCities(data, polutionParam) {
  var polutionData = filter(data, x => x.parameter === polutionParam);
  const cityNames = [...new Set(polutionData.map(polution => polution.city))];

  return take(
    sortBy(
      calculateMediumPolution(cityNames, polutionData),
      "polution"
    ).reverse(),
    10
  );
}
