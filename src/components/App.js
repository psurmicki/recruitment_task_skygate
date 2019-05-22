import React, { Component } from "react";
import { PacmanLoader } from "react-spinners";

import DataViewerComponent from "./DataViewerComponent";
import filterPolutedCities from "./functions/filterPolutedCities";
import ButtonsPollutionFactors from "./ButtonsPollutionFactors";

//import styles
import "./App.scss";

const countriesList = ["GERMANY", "FRANCE", "POLAND", "SPAIN"];

class App extends Component {
  state = {
    currentCities: [],
    shortcut: "",
    pollution: "",
    city: "",
    pollutionData: "",
    isLoading: false
  };

  handleInputChange = e => {
    const country = e.target.value;
    var shortcut = "";

    switch (country) {
      case "GERMANY":
        shortcut = "GE";
        break;
      case "FRANCE":
        shortcut = "FR";
        break;
      case "POLAND":
        shortcut = "PL";
        break;
      case "SPAIN":
        shortcut = "ES";
        break;
      default:
        shortcut = "";
        break;
    }
    this.setState({
      shortcut
    });
  };

  async handleDataFetch() {
    const { shortcut, isLoading } = this.state;
    const weatherAPI = `https://api.openaq.org/v1/measurements?country=${shortcut}`;

    this.handleLoaderChange();

    await fetch(weatherAPI)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(pollutionData => {
        this.setState({
          pollutionData,
          isLoading: !isLoading
        });
      })
      .catch(err => console.log(`${err} UPS...something went wrong!`));
  }

  handlePollution(e, polutionParam) {
    var data = this.state.pollutionData.results;
    var tenMostPoluted = filterPolutedCities(data, polutionParam);
    this.setState({
      currentCities: tenMostPoluted,
      pollution: polutionParam
    });
  }

  handleLoaderChange = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  };

  render() {
    const { pollutionData, pollution, currentCities, isLoading } = this.state;

    return (
      <div>
        <h1 className="centerContainer">
          Check the most polluted cities in one of four countries!
        </h1>
        <div className="centerContainer">
          <select defaultValue="" onChange={e => this.handleInputChange(e)}>
            <option key="defaultOption" disabled value="">
              -- select country --
            </option>
            {countriesList.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="centerContainer">
          <button className="button" onClick={e => this.handleDataFetch(e)}>
            Click to show results!
          </button>
        </div>
        <div className="centerContainer">
          {isLoading && !pollutionData ? (
            <div className="sweet-loading">
              <PacmanLoader className="override" />
            </div>
          ) : null}
        </div>
        <div>
          <div>
            {pollutionData && (
              <div>
                <ButtonsPollutionFactors
                  pollutionData={pollutionData}
                  currentPolution={pollution}
                  handlePollution={(e, polutionParam) =>
                    this.handlePollution(e, polutionParam)
                  }
                />
                <DataViewerComponent
                  cities={currentCities}
                  currentPolution={pollution}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
