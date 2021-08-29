import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

// function App() {
//   return (
//     <div className="App">
//       <h1>Hi, I'm a React App</h1>
//     </div>
//   );
// }
class App extends Component {
  state = {
    persons: [
      {id:'s23',name:'Max',age:28},
      {id:'s3e',name:'Manu',age:29},
      {id:'sa3',name:'Stephanie',age:26}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  switchNamehandler = (newName) =>{
    // DON'T DO THIS: this.state.persons[0].name = 'Maximalian';
    // Manage state from few component's
    this.setState({
      persons:[
        {id:'s23',name:newName,age:28},
        {id:'s3e',name:'Manu',age:29},
        {id:'sa3',name:'Stephanie',age:27}
      ]
    })
  }
  nameChangedHandler = (event,id) =>{
    const personIndex = this.state.persons.findIndex(p=>{
      return p.id===id;
    });
    const person = {...this.state.persons[personIndex]};
    person.name =  event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex]=person;
    this.setState({
      persons:persons
    });
  }
  toggerPersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }
  render(){
    const style = {
      backgroundColor: 'green',
      color:'white',
      font:'inherit',
      border:'1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return <Person 
              key={person.id}
              changed={(event) => this.nameChangedHandler(event,person.id)}
              click={this.deletePersonHandler.bind(this,index)} 
              name={person.name}
              age={person.age}/>
          })}
        </div>
      );
      style.backgroundColor = 'red';
    }
    const classes = [];
    if(this.state.persons.length<=2){
      classes.push('red');
    }
    if(this.state.persons.length<=1){
      classes.push('bold');
    }
    return (
        <div className="App">
          <h1>Hi, I'm A React App 2</h1>
          <p className={classes.join(' ')}>This is really working !</p>
          <button style={style} key="switch"
            onClick={this.switchNamehandler.bind(this,'Maximilian!!')}>Switch Name</button> 
          <button style={style} key="toggle"
            onClick={this.toggerPersonsHandler}>Toggle Person</button>
          {/* Don't use this.switchNamehandler() as it will be directly executed as {} are evaluated at runtime */}
          {persons}
        </div>
    );
  }
}

export default App;
