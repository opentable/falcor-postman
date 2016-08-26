import React from 'react';
import model from './model';
//import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: {
        button: 'get from query'
      },
      query: '["metrosById", [72], ["name"]]',
      response: {},
      error: {}
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  componentDidMount() {
    this.falcorGet();
  }

  handleOnChange(event) {
    this.setState({ query: event.target.value });
  }

  handleOnClick() {
    this.falcorGet();
  }

  falcorGet() {
    model(this.props.falcorPath).get(JSON.parse(this.state.query))
      .then((response) => {
        if (response) {
          this.setState({ response, error: {} });
        }
        else {
          this.setState({ error: { message: 'response is undefined' } });
        }
      }, (error) => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>falcor-routes</h1>
        <div>
          <textarea className="App-textarea" rows="2" value={this.state.query} onChange={this.handleOnChange}></textarea>
          <button  onClick={this.handleOnClick}>{this.state.labels.button}</button>
        </div>
        <div>
          <h2>response.json</h2>
          <textarea className="App-textarea" rows="25" value={JSON.stringify(this.state.response.json, null, 2) } readOnly></textarea>
        </div>
        <div>
          <h2>error</h2>
          <textarea className="App-textarea" rows="10" value={JSON.stringify(this.state.error, null, 2) } readOnly></textarea>
        </div>
      </div>
    );
  }
}

export default App;