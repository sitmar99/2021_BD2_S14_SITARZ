class App extends React.Component {
    render() {
        return React.createElement('p', null, "Hello World");
    }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(App), domContainer);