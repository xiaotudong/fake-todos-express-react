const App = React.createClass({
    getInitialState: function () {
        return {
            elements: [],
        }
    },
    componentDidMount: function() {
        $.get('/items', (elements) => {
            this.setState({elements});
        });
    },
    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});

        console.log(elements);
    },
    render: function() {
        return <div>
           <TodoInput addElement = {this.addElement}/>
        </div>
    }
});
const TodoInput = React.createClass({
    handlerKeyUp: function (event) {
        if (event.keyCode === 13) {
            let value = event.target.value;

            if (!value) return false;
            let newElement = {
                things: value,
                isDone: false
            };
            event.target.value = "";
            this.props.addElement(newElement);
        }
    },
    render: function () {
        return (
            <div id = "input">
                <input onKeyUp={this.handlerKeyUp}
                       type="text"
                       placeholder="What needs to be done?"/>
                {this.props.elements}
            </div>
        )
    }
});

ReactDOM.render(<App />, document.getElementById('content'));