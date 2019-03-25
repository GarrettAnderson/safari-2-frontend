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
    axios.get('http://localhost:3000/animals').then((response) => {
      console.log(response)
      this.setState({
        animals: response.data
      })
    })
  }

  handleSearchChange = (event) => {
    const name = event.target.value
    console.log(name)
    this.setState({ name: name }, () => {
      axios
        .put(`http://localhost:3000/animals?name=${this.state.name}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          this.setState({
            animals: response.data
          })
        })
    })
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
                  A total of {animal.seen_count} {animal.species}s were seen!
                </p>
                <p>Location Last Seen: {animal.last_seen_location}</p>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default App
