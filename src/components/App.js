import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import logo from '../logo.svg';
import '../App.css';
import TodosRemaining from "./TodosRemaining";
import TodoItem from "./TodoItem";
import TodoCheckAll from "./TodoCheckAll";
import TodoFiltered from './TodoFiltered';
import TodoClearCompleted from "./TodoClearCompleted";
import {inject, observer} from "mobx-react";

@inject('TodoStore')
@observer
class App extends Component {

  render() {

    const {inputValue, todos, handleInputChanged, handleInputSubmit, todoFiltered} = this.props.TodoStore;

    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo"/>
        </header>
        <div className="todo-container">
          <input type="text"
                 value={inputValue}
                 onChange={handleInputChanged}
                 onKeyDown={handleInputSubmit}
                 className="todo-input"
                 placeholder="What needs to be done"/>

          <ReactCSSTransitionGroup transitionName="fade"
                                   transitionEnterTimeout={300}
                                   transitionLeaveTimeout={300}>
            {todoFiltered.map(todo => {
              return (
                <TodoItem key={todo.id} todo={todo}/>
              );
            })}
          </ReactCSSTransitionGroup>

          <div className="extra-container">

            <TodoCheckAll/>

            <TodosRemaining/>

          </div>

          <div className="extra-container">

            <TodoFiltered/>

            <ReactCSSTransitionGroup transitionName="fade"
                                     transitionEnterTimeout={300}
                                     transitionLeaveTimeout={300}>
              {todos.filter(todo => todo.completed).length > 0 &&
              <TodoClearCompleted/>
              }
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
