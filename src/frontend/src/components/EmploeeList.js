import React from 'react';

class EmploeeList extends React.Component {
    
    constructor(props) {
        super (props)
        this.handleSubmit = this.handleSubmit.bind(this);
        
        fetch('http://localhost:8080/employee-list', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then((jsonData) => {
            this.setState({employees: jsonData})
        })
        .catch((error) => {
            console.error(error)
        })
    
    var json = JSON.parse('[]')
    this.state = {
        employees: json
    }
        
        var json = JSON.parse('[]')
        this.state = {
            employees: json
        }
    }

    zeroOne(current) {
        if (current == true)
            return 1
        else
            return 0
    }

    takNie(current) {
        if (current == "on" || current == 1 || current == "true")
            return "tak"
        else
            return "nie"
    }

    handleSubmit(event) {
        event.preventDefault()
        const URL = 'http://localhost:8080/employee-list'

        const change = {
            "id": `${event.currentTarget.id}`,
            "active": `${this.zeroOne(event.currentTarget.active.checked)}`,
            "username": `${event.currentTarget.username.value}`,
            "password": `${event.currentTarget.password.value}`,
            "role": `${event.currentTarget.role.value}`,
            "first_name": `${event.currentTarget.firstName.value}`,
            "last_name": `${event.currentTarget.lastName.value}`,
            "salary": `${event.currentTarget.salary.value}`
        }

        //updating state
        if (event.currentTarget.id != "-1") {
            let updatedList = this.state.employees.map(item =>
                {
                    if (item.id == change.id) {
                        return change;
                    }
                    return item
                })
            this.setState({employees: updatedList});
            
            //sending json to backend
            fetch(URL, {
                method: "PUT",
                body: JSON.stringify(change),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
        }
        //update service
        else {
            //sending json to backend
            fetch(URL, {
                method: "POST",
                body: JSON.stringify(change),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
        }

        alert('Operacja przebiegła pomyślnie!');
    }

    update() {
        fetch('http://localhost:8080/employee-list', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then((jsonData) => {
            this.setState({employees: jsonData})
        })
        .catch((error) => {
            console.error(error)
        })
    }

    generate() {
        var tab = []
        for (const employee of this.state.employees) {
            tab.push(
                <div id="single emploee">

                {/* edit emploee modal */}
                <div className="modal fade" id={"editEmploee" + employee.id} tabIndex="-1" aria-labelledby="editEmploee" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editEmploee">Edytuj dane pracownika</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id={employee.id} onSubmit={this.handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label for="username">Nazwa użytkownika</label>
                                <input type="text" className="form-control" id="username" defaultValue={employee.username}></input>
                            </div>
                            <div className="form-group">
                                <label for="password">Hasło</label>
                                <input type="password" className="form-control" id="password"></input>
                            </div>
                            <div className="form-group">
                                <label for="role">Rola</label>
                                <select id="role" className="form-control">
                                <option selected={(() => {if(employee.role == "pracownik") return "selected"})()}>Pracownik</option>
                                <option selected={(() => {if(employee.role == "manager") return "selected"})()}>Manager</option>
                                <option selected={(() => {if(employee.role == "admin" || employee.role == "Administrator") return "selected"})()}>Administrator</option>
                                </select>
                            </div>
                            <div className="form-row mb-3">
                                <div className="col">
                                    <label for="firstName">Imię</label>
                                    <input id="firstName" type="text" className="form-control" defaultValue={employee.first_name}></input>
                                </div>
                                <div className="col">
                                    <label for="lastName">Nazwisko</label>
                                    <input id="lastName" type="text" className="form-control" defaultValue={employee.last_name}></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col mr-5">
                                    <label for="salary">Wynagrodzenie</label>
                                    <input id="salary" type="number" className="form-control" defaultValue={employee.salary}></input>
                                </div>
                                <div className="col">
                                    <input type="checkbox" className="form-check-input" id="active" defaultChecked={(() => {if (employee.active) return "defaultChecked"})()}></input>
                                    <label className="form-check-label" for="active">Aktywna</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                            <button type="submit" className="btn btn-primary">Potwierdź</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>

                {/* single emploee card */}
                <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <div className="col-9">
                                <div className="row">
                                    <h5>ID użytkownika: {employee.id} </h5>
                                </div>
                                <div className="row">
                                    <h4>Nazwa użytkownika: {employee.username}</h4>
                                </div>
                                <div className="row">
                                    <h5>Aktywny: {this.takNie(employee.active)} </h5>
                                </div>
                                <div className="row">
                                    <h6>Rola: {employee.role}</h6>
                                </div>
                                <div className="row">
                                    <h6>Imię: {employee.first_name}</h6>
                                </div>
                                <div className="row">
                                    <h6>Nazwisko: {employee.last_name}</h6>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="row justify-content-end">
                                    <button type="buttont" className="btn btn-success text-right" data-toggle="modal" data-target={"#editEmploee" + employee.id}>Edytuj</button>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            )
        }
        return tab
    }

    render() {
        return (
            <div id="emploeeList">

            
            <div className="row mt-2 justify-content-center">
                {/* new emploee button */}
                <div className="col-10">
                    <button type="button" className="btn btn-block btn-info" data-toggle="modal" data-target="#newEmploee">Nowy pracownik</button>
                </div>
                {/* refresh json button */}
                <div className="col">
                    <button type="button" className="btn btn-block btn-warning" onClick={this.update.bind(this)}>Aktualizuj</button>
                </div>
            </div>

            {/* new employee modal */}
            <div className="modal fade" id="newEmploee" tabIndex="-1" aria-labelledby="newEmploee" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nowy pracownik</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit} id="-1">
                        <div className="modal-body">
                            <div className="form-group">
                                <label for="username">Nazwa użytkownika</label>
                                <input type="text" className="form-control" id="username" name="username"></input>
                            </div>
                            <div className="form-group">
                                <label for="password">Hasło</label>
                                <input type="password" className="form-control" id="password"></input>
                            </div>
                            <div className="form-group">
                                <label for="role">Rola</label>
                                <select id="role" className="form-control">
                                <option>Pracownik</option>
                                <option>Manager</option>
                                <option>Administrator</option>
                                </select>
                            </div>
                            <div className="form-row mb-3">
                                <div className="col">
                                    <input type="text" id="firstName" className="form-control" placeholder="Imię"></input>
                                </div>
                                <div className="col">
                                    <input type="text" id="lastName" className="form-control" placeholder="Nazwisko"></input>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col mr-5">
                                    <input type="number" id="salary" className="form-control" placeholder="Wynagrodzenie[pln/msc]"></input>
                                </div>
                                <div className="col">
                                    <input type="checkbox" className="form-check-input" id="active" defaultChecked></input>
                                    <label className="form-check-label" for="active">Aktywny</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                            <button type="submit" className="btn btn-primary" >Potwierdź</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>

            {/* emploees list */}
            <div className="row-12 mt-2 justify-content-center">
                <div className="list-group">
                    {this.generate()}
                </div>
            </div>
            
            </div>
        )
    }
}

export default EmploeeList;