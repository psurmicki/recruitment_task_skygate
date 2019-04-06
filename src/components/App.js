import React, { Component } from "react";
import DataViewerComponent from "./DataViewerComponent";
import "./App.scss";
import filterPolutedCities from "./functions/filterPolutedCities";

const countriesList = ["GERMANY", "FRANCE", "POLAND", "SPAIN"];

const polutionFactors = ["co", "so2", "o3", "bc", "no2", "pm25", "pm10"];

class App extends Component {
  state = {
    currentCities: [],
    shortcut: "",
    pollution: "",
    city: "",
    newData: {}
  };

  handleInputChange = e => {
    const country = e.target.value;

    var shortcut = "";

    if (country === "GERMANY") {
      shortcut = "GE";
    } else if (country === "FRANCE") {
      shortcut = "FR";
    } else if (country === "POLAND") {
      shortcut = "PL";
    } else if (country === "SPAIN") {
      shortcut = "ES";
    } else return null;

    this.setState({
      shortcut
    });
  };

  async handleDataFetch() {
    const { shortcut } = this.state;
    const weatherAPI = `https://api.openaq.org/v1/measurements?country=${shortcut}`;

    await fetch(weatherAPI)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(newData => {
        this.setState({
          newData
        });
      })
      .catch(error => console.log(error + " UPS...something went wrong!"));
  }

  handlePollution(e, polutionParam) {
    var data = this.state.newData.results;
    var tenMostPoluted = filterPolutedCities(data, polutionParam);
    this.setState({
      currentCities: tenMostPoluted,
      pollution: polutionParam
    });
  }

  render() {
    return (
      <div>
        <h1 className="centerContainer">
          Check the most polluted cities in one of four countries!
        </h1>
        <div className="centerContainer">
          <select onChange={e => this.handleInputChange(e)}>
            <option disabled selected value="">
              {" "}
              -- select an option --{" "}
            </option>
            {countriesList.map(country => (
              <option value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="centerContainer">
          <button className="button" onClick={e => this.handleDataFetch(e)}>
            Show me results!
          </button>
        </div>
        <div>
          <div>
            <div>
              <h3 className="centerContainer">Choose pollution factors</h3>
              <div className="centerContainer">
                {polutionFactors.map(polution => (
                  <button
                    className="button"
                    key={polution}
                    onClick={e => {
                      this.handlePollution(e, polution);
                    }}
                  >
                    {polution}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <DataViewerComponent
                cities={this.state.currentCities}
                currentPolution={this.state.pollution}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
