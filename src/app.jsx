import React from 'react'
import Lockr from 'lockr'
import Codemirror from 'react-codemirror'


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      labels: {
        button: 'Get',
      },
      query: 'Enter Falcor query',
      queries: [],
      response: {},
      error: {},
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
  }

  componentDidMount(){
    this.setState({queries: Lockr.get('queries', [])})
    this.falcorGet()
  }

  updateQuery(query){ this.setState({ query }) }
  handleOnChange(event){this.updateQuery(event.target.value) }

  handleOnClick(){
    const queries = this.state.queries
    const query = this.state.query
    if (queries.length === 0 || queries[queries.length - 1] !== query) {
      const updatedQueries = queries.concat(query)
      this.setState({queries:updatedQueries })
      Lockr.set('queries', updatedQueries)
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
    const queryHistory = this.state.queries.map((query, i) =>
      <div className="query-item pure-g" key={i} onClick={this.updateQuery.bind(null, query)}>
        <div className="pure-u-3-4">
          <p className="query-desc">{ query }</p>
        </div>
      </div>
    )

    const showResponseOrError = (response, error) =>
      Object.keys(response).length >= 0 ?
        JSON.stringify(response.json, null, 2) :
        JSON.stringify(error, null, 2)


    return (
      <div id="layout" className="App content pure-g">

        <div id="list" className="pure-u-1">
          {queryHistory.reverse()}
        </div>

        <div id="main" className="pure-u-1">
          <div className="query-content">

            <div className="query-content-editor pure-g">
              <div className="pure-u-5-6">
                {/*
                  <textarea className="App-textarea query" rows="2" value={this.state.query} onChange={this.handleOnChange} />
                */}

                  <Codemirror
                    value={this.state.query}
                    onChange={this.updateQuery}
                    options={{
                      mode: 'javascript',
                      lineNumbers: false,
                      tabSize: 2
                    }}
                  />

              </div>

              <div className="query-content-editor-controls pure-u-1-6">
                <button className="primary-button pure-button" onClick={this.handleOnClick}>{this.state.labels.button}</button>
              </div>
            </div>


            <div className="query-content-result">
              <pre>{ showResponseOrError(this.state.response, this.state.error) }</pre>
            </div>
          </div>
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
