import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'
import HelloWorld from './components/HelloWorld'

class App extends Component {
  state = {
    animals: [],
    name: ''
  }

  handleSearchChange = (event) => {
    axios.get('http://localhost:3000/animals').then((response) => response.json()).then((response) => {
      console.log(response)
      this.setState({ animals: response })
    })
  }
  submit = (form) => {
    console.log(form)
  }

  render() {
    return (
      <section>
        <p>Search:</p>
        <input value={this.state.name} onChange={this.handleSearchChange} />
      </section>
    )
  }
}

export default App
