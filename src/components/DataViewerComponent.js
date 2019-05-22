import React, { Component } from "react";
import "./App.scss";
import CityCard from "./CityCard";
import noData from "./images/noData.PNG";

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
    var { cities } = this.props;

    return (
      <div className="dataViewerContainer">
        {cities.length === 0 ? (
          <div>
            <img
              className="noDataViewerCard"
              src={noData}
              alt="no data in DB"
            />
            <p className="noDataText">
              Please, choose another pollution factor
            </p>
          </div>
        ) : (
          <div>
            {cities.map(city => (
              <CityCard
                key={city.city}
                city={city}
                positon={cities.indexOf(city) + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default DataViewerComponent;
