import React from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import axios from 'axios';
import api from './api';


//added few line for styling spaces and header
const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    width: '40rem'
  },
  headline:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  span:{
    width: '20px'
  }
};

class TodoCoponent extends React.Component {

  render() {
    //storing needed data and displaying it
    let title = this.props.todo.title;
    return (
      <li>
        {title} ({this.props.author})
      </li>
    );
  }
}

class Tabletodolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      authors: [],
      showSpin: true,
      value: 'All'
    };
  }

  // creating a function to use onChange option
  change = (event) =>{
      this.setState({value: event.target.value});
  }

  componentDidMount() {
    // stroring api data
    axios
      .get(api.todos)
      .then(response => {
        // handle success 
        this.setState({ todo: response.data, showSpin: false });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    axios
      .get(api.users)
      .then(response => {
        // handle success 
        this.setState({ authors: response.data});
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div style={styles.container}>
        <div style = {styles.headline}>
          <h1>Display Task:</h1>
          <span style = {styles.span} />
          <select id="lang" onChange={this.change} value={this.state.value}>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="All">All</option>
          </select>
        </div>
        </div>
        <div style={styles.container}>
        {/* checking if data is loaded or not */}
        { this.state.showSpin ? <ReactLoading color="#111e6c" type="spin" /> : null }
        {/* render only what option value requires 
        if for each value
        filter on todos for value
        map todos to return a todoComponent containing:
        todos.autor and a filtered author list (throug id) returning a joined array */}
        { this.state.value === 'Active' &&
        this.state.todo.filter(todo => todo.completed === false)
        .map(todo => <TodoCoponent 
        todo={todo}
        key = {todo.id}
        author = {this.state.authors.filter(authors => authors.id === todo.userId)
        .map(authors => authors.name).join()}/>) 
        }
        { this.state.value === 'Completed' && 
        this.state.todo.filter(todo => todo.completed === true)
        .map(todo => <TodoCoponent 
        todo={todo} 
        key = {todo.id}
        author = {this.state.authors.filter(authors => authors.id === todo.userId)
        .map(authors => authors.name).join()}/>)}
        { this.state.value === 'All' && 
        this.state.todo
        .map(todo => <TodoCoponent 
        todo={todo} 
        key = {todo.id}
        author = {this.state.authors.filter(authors => authors.id === todo.userId)
        .map(authors => authors.name).join()}/>) }
        </div>
      </div>
    )
  }
}

const App = () => (
  <div style={styles.app}>
    <h1>Todo List</h1>
    <h2>List of Todos:</h2>
    {/* <p>Requirements:</p>
    <ul>
      <li>It diplays list of todos;</li>
      <li>It shows spinner while loading list;</li>
      <li>User is able to filter by All / Active / Compleated;</li>
      <li>Bonus: It displays name of the author, next to each task;</li>
    </ul> */}
    <Tabletodolist />
  </div>
);

export default connect(({ todos }) => ({ todos }))(App);
