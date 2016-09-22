import React from 'react'
import Lockr from 'lockr'

class App extends React.Component {

  state = {
    labels: {
      button: 'get from query',
    },
    query: '["metrosById", [72], ["name"]]',
    queries: [],
    response: {},
    error: {},
  }

  componentDidMount = () => {
    this.setState({queries: Lockr.get('queries', [])})
    this.falcorGet()
  }

  updateQuery = query => this.setState({ query })
  handleOnChange= event => this.updateQuery(event.target.value)

  handleOnClick = () => {
    const queries = this.state.queries
    const query = this.state.query
    if (queries.length === 0 || queries[queries.length - 1] !== query) {
      this.setState({queries: queries.concat(query)})
      Lockr.set('queries', queries.concat(query))
    }
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
    const queryHistory = this.state.queries.map(query =>
      <li onClick={this.updateQuery.bind(null, query)}>
        { query }
      </li>
    )

    return (
      <div className="App">
        <ul>{queryHistory}</ul>
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
