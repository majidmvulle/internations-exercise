import React from 'react';

class AddGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: null, userList: [], users: []};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        });

    };

    handleUserChange = (id, e) => {
        let users = this.state.users;

        let matchingUsers = this.state.userList.filter(obj => {
            return obj.id === id
        });

        if (!matchingUsers.length) {
            return;
        }

        const user = matchingUsers[0];

        if (e.target.checked) {
            users.push(user);
        } else {
            let index = -1;

            for (let i in users) {
                const _user = users[i];

                if (_user.id === user.id) {
                    index = i;
                }
            }

            if (index > -1) {
                users.splice(index, 1);
            }
        }

        this.setState({users: users});
    };

    handleSave = (event) => {
        event.preventDefault();

        if(!this.state.name){
            alert('Name is required');

            return;
        }

        let users = [];

        for (let user of this.state.users) {
            let aUser = user;

            if (typeof user === "object") {
                aUser = user.id;
            }

            if (typeof aUser !== 'undefined') {
                users.push(aUser);
            }
        }

        users = users.filter((v, i, a) => a.indexOf(v) === i);

        fetch("api/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: this.state.name, users: users})
        }).then(response => response.json())
            .then((data) => {
                this.handleClose();
            }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });
    };

    handleClose = () => {
        this.props.onClose();
    };

    componentDidMount() {
        fetch("api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then((data) => {
                this.setState({userList: data});
            }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });
    }

    isChecked = (id) => {
        for (let user of this.state.users) {
            if (user.id === id) {
                return true;
            }
        }

        return false;
    };

    render() {
        return (
            <form className={"border p-4 pt-2"}>
                <h3>Adding Group <button onClick={this.handleClose} className={"btn btn-sm btn-dark float-right"}>Close</button></h3>
                <div className="form-row pt-3">
                    <div className="col">
                        <label>Name:</label>
                        <input name={"name"}
                               type={"text"}
                               className={"form-control"}
                               placeholder={"Name"}
                               onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row pt-3">
                    <div className="col">
                        <label>Users:</label>
                        <ul className={"border pt-2 pb-2 group-inline"}>
                            {this.state.userList.map((user) =>
                                <li key={user.id}>
                                    <input onChange={(e) => this.handleUserChange(user.id, e)}
                                           className={"form-check-input"} type={"checkbox"} value={user.id}
                                           id={"defaultCheck" + user.id} defaultChecked={this.isChecked(user.id)}/>
                                    <label className={"form-check-label"} htmlFor={"defaultCheck" + user.id}>
                                        {user.name}
                                    </label>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="form-row pt-3">
                    <button onClick={this.handleSave} className={"btn btn-sm btn-primary"}>Save</button>
                </div>
            </form>
        );
    }
}

export default AddGroup;
