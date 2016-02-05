import React, { Component } from 'react';

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}
