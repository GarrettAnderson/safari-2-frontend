import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'
import AnimalListing from './components/AnimalListing'
// import AnimalListing from './components/AnimalListing'
// import HelloWorld from './components/HelloWorld'

class App extends Component {
  state = {
    animals: [],
    name: ''
  }

  componentDidMount() {
    this.showAllAnimals()
  }

  showAllAnimals = () => {
    axios.get('http://localhost:3000/animals').then((response) => {
      console.log(response.data)
      this.setState({
        animals: response.data
      })
    })
  }

  incrementSeenCount = () => {
    console.log(this.state.animals)
    let allAnimalsListed = this.state.animals
    // create empty variable to store the seen_counts for all the animals
    let individualAnimalSeenCount = []
    let allAnimalSeenSum = 0
    for (let i = 0; i < allAnimalsListed.length; i++) {
      console.log(allAnimalsListed[i].seen_count)
      allAnimalSeenSum += allAnimalsListed[i].seen_count
      console.log(allAnimalSeenSum)
      // individualAnimalSeenCount.push(allAnimalsListed[i].seen_count)
      // console.log(individualAnimalSeenCount)
      // push each seen count value into new array
      // call the sum method on the seen count array
    }
    return allAnimalSeenSum
  }

  handleSearchChange = (event) => {
    const location = event.target.value
    console.log(location)
    this.setState({ name: location }, () => {
      axios
        .get(`http://localhost:3000/animals?location=${this.state.name}`)
        // .then((response) => response.json())
        .then((response) => {
          console.log(response)
          this.setState({
            animals: response.data
          })
        })
    })
  }

  submit = (form) => {
    console.log(form)
  }

  render() {
    return (
      <section>
        <h1>Search:</h1>
        <input value={this.state.name} onChange={this.handleSearchChange} />
        <ul>
          <h3>Animals Seen So Far:</h3>
          {this.state.animals.map((animal) => {
            // return <AnimalListing id={animals.id} />
            return (
              <AnimalListing
                key={animal.id}
                id={animal.id}
                seenAmount={animal.seen_count}
                species={animal.species}
                locationSeen={animal.last_seen_location}
                showAnimalList={this.showAllAnimals}
              />
            )
          })}
        </ul>
        <section>
          <h1>Total Animals Seen: {this.incrementSeenCount()}</h1>
          {/* <p>{animal.seen_count}</p> */}
          {/* can create a function  */}
          {/* if using API to get data, must add to state with an axios call. state {animals: [], total:}*/}
          {/* then get the data by using this.state.total */}
        </section>
      </section>
    )
  }
}

export default App
