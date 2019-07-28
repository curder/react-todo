import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import logo from '../logo.svg';
import '../App.css';
import TodosRemaining from "./TodosRemaining";
import TodoItem from "./TodoItem";
import TodoCheckAll from "./TodoCheckAll";
import TodoFiltered from './TodoFiltered';
import TodoClearCompleted from "./TodoClearCompleted";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      inputValue: '',
      todos: [
        {id: 1, title: 'learn react.js', completed: false},
        {id: 2, title: 'learn vue.js', completed: false}
      ]
    }
  }

  handleInputChanged = (e) => {
    const inputValue = e.target.value;
    this.setState(() => {
      return {
        inputValue
      }
    });
  };

  handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      if (!this.state.inputValue.trim().length) {
        return;
      }
      const todo = {
        id: this.state.todos.length + 1,
        title: this.state.inputValue,
        completed: false
      };
      const todos = [todo, ...this.state.todos];

      this.setState(() => {
        return {
          inputValue: '',
          todos
        }
      })

    }
  };

  handleDelete = (index) => {
    const todos = this.state.todos;
    todos.splice(index, 1);
    this.setState(() => {
      return {
        todos
      }
    })
  };

  handleCheckboxChange = (todo, event, index) => {
    const todos = this.state.todos;
    todo.completed = !todo.completed;
    todos[index] = todo;
    todos.splice(index, 1, todo);

    return this.setState(() => {
      return {todos};
    })
  };

  handleEditTodo = (todo, event, index) => {
    const todos = this.state.todos;
    todo.editing = true;
    todos[index] = todo;
    todos.splice(index, 1, todo);

    return this.setState(() => {
      return {todos};
    })
  };

  handleDoneEdit = (todo, event, index) => {
    const todos = this.state.todos;
    todo.editing = false;

    if (event.target.value.trim().length) {
      todo.title = event.target.value;
    }

    todos[index] = todo;
    todos.splice(index, 1, todo);

    return this.setState(() => {
      return {todos};
    })
  };

  handleCancelEdit = (todo, event, index) => {
    const todos = this.state.todos;
    todo.editing = false;
    todos[index] = todo;
    todos.splice(index, 1, todo);

    return this.setState(() => {
      return {todos};
    })
  };

  handleClearCompleted = () => {
    return this.setState(() => {
      return {todos: this.state.todos.filter(todo => !todo.completed)};
    })
  };

  handleUpdateFilter = (filter) => {
    this.setState(() => {
      return {filter};
    })
  };

  handleTodoFiltered = (filter) => {
    switch (filter) {
      case 'completed':
        return this.state.todos.filter(todo => todo.completed);
      case 'active':
        return this.state.todos.filter(todo => !todo.completed);
      default:
        return this.state.todos;
    }
  };

  handleCheckAll = (event) => {
    let todos = this.state.todos;

    todos.forEach((todo) => {
      todo.completed = event.target.checked;
    });

    this.setState({todos});
  };

  remaining = () => {
    return this.state.todos.filter(todo => !todo.completed).length;
  };

  anyRemaining = () => {
    return this.remaining() === 0;
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo"/>
        </header>
        <div className="todo-container">
          <input type="text"
                 value={this.state.inputValue}
                 onChange={this.handleInputChanged}
                 onKeyDown={this.handleInputSubmit}
                 className="todo-input"
                 placeholder="What needs to be done"/>

          <ReactCSSTransitionGroup transitionName="fade"
                                   transitionEnterTimeout={300}
                                   transitionLeaveTimeout={300}>
            {this.handleTodoFiltered(this.state.filter).map((todo, index) => {
            return (
              <TodoItem key={todo.id} todo={todo} index={index}
                        handleCheckboxChange={this.handleCheckboxChange}
                        handleEditTodo={this.handleEditTodo}
                        handleDoneEdit={this.handleDoneEdit}
                        handleCancelEdit={this.handleCancelEdit}
                        handleDelete={this.handleDelete}
              />
            );
          })}
          </ReactCSSTransitionGroup>

          <div className="extra-container">

            <TodoCheckAll anyRemaining={this.anyRemaining}
                          handleCheckAll={this.handleCheckAll}/>

            <TodosRemaining remaining={this.remaining()}/>

          </div>

          <div className="extra-container">

            <TodoFiltered handleUpdateFilter={this.handleUpdateFilter}
                          filter={this.state.filter}/>

            <ReactCSSTransitionGroup transitionName="fade"
                                     transitionEnterTimeout={300}
                                     transitionLeaveTimeout={300}>
              {this.state.todos.filter(todo => todo.completed).length > 0 &&
                <TodoClearCompleted handleClearCompleted={this.handleClearCompleted} />
              }
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
