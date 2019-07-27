import React, {Component} from 'react';
import * as classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import logo from './logo.svg';
import './App.css';

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
              <div className="todo-item" key={todo.id}>
                <div className="todo-item-left">
                  <input type="checkbox" checked={todo.completed}
                         onChange={(event) => {
                    this.handleCheckboxChange(todo, event, index)
                  }}/>
                  {/*<div className={'todo-item-label' + (todo.completed ? ' completed' : '')}>{todo.title}</div>*/}

                  {!todo.editing &&
                  <div className={classNames({
                    'todo-item-label': true,
                    'completed': todo.completed
                  })}
                       onDoubleClick={(event) => {
                         this.handleEditTodo(todo, event, index)
                       }}
                  >{todo.title}</div>
                  }
                  {todo.editing &&
                  <input className="todo-item-edit"
                         autoFocus
                         onBlur={(event) => {
                           this.handleDoneEdit(todo, event, index)
                         }}
                         onKeyUp={(event) => {
                           if (event.key === 'Enter') {
                             this.handleDoneEdit(todo, event, index)
                           } else if (event.key === 'Escape') {
                             this.handleCancelEdit(todo, event, index)
                           }
                         }}
                         defaultValue={todo.title}/>
                  }
                </div>
                <div className="remove-item" onClick={() => {
                  this.handleDelete(index);
                }}>&times;</div>
              </div>
            );
          })}
          </ReactCSSTransitionGroup>

          <div className="extra-container">

            <div>
              <label><input defaultChecked={() => {
                this.anyRemaining()
              }}
                            onClick={this.handleCheckAll}
                            type="checkbox"/> Check All</label>
            </div>

            <div>{this.remaining()} items
              left
            </div>

          </div>

          <div className="extra-container">

            <div>
              <button onClick={(event) => {
                this.handleUpdateFilter('all')
              }}
                      className={classNames({'active': this.state.filter === 'all'})}
              >All
              </button>
              <button onClick={(event) => {
                this.handleUpdateFilter('active')
              }}
                      className={classNames({'active': this.state.filter === 'active'})}>Active
              </button>
              <button onClick={(event) => {
                this.handleUpdateFilter('completed')
              }}
                      className={classNames({'active': this.state.filter === 'completed'})}>Completed
              </button>
            </div>
            <ReactCSSTransitionGroup transitionName="fade"
                                     transitionEnterTimeout={300}
                                     transitionLeaveTimeout={300}>
              {this.state.todos.filter(todo => todo.completed).length > 0 &&
              <div>

                <button onClick={this.handleClearCompleted}>Clear Completed
                </button>
              </div>
              }
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
