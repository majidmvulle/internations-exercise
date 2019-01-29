import React from 'react';

class GroupList extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleDelete = (id) => {
        if (!confirm('Are you sure')) {
            return;
        }

        fetch(`api/groups/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            this.props.onDeleteGroup();
        }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });

    };

    handleEdit = (id) => {
        this.props.onEditGroup(id);
    };

    render() {
        const groups = this.props.groups;
        let noGroups = "";

        if (!groups.length) {
            noGroups = "No Groups";
        }

        return (
            <table className={"table table-hover table-bordered"}>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Total Users</th>
                    <th scope="col">Created</th>
                    <th scope="col">Updated</th>
                    <th scope="col">&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {groups.map((group) =>
                    <tr key={group.id}>
                        <th scope="row">{group.id}</th>
                        <td>{group.name}</td>
                        <td>{(typeof group.users.length !== 'undefined') ? group.users.length : "0"}</td>
                        <td>{group.created_at}</td>
                        <td>{group.updated_at}</td>
                        <td>
                            <button onClick={() => this.handleEdit(group.id)} className={"btn btn-sm btn-warning text-white"}>Edit</button>
                            <button disabled={(typeof group.users.length !== 'undefined') && group.users.length} onClick={() => this.handleDelete(group.id)} className={"btn btn-sm btn-danger"}>Remove</button>
                        </td>
                    </tr>
                )}
                <tr className={!noGroups ? "d-none" : ""}>
                    <td colSpan={6} className={"text-center"}>{noGroups}</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default GroupList;
