import React from 'react';
import UserList from "./UserList";
import GroupList from "./GroupList";
import AddUser from "./AddUser";
import AddGroup from "./AddGroup";
import EditGroup from "./EditGroup";
import EditUser from "./EditUser";

class UserManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addUser: null,
            addGroup: null,
            editUser: null,
            editGroup: null,
            groups: [],
            users: []
        };

        this.addUser = this.addUser.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.editUser = this.editUser.bind(this);
        this.editGroup = this.editGroup.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
        this.resetForms = this.resetForms.bind(this);
    }

    componentDidMount = () => {
        this.fetchGroups();
        this.fetchUsers();
    };

    fetchGroups = () => {
        fetch("api/groups", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then((data) => {
                this.setState({groups: data});
            }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });
    };

    fetchUsers = () => {
        fetch("api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then((data) => {
                this.setState({users: data});
            }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });
    };

    addUser = () => {
        this.resetForms(() => {
            this.setState({
                addUser: <AddUser onClose={this.handleClose}/>,
                addGroup: null,
                editUser: null,
                editGroup: null
            });
        });

    };

    addGroup = () => {
        this.resetForms(() => {
            this.setState({
                addGroup: <AddGroup onClose={this.handleClose}/>,
                addUser: null,
                editUser: null,
                editGroup: null
            })
        });
    };

    editUser = (id) => {
        fetch(`api/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then((data) => {
                this.resetForms(() => {
                    this.setState({
                        editUser: <EditUser user={data} onClose={this.handleClose}/>,
                        addGroup: null,
                        addUser: null,
                        editGroup: null
                    })
                });
            }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });


    };

    editGroup = (id) => {
        fetch(`api/groups/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then((data) => {
                this.resetForms(() => {
                    this.setState({
                        editGroup: <EditGroup group={data} onClose={this.handleClose}/>,
                        addUser: null,
                        addGroup: null,
                        editUser: null
                    });
                });
            }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });

    };

    handleClose = () => {
        this.resetForms();
        this.fetchUsers();
        this.fetchGroups();
    };

    handleDeleteUser = () => {
        this.fetchUsers();
        this.fetchGroups();
    };

    handleDeleteGroup = () => {
        this.fetchUsers();
        this.fetchGroups();
    };

    resetForms = (callback) => {
        this.setState({
            addUser: null,
            addGroup: null,
            editUser: null,
            editGroup: null
        }, () => {
            if (callback){
                callback();
            }
        });
    };

    render() {
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-8"}>
                        <div className={"row"}>
                            <div className="col">
                                <h3>User</h3>
                            </div>
                            <div className="col text-right">
                                <button onClick={this.addUser} className={"btn btn-sm btn-success"}>Add User</button>
                            </div>
                        </div>
                        <UserList onEditUser={this.editUser} onDeleteUser={this.handleDeleteUser} users={this.state.users}/>
                    </div>
                    <div className={"col-4"}>
                        {this.state.addUser}
                        {this.state.editUser}
                    </div>
                </div>
                <div className={"row mt-4"}>
                    <div className={"col-8"}>
                        <div className={"row"}>
                            <div className="col">
                                <h3>Groups</h3>
                            </div>
                            <div className="col text-right">
                                <button onClick={this.addGroup} className={"btn btn-sm btn-success"}>Add Group</button>
                            </div>
                        </div>
                        <GroupList groups={this.state.groups} onEditGroup={this.editGroup} onDeleteGroup={this.handleDeleteGroup} groups={this.state.groups}/>
                    </div>
                    <div className={"col-4"}>
                        {this.state.addGroup}
                        {this.state.editGroup}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserManagement;
