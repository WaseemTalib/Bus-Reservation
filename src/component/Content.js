import React, { Component } from 'react';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: []}
  }
  addTodo = () => {
    let todo = this.refs.todo.value;
    let todoTitle = { todoTitle: todo, markcompleted:false };
    this.setState({ todos: [...this.state.todos, todoTitle]});
  }
  complete = (index) => {
    const oldTodos = [...this.state.todos]
    oldTodos[index].markcompleted = true
    this.setState({todos: oldTodos})
  }

  render() {
    return <div className="Content">
      <h3>Todo App</h3>
      <div>
        <ul>
          {this.state.todos.map((todos, index) => {
            return <li key={index} className={todos.markcompleted === false ? "blue" : "red"}>
              {todos.todoTitle}
             <div > <button  onClick={()=>this.complete(index)}>Mark as Complete</button>
              <button onClick={this.delete}>Delete</button></div>
            </li>
          })}
        </ul>
      </div>

      Enter Todo Name<input type="text" placeholder={'Enter Todo name'} ref="todo" />
      <button onClick={this.addTodo}>Add Todo</button>

    </div>
  }
}

export default Content;