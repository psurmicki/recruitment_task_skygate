import React, { Component } from "react";
import "./App.scss";

const polutionFactors = ["co", "so2", "o3", "bc", "no2", "pm25", "pm10"];

class ButtonsPollutionFactors extends Component {
  render() {
    var { currentPolution, handlePollution } = this.props;

    return (
      <div>
        <div>
          <div className="centerContainer">
            <h2>Selected pollution: {currentPolution.toUpperCase()}</h2>
          </div>
          <h3 className="centerContainer">Choose pollution factors:</h3>
          <div className="centerContainer">
            {polutionFactors.map(polution => (
              <button
                className="button"
                key={polution}
                onClick={e => handlePollution(e, polution)}
              >
                {polution}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ButtonsPollutionFactors;
