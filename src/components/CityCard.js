import React, { Component } from "react";
import "./App.scss";

export class CityCard extends Component {
  state = {
    cityDescription: []
  };

  componentWillMount() {
    this.setState({
      cityDescription: Promise.resolve(this.getWikiData(this.props.city.city))
        .PromiseValue
    });
  }

  async getWikiData(wikiCity) {
    var apiResponseText = [];
    var url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${wikiCity}&sectionsnippet=search&format=json`;
    await fetch(url)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(wiki => {
        apiResponseText = wiki.query.search[0].snippet;
      })
      .catch(error => console.log(error + " UPS...something went wrong!"));
    var html = apiResponseText;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";

    this.setState({
      cityDescription: text
    });
  }

  render() {
    var { city, positon } = this.props;
    return (
      <div className="dataViewerCard" key={city.city}>
        <div>
          <h2>{positon}</h2>
          <h3>City: {city.city}</h3>
          <h4>Average pollution: {Math.round(city.polution)} µg/m³</h4>
          <h4>About city: </h4>
          <span>{this.state.cityDescription}</span>
        </div>
      </div>
    );
  }
}

export default CityCard;
