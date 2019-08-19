import React, { Component } from "react";

class EveryDayAccountAppForm extends Component {
  render() {
    return (
      <div>
        <h3>EveryDayAccount Applicaiton form</h3>
        <button onClick={() => this.props.quitForm(null)}>
          Quit Application
        </button>
      </div>
    );
  }
}

export default EveryDayAccountAppForm;
