import React from "react";
import Context from "./Context";

export default class Workspaces extends React.Component {
  state = {
    workspaces: {},
    setState: this.setState.bind(this)
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
