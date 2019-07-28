import {action, computed, observable} from "mobx";

class TodoStore {
  @observable filter = 'all';

  @observable inputValue = '';

  @observable todos = [
    {id: 1, title: 'learn react.js', completed: false},
    {id: 2, title: 'learn vue.js', completed: false}
  ];

  @action handleInputChanged = (e) => {
    this.inputValue = e.target.value;
  };

  @action handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      if (!this.inputValue.trim().length) {
        return;
      }
      const todo = {
        id: this.todos.length + 1,
        title: this.inputValue,
        completed: false
      };
      this.todos = [todo, ...this.todos];

      this.inputValue = '';
    }
  };

  @action handleDelete = (id) => {
    const index = this.todos.findIndex(item => item.id === id);
    const todos = this.todos;
    todos.splice(index, 1);
    this.todos = todos;
  };

  @action handleCheckboxChange = (todo, event) => {
    const index = this.todos.findIndex(item => item.id === todo.id);
    const todos = this.todos;
    todo.completed = !todo.completed;
    todos[index] = todo;
    todos.splice(index, 1, todo);
    this.todos = todos;
  };

  @action handleEditTodo = (todo, event) => {
    const index = this.todos.findIndex(item => item.id === todo.id);
    const todos = this.todos;
    todo.editing = true;
    todos[index] = todo;
    todos.splice(index, 1, todo);
    this.todos = todos;
  };

  @action handleDoneEdit = (todo, event) => {
    const index = this.todos.findIndex(item => item.id === todo.id);
    const todos = this.todos;
    todo.editing = false;

    if (event.target.value.trim().length) {
      todo.title = event.target.value;
    }

    todos[index] = todo;
    todos.splice(index, 1, todo);
    this.todos = todos;
  };

  @action handleCancelEdit = (todo, event) => {
    const index = this.todos.findIndex(item => item.id === todo.id);
    const todos = this.todos;
    todo.editing = false;
    todos[index] = todo;
    todos.splice(index, 1, todo);
    this.todos = todos;
  };

  @action handleClearCompleted = () => {
    this.todos = this.todos.filter(todo => !todo.completed);
  };

  @action handleUpdateFilter = (filter) => {
    return this.filter = filter;
  };


  @action handleCheckAll = (event) => {
    let todos = this.todos;

    todos.forEach((todo) => {
      todo.completed = event.target.checked;
    });
    this.todos = todos;
  };

  @computed get todoFiltered() {
    const todos = this.todos;

    switch (this.filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  @computed get remaining() {
    return this.todos.filter(todo => !todo.completed).length;
  };

  @computed get anyRemaining() {
    return this.remaining === 0;
  };
}

const store = new TodoStore();

export default store;
