import React, { Component } from 'react'
import axios from 'axios'

class AnimalListing extends Component {
  state = {
    animals: [],
    name: ''
  }
  // move the remove into a component - the li within the map loop will be its own component
  removeAnimal = () => {
    axios
      .delete(`http://localhost:3000/animals/${this.props.id}`)
      // .then((response) => response.json)
      .then((response) => {
        console.log(response)
        this.props.showAnimalList()
        // this.setState({ animals: response })
      })
  }

  render() {
    return (
      <li>
        <p>
          A total of {this.props.seenAmount} {this.props.species}s were seen!
        </p>
        <p>Location Last Seen: {this.props.locationSeen}</p>
        <button className="delete-animal" onClick={this.removeAnimal}>
          X
        </button>
      </li>
    )
  }
}

export default AnimalListing
