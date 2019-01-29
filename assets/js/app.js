import React from 'react';
import ReactDOM from 'react-dom';
import UserManagement from "./components/UserManagement";


class App extends React.Component {

    render() {
        return (
            <UserManagement/>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));