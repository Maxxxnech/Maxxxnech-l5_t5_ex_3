import React, { Component } from "react";

//Component for generation of deliberate error
const ErrorComponent = () => <div>{this.props.nonExistant}</div>

export default class Counter extends Component {
  constructor(props) {
    console.log("%cConstructor", "color: darkblue");
    super(props);

    this.state = {
        counter: 0, 
        seed: 0, 
        initializing: true 
    };

    this.increment = () => this.setState({ counter: this.state.counter + 1 });
    this.decrement = () => this.setState({ counter: this.state.counter - 1 });
    
}


  // Allows to copy any value from props to state.
  // Copy from props to state can't be done in constructor continiously, 
  // as constructor  runs only ONCE, so this method is needed.
  // Static method: does not need class instance to be created
  // Runs before any other method, before render
  static getDerivedStateFromProps(props, state) {
    console.log("%c get Derived State From Props", "color: violet");
    if (props.seed && props.seed !== state.seed) {
      return {
        seed: props.seed,
        counter: props.seed,
      };
    }
    return null;
  }


  // Called right after render
  // Only triggered ONCE: when component is constructed and added into the DOM
  // We can do network requests or handle smth after initial loading
  componentDidMount() {
    console.log("%c Component Did Mount", "color: blue");
    //simulation of data fetching after page loading
    setTimeout(() => {
        //we can change state after network request succeeds
        this.setState({initializing: false})
    }, 500);
    console.log("%c------------------------------------", "color: blue");
  }

  // Method that lets react know if render should be triggered or not.
  // Default returned value is true - render every time something (props/state) changes.
  // But sometimes state or props get updated and we dont need to render
  // as we didn't change anything in UI. So we can gain performance by disabling render
  // Dangerous
  shouldComponentUpdate(nextProps, nextState) {
    // Do not render if App.js sends another this.props.ignoreProp
    if (
      nextProps.ignoreProp &&
      this.props.ignoreProp !== nextProps.ignoreProp
    ) {
      console.log("%c should Component Update - DO NOT RENDER", "color: red");
      console.log("%c------------------------------------", "color: red");
      return false;
    }
    console.log("%c should Component Update-RENDER", "color: yellow");
    //default
    return true;
  }

  // Allows to capture some properties that are not stored in the state before we rerender
  // A list view, or a textarea, cursor being in certain location
  //Whatever is returned, gets passed to componentDidUpdate as snapshot, 
  //so we can tell DOM to set cursor and other positions to certain place after the render
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log("%c [Get Snapshot Before Update]", "color: gray");
     return null //whatever returns, gets passed to componentDidUpdate as snapshot
  }
  render() {
    console.log("%cRender", "color: orange");
    if(this.state.initializing){
        return <div>Initializing...</div>
    }
    if(this.props.showErrorComponent && this.state.error){
        return <div>We have encountered an error! {this.state.error.message}</div>
    }
    return (
      <div>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <div className="counter">Counter: {this.state.counter}</div>
        {this.props.showErrorComponent ? <ErrorComponent /> : null}
      </div>
    );
  }

  // Runs after the render every time component updates (not after mounting)
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("%c Component Did Update", "color: green");
    //Also can be used for specific network requests as componentDidMount
    console.log("%c------------------------------------", "color: green");
  }

  // Runs before component is removed from DOM
  componentWillUnmount() {
    console.log("%c Component Will Unmount", "color: crimson");
    console.log("%c------------------------------------", "color: crimson");
  }
 
  //Error Boundaries
  // Allows to handle errors without crash and loosing everything in browser
  // Akin try {}catch(){}
  componentDidCatch(error, info){
     console.log(' %c Component did catch', "color: darkred");
     this.setState({error, info})
  }
}
