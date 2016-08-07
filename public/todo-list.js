const App = React.createClass({
    getInitialState: function () {
        return {
            elements: []
        }
    },
    componentDidMount: function() {
        $.get('/items', (elements) => {
            this.setState({elements});
        });
    },
    render: function() {
        return <div>
           <TodoInput/>
        </div>
    }
});
const TodoInput = React.createClass({
    render:function() {
    return <div id = "input">
    <input type = "text" placeholder="What needs to be done?"/>
          </div>
    }
});

ReactDOM.render(<App />, document.getElementById('content'));