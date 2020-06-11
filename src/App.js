
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom'
import Home from './Home'
import Book from'./Book'
import Order from './Order';
import BookEdit from './BookEdit';
import EditBook from './EditBook'
import UserList from './UserList'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/books/:id' component={EditBook}/>
          <Route path='/listUser' exact={true} component={UserList}/>
          <Route path='/books' exact={true} component={Book}/>
          <Route path='/order' exact={true} component={Order}/>
        </Switch>
      </Router>
    )
  }
}
export default App
