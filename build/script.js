var Todo = React.createClass({displayName: "Todo",
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
      React.createElement("div", null, 
        React.createElement("li", {className: "todo"}, 
          React.createElement("span", {onClick: this.edit}, 
            this.props.children
          ), 
          React.createElement("button", {className: "btn btn-default btn-sm glyphicon glyphicon-trash remove pull-right", onClick: this.remove})
        )
      )
    );
  },
  todoForm: function(){
    return (
      React.createElement("div", null, 
        React.createElement("li", {className: "todo"}, 
          React.createElement("span", null, 
            React.createElement("input", {type: "text", placeholder: "Edit Todo", ref: "newValue", defaultValue: this.props.children})
          ), 
          React.createElement("button", {onClick: this.save, className: "btn btn-default btn-sm glyphicon glyphicon-floppy-disk remove pull-right"})
        )
      )
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

var TodoList = React.createClass({displayName: "TodoList",
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
    return React.createElement(Todo, {
              key: i, 
              index: i, 
              onChange: this.update, 
              onRemove: this.remove}, 
             todo
           )
  },
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Things to do"), 
        React.createElement("div", {className: "form-inline"}, 
          React.createElement("div", {className: this.state.formGroup}, 
            React.createElement("input", {type: "text", ref: "newTodo", className: "form-control", placeholder: "Add Todo", value: this.state.text, onChange: this.textboxChange}), 
            React.createElement("button", {onClick: this.add, className: "btn btn-default btn-sm"}, "+")
          )
        ), 
        React.createElement("ul", null, 
          this.state.todos.map(this.eachTodo)
        )
      )
    );
  }
});
React.render(React.createElement(TodoList, null), document.querySelector('#todo'));
