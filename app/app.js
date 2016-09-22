import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      labels: {
        button: 'get from query',
      },
      query: '["metrosById", [72], ["name"]]',
      response: {},
      error: {},
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  componentDidMount() {
    this.falcorGet()
  }

  handleOnChange(event) {
    this.setState({ query: event.target.value })
  }

  handleOnClick() {
    this.falcorGet()
  }

  falcorGet() {
    this.props.model(this.props.falcorPath).get(JSON.parse(this.state.query))
      .then((response) => {
        if (response) {
          this.setState({ response, error: {} })
        } else {
          this.setState({ response: { json: {} }, error: { message: 'response is undefined' } })
        }
      }, (error) => {
        this.setState({ error })
      })
  }

  render() {
    return (
      <div className="App">
        <h1>falcor-routes</h1>
        <div>
          <h2>query</h2>
          <textarea className="App-textarea query" rows="2" value={this.state.query} onChange={this.handleOnChange} />
          <button onClick={this.handleOnClick}>{this.state.labels.button}</button>
        </div>
        <div>
          <h2>response.json</h2>
          <textarea className="App-textarea" rows="25" value={JSON.stringify(this.state.response.json, null, 2) } readOnly />
        </div>
        <div>
          <h2>error</h2>
          <textarea className="App-textarea" rows="10" value={JSON.stringify(this.state.error, null, 2) } readOnly />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  model: React.PropTypes.func,
  falcorPath: React.PropTypes.string,
}

App.defaultProps = {
  falcorPath: '/model.json'
}

export default App
