import { filter } from "lodash";

export default function calculateMediumPolution(cities, data) {
  var polutionInCities = [];
  cities.forEach(city => {
    var cityData = filter(data, x => x.city === city);

    var sum = 0;
    cityData.forEach(city => {
      sum = sum + city.value;
    });

    var result = sum / cityData.length;

    polutionInCities.push({ polution: result, city: city });
  });
  return polutionInCities;
}
