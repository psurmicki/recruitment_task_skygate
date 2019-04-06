import React, { Component } from "react";
import "./App.scss";
import CityCard from "./CityCard";

export class DataViewerComponent extends Component {
  getWikiApiUrls(cities) {
    var wikiApiUrls = [];
    cities.forEach(wikiCity =>
      wikiApiUrls.push(
        `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${wikiCity}&sectionsnippet=search&format=json`
      )
    );
    return wikiApiUrls;
  }
  render() {
    var { cities, currentPolution } = this.props;

    return (
      <div>
        <div className="centerContainer">
          <h2>Selected pollution: {currentPolution.toUpperCase()}</h2>
        </div>
        <div className="dataViewerContainer">
          {cities.map(city => (
            <CityCard
              key={city.city}
              city={city}
              positon={cities.indexOf(city) + 1}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default DataViewerComponent;
