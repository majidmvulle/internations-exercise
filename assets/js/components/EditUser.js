import React from 'react';

class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {user: props.user, groupList: [], name: props.user.name, groups: props.user.groups};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleInputChange = (event) => {
        const target = event.target;

        if (target.type === 'checkbox'){
            return;
        }

        const name = target.name;
        let value = target.value;

        this.setState({
            [name]: value
        });
    };

    handleGroupChange = (id, e) => {
        let groups = this.state.groups;

        let matchingGroups = this.state.groupList.filter(obj => {
            return obj.id === id
        });

        if (!matchingGroups.length){
            return;
        }

        const group = matchingGroups[0];

        if (e.target.checked){
            groups.push(group);
        }else{
            let index = -1;

            for (let i in groups){
                const _group = groups[i];

                if (_group.id === group.id){
                    index = i;
                }
            }

            if (index > -1) {
                groups.splice(index, 1);
            }
        }

        this.setState({groups: groups});
    };

    handleSave = (event) => {
        event.preventDefault();

        if (!this.state.name) {
            alert('Name is required');

            return;
        }

        let groups = [];

        for (let group of this.state.groups){
            let aGroup = group;

            if (typeof group === "object"){
                aGroup = group.id;
            }

            if (typeof aGroup !== 'undefined') {
                groups.push(aGroup);
            }
        }

        groups = groups.filter((v, i, a) => a.indexOf(v) === i);

        fetch(`api/users/${this.state.user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: this.state.name, groups: groups})
        }).then((data) => {
            this.handleClose();
        }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });
    };

    componentDidMount() {
        fetch("api/groups", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then((data) => {
                this.setState({groupList: data});
            }).catch(function (error) {
            alert('Error: ' + error);
            console.log('Request failed', error)
        });
    }

    isChecked = (id) => {
        for (let group of this.state.groups){
            if (group.id === id){
                return true;
            }
        }

        return false;
    };

    render() {


        return (
            <form className={"border p-4 pt-2"}>
                <h3>Editing User <button onClick={this.handleClose}
                                         className={"btn btn-sm btn-dark float-right"}>Close</button></h3>
                <div className="form-row pt-3">
                    <div className="col">
                        <label>Name:</label>
                        <input name={"name"}
                               type={"text"}
                               className={"form-control"}
                               placeholder={"Name"}
                               defaultValue={this.state.name}
                               onChange={this.handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row pt-3">
                    <div className="col">
                        <label>Groups:</label>
                        <ul className={"border pt-2 pb-2 group-inline"}>
                            {this.state.groupList.map((group) =>
                                <li key={group.id}>
                                    <input onChange={(e) => this.handleGroupChange(group.id, e)}
                                           className={"form-check-input"} type={"checkbox"} value={group.id}
                                           id={"defaultCheck" + group.id} defaultChecked={this.isChecked(group.id)}/>
                                    <label className={"form-check-label"} htmlFor={"defaultCheck" + group.id}>
                                        {group.name}
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

export default EditUser;
