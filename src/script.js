var Todo = React.createClass({
  getInitialState: function(){
    return {
      editing: false
    }
  },
  edit: function(){
    this.setState({editing: true});
  },
  remove: function(){
    this.props.onRemove(this.props.index);
  },
  save: function(){
    var val = this.refs.newValue.getDOMNode().value;
    this.props.onChange(val, this.props.index);
    this.setState({editing: false});
  },
  todoDisplay: function(){
    return (
      <div>
        <li className="todo">
          <span onClick={this.edit}>
            {this.props.children}
          </span>
          <button className="btn btn-default btn-sm glyphicon glyphicon-trash remove pull-right" onClick={this.remove}/>
        </li>
      </div>
    );
  },
  todoForm: function(){
    return (
      <div>
        <li className="todo">
          <span>
            <input type="text" placeholder="Edit Todo" ref="newValue" defaultValue={this.props.children}/>
          </span>
          <button onClick={this.save} className="btn btn-default btn-sm glyphicon glyphicon-floppy-disk remove pull-right" />
        </li>
      </div>
    );
  },
  render: function(){
    if (this.state.editing) {
      return this.todoForm();
    } else {
      return this.todoDisplay();
    }
  }
});

var TodoList = React.createClass({
  getInitialState: function(){
    return {
      todos: ['Get Milk', 'Pay Mortgage'],
      text: '',
      formGroup: 'form-group'
    }
  },
  add: function(e){
    var arr = this.state.todos;
    var newTodo = this.refs.newTodo.getDOMNode().value;
    if (newTodo) {
      arr.push(newTodo);
      this.setState({todos: arr, text: '', formGroup: 'form-group'});
    } else {
      e.preventDefault();
      this.setState({formGroup: 'form-group has-error'});
    }
  },
  remove: function(i){
    var arr = this.state.todos;
    arr.splice(i, 1);
    this.setState({todos: arr});
  },
  update: function(newValue, i){
    var arr = this.state.todos;
    arr[i] = newValue;
    this.setState({todos: arr});
  },
  textboxChange: function(e){
    this.setState({text: e.target.value});
  },
  eachTodo: function(todo, i){
    return <Todo
              key={i}
              index={i}
              onChange={this.update}
              onRemove={this.remove}>
             {todo}
           </Todo>
  },
  render: function(){
    return (
      <div>
        <h1>Things to do</h1>
        <div className="form-inline">
          <div className={this.state.formGroup} >
            <input type="text" ref="newTodo" className="form-control" placeholder="Add Todo" value={this.state.text} onChange={this.textboxChange} />
            <button onClick={this.add} className="btn btn-default btn-sm">+</button>
          </div>
        </div>
        <ul>
          {this.state.todos.map(this.eachTodo)}
        </ul>
      </div>
    );
  }
});
React.render(<TodoList/>, document.querySelector('#todo'));
