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
    return (
      <div>
        <h1>{title}</h1>
        <span />
        <div>{completed}</div>
      </div>
    );
  }
}

class Tabletodolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      showSpin: true
    };
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
  }

  render() {
    // console.log(this.state.todo);
    return (
      <div>
        { this.state.showSpin ? <ReactLoading color="#111e6c" type="spin" /> : null }
        {this.state.todo.map(todo => <TodoCoponent todo={todo}/>)}
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
