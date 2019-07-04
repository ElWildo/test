import React from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import axios from 'axios';
import api from './api';

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  headline:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  span:{
    width: '20px'
  }
};

class TodoCoponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let id = this.props.todo.id;
    let title = this.props.todo.title;
    let completed = this.props.todo.completed;
    let userID = this.props.todo.userID;
    console.log(this.props.author)
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

  change = (event) =>{
      this.setState({value: event.target.value});
  }

  componentDidMount() {
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
    // console.log(this.state.todo);
    return (
      <div>
        <div style = {styles.headline}>
          <h1>Display Task:</h1>
          <span style = {styles.span} />
          <select id="lang" onChange={this.change} value={this.state.value}>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="All">All</option>
          </select>
        </div>
        { this.state.showSpin ? <ReactLoading color="#111e6c" type="spin" /> : null }
        { this.state.value == 'Active' &&
        this.state.todo.filter(todo => todo.completed == false)
        .map(todo => <TodoCoponent 
        todo={todo} 
        author = {this.state.authors.filter(authors => authors.id == todo.userId)
        .map(authors => authors.name)[0]}/>) 
        }
        { this.state.value == 'Completed' && 
        this.state.todo.filter(todo => todo.completed == true)
        .map(todo => <TodoCoponent 
        todo={todo} 
        author = {this.state.authors.filter(authors => authors.id == todo.userId)
        .map(authors => authors.name)[0]}/>)}
        { this.state.value == 'All' && 
        this.state.todo
        .map(todo => <TodoCoponent 
        todo={todo} 
        author = {this.state.authors.filter(authors => authors.id == todo.userId)
        .map(authors => authors.name)[0]}/>) }
        {}
      </div>
    )
  }
}

const App = () => (
  <div style={styles.app}>
    <h1>Todo List</h1>
    <h2>List of Todos:</h2>
    <p>Requirements:</p>
    <ul>
      <li>It diplays list of todos;</li>
      <li>It shows spinner while loading list;</li>
      <li>User is able to filter by All / Active / Compleated;</li>
      <li>Bonus: It displays name of the author, next to each task;</li>
    </ul>
    <Tabletodolist />
  </div>
);

export default connect(({ todos }) => ({ todos }))(App);
