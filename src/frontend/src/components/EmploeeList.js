import React from 'react';

class EmploeeList extends React.Component {
    
    constructor(props) {
        super (props)
        this.handleSubmit = this.handleSubmit.bind(this);
        
        fetch('http://localhost:8080/EmploeeList')
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
    }

    takNie(current) {
        if (current == "on" || current == 1 || current == "true")
            return "tak"
        else
            return "nie"
    }

    handleSubmit(event) {
        event.preventDefault()
        const change = {
            "id": `${event.currentTarget.id}`,
            "active": `${event.currentTarget.active.checked}`,
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
        }

        //sending json to backend
        const URL = 'http://localhost:8080/EmploeeList'

        fetch(URL, {
            method: "POST",
            body: JSON.stringify(change),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        // alert('Operacja przebiegła pomyślnie!');
    }

    generate() {
        var tab = []
        for (const employee of this.state.employees) {
            tab.push(
                <div id="single emploee">

                {/* edit emploee modal */}
                <div class="modal fade" id={"editEmploee" + employee.id} tabindex="-1" aria-labelledby="editEmploee" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editEmploee">Edytuj dane pracownika</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id={employee.id} onSubmit={this.handleSubmit}>
                        <div class="modal-body">
                            <div class="form-outline">
                                <label for="username">Nazwa użytkownika</label>
                                <input type="text" class="form-control" id="username" defaultValue={employee.username}></input>
                            </div>
                            <div class="form-group">
                                <label for="password">Hasło</label>
                                <input type="password" class="form-control" id="password"></input>
                            </div>
                            <div className="form-group">
                                <label for="role">Rola</label>
                                <select id="role" class="form-control">
                                <option selected={(() => {if(employee.role == "pracownik") return "selected"})()}>Pracownik</option>
                                <option selected={(() => {if(employee.role == "manager") return "selected"})()}>Manager</option>
                                <option selected={(() => {if(employee.role == "admin" || employee.role == "Administrator") return "selected"})()}>Administrator</option>
                                </select>
                            </div>
                            <div class="form-row mb-3">
                                <div class="col">
                                    <label for="firstName">Imię</label>
                                    <input id="firstName" type="text" class="form-control" defaultValue={employee.first_name}></input>
                                </div>
                                <div class="col">
                                    <label for="lastName">Nazwisko</label>
                                    <input id="lastName" type="text" class="form-control" defaultValue={employee.last_name}></input>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col mr-5">
                                    <label for="salary">Wynagrodzenie</label>
                                    <input id="salary" type="number" class="form-control" defaultValue={employee.salary}></input>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="active" defaultChecked={(() => {if (employee.active) return "defaultChecked"})()}></input>
                                    <label class="form-check-label" for="active">Aktywna</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                            <button type="submit" class="btn btn-primary">Potwierdź</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>

                {/* single emploee card */}
                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="col-9">
                                <div class="row">
                                    <h5>ID użytkownika: {employee.id} </h5>
                                </div>
                                <div class="row">
                                    <h4>Nazwa użytkownika: {employee.username}</h4>
                                </div>
                                <div class="row">
                                    <h5>Aktywny: {this.takNie(employee.active)} </h5>
                                </div>
                                <div class="row">
                                    <h6>Rola: {employee.role}</h6>
                                </div>
                                <div class="row">
                                    <h6>Imię: {employee.first_name}</h6>
                                </div>
                                <div class="row">
                                    <h6>Nazwisko: {employee.last_name}</h6>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="row justify-content-end">
                                    <button type="buttont" class="btn btn-success text-right" data-toggle="modal" data-target={"#editEmploee" + employee.id}>Edytuj</button>
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

            {/* new emploee button */}
            <div class="row-12 mt-2 justify-content-center">
                <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#newEmploee">Nowy pracownik</button>
            </div>

            {/* new employee modal */}
            <div class="modal fade" id="newEmploee" tabindex="-1" aria-labelledby="newEmploee" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nowy pracownik</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit} id="-1">
                        <div class="modal-body">
                            <div class="form-outline">
                                <label for="username">Nazwa użytkownika</label>
                                <input type="text" class="form-control" id="username" name="username"></input>
                            </div>
                            <div class="form-group">
                                <label for="password">Hasło</label>
                                <input type="password" class="form-control" id="password"></input>
                            </div>
                            <div className="form-group">
                                <label for="role">Rola</label>
                                <select id="role" class="form-control">
                                <option>Pracownik</option>
                                <option>Manager</option>
                                <option>Administrator</option>
                                </select>
                            </div>
                            <div class="form-row mb-3">
                                <div class="col">
                                    <input type="text" id="firstName" class="form-control" placeholder="Imię"></input>
                                </div>
                                <div class="col">
                                    <input type="text" id="lastName" class="form-control" placeholder="Nazwisko"></input>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col mr-5">
                                    <input type="number" id="salary" class="form-control" placeholder="Wynagrodzenie[pln/msc]"></input>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="active" defaultChecked></input>
                                    <label class="form-check-label" for="active">Aktywny</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Zamknij</button>
                            <button type="submit" class="btn btn-primary" >Potwierdź</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>

            {/* emploees list */}
            <div class="row-12 mt-2 justify-content-center">
                <div class="list-group">
                    {this.generate()}
                </div>
            </div>
            
            </div>
        )
    }
}

export default EmploeeList;