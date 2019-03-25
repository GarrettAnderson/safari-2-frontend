import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'
import HelloWorld from './components/HelloWorld'

class App extends Component {
  state = {
    animals: [],
    name: ''
  }

  componentDidMount() {
    axios.get('http://localhost:3000/animals').then((response) => response.json()).then((response) => {
      console.log(response)
      this.setState({
        animals: response
      })
    })
  }

  handleSearchChange = (event) => {
    const name = event.target.value
    console.log(name)
    // axios.get('http://localhost:3000/animals').then((response) => response.json()).then((response) => {
    //   console.log(response)
    //   this.setState({ animals: response })
    // })
  }
  submit = (form) => {
    console.log(form)
  }

  render() {
    return (
      <section>
        <p>Search:</p>
        <input value={this.state.name} onChange={this.handleSearchChange} />
        <ul>
          <h3>Animals Seen So Far:</h3>
          {this.state.animals.map((animal) => {
            return (
              <li key={animal.id}>
                <p>
                  A total of {animal.count} {animal.species} was seen!
                </p>
                <p>Location: {animal.last_seen_location}</p>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default App
