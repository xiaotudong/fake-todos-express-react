const App = React.createClass({
    getInitialState: function () {
        return {
            elements: [],
        }
    },
    componentDidMount: function () {
        $.get('/items', (elements) => {
            this.setState({elements});
        });
    },
    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        this.setState({elements});
    },
    deleteElement: function (index) {
        const elements = this.state.elements;
        elements.splice(index, 1);
        this.setState({elements});
    },
    doElements: function (index) {
        const element = this.state.elements[index];
        element.isDone = !element.isDone;
        this.setState({elements:this.state.elements})
    },
    render: function () {
        return <div>
            <TodoInput addElement={this.addElement}/>
            <TodoDisplay elements={this.state.elements}
                         onDelete={this.deleteElement}
                         onDoElement={this.doElements}/>
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
            <div id="input">
                <input onKeyUp={this.handlerKeyUp}
                       type="text"
                       placeholder="What needs to be done?"/>
                {this.props.elements}
            </div>
        )
    }
});

const TodoDisplay = React.createClass({
    delete: function (index) {
        this.props.onDelete(index);
    },
    change: function (index) {
        this.props.onDoElement(index);
    },
    render: function () {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index}>
                <input type="checkbox"
                       onClick={this.change.bind(this, index)}
                       checked = {ele.isDone}/>
                     {ele.things}
                     <a>{ele.isDone}</a>
                <button onClick={this.delete.bind(this, index)}>X</button>
            </div>
        });
        return <div id="display">
            {elements}
        </div>
    }
});

ReactDOM.render(<App />, document.getElementById('content'));