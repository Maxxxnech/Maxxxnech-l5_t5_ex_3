import React, { Component } from "react";

import "./App.css";
import Counter from "./components/Counter";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mount: true, //state to switch counter mount/dismount
      ignoreProp: 0, //Prop to be ignored in counter (shouldComponentUpdate)
      seed: 40, //Prop to be used as seed in counter (static getDerivedStateFromProps)
      showErrorComponent: false, // for error boundaries (componentDidCatch)
    };

    this.mountCounter = () => this.setState({ mount: true });
    this.unmountCounter = () => this.setState({ mount: false });

    this.ignoreProp = () => this.setState({ ignoreProp: Math.random() });
    this.seedGenerator = () =>
      this.setState({ seed: Number.parseInt(Math.random() * 100) });

    this.toggleError = () =>
      this.setState((prevState) => ({
        showErrorComponent: !prevState.showErrorComponent,
      }));
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.mountCounter} disabled={this.state.mount}>
          Mount counter
        </button>
        <button onClick={this.unmountCounter} disabled={!this.state.mount}>
          Unmount counter
        </button>
        <button onClick={this.ignoreProp} disabled={!this.state.mount}>
          Ignore prop
        </button>
        <button onClick={this.seedGenerator} disabled={!this.state.mount}>
          Generate seed
        </button>
        <button onClick={this.toggleError} disabled={!this.state.mount}>
          Toggle error
        </button>
        {this.state.mount ? (
          <Counter
            ignoreProp={this.state.ignoreProp}
            seed={this.state.seed}
            showErrorComponent={this.state.showErrorComponent}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
