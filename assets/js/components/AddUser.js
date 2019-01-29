import React from 'react';

class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {groupList: [], name: null, groups: []};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    };

    handleGroupChange = (id) => {
        let groups = this.state.groups;
        groups.push(id);

        this.setState({groups: groups.filter((v, i, a) => a.indexOf(v) === i)})
    };

    handleSave = (event) => {
        event.preventDefault();

        if(!this.state.name){
            alert('Name is required');

            return;
        }

        fetch("api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: this.state.name,  groups: this.state.groups})
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

    render() {
        return (
            <form className={"border p-4 pt-2"}>
                <h3>Adding User <button onClick={this.handleClose} className={"btn btn-sm btn-dark float-right"}>Close</button></h3>
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
                        <label>Groups:</label>
                        <ul className={"border pt-2 pb-2 group-inline"}>
                            {this.state.groupList.map((group) =>
                                <li key={group.id}>
                                    <input onChange={() => this.handleGroupChange(group.id)} className={"form-check-input"} type={"checkbox"} value={group.id}
                                           id={"defaultCheck"+group.id}/>
                                    <label className={"form-check-label"} htmlFor={"defaultCheck"+group.id}>
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

export default AddUser;
