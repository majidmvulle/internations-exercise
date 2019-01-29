import React from 'react';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleDelete = (id) => {
        if (!confirm('Are you sure')){
            return;
        }

        fetch(`api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            this.props.onDeleteUser();
        }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });

    };

    handleEdit = (id) => {
        this.props.onEditUser(id);
    };

    render() {
        const users = this.props.users;
        let noUsers = "";

        if (!users.length){
            noUsers = "No Users";
        }

        return (
            <table className={"table table-hover table-bordered"}>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Groups</th>
                    <th scope="col">Created</th>
                    <th scope="col">Updated</th>
                    <th scope="col">&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) =>
                    <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.groups.map((group) =>
                            <span key={group.id} className={"badge badge-secondary"}>{group.name}</span>
                        )}</td>
                        <td>{user.created_at}</td>
                        <td>{user.updated_at}</td>
                        <td>
                            <button onClick={() => this.handleEdit(user.id)} className={"btn btn-sm btn-warning text-white"}>Edit</button>
                            &nbsp;
                            <button onClick={() => this.handleDelete(user.id)} className={"btn btn-sm btn-danger"}>Remove</button>
                        </td>
                    </tr>
                )}
                <tr className={!noUsers ? "d-none": ""}>
                    <td colSpan={5} className={"text-center"}>{noUsers}</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default UserList;
