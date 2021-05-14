import React from 'react';

class EmploeeList extends React.Component {
    
    constructor(props) {
        super (props)
        var json = JSON.parse('[{"id":1, "active":true, "username": "lesnik", "role": "Emploee", "first_name": "Andżej", "last_name": "Cienkopis", "salary":2800}, {"id":2, "active":false, "username": "prezes", "role": "Administrator", "first_name": "Czaruś", "last_name": "Fiona", "salary":280000}]')
        
        this.state = {
            employees: json
        }
    }

    generate() {
        var tab = []
        for (const employee of this.state.employees) {
            tab.push(
                // edit emploee modal
                <div id="single emploee">
                <div class="modal fade" id={"editEmploee" + employee.id} tabindex="-1" aria-labelledby="editEmploee" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editEmploee">Edit emploee</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div class="form-outline">
                                <label for="username">Username</label>
                                <input type="text" class="form-control" id="username" defaultValue={employee.username}></input>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password"></input>
                            </div>
                            <div className="form-group">
                                <label for="role">Role</label>
                                <select id="role" class="form-control">
                                <option selected={(() => {if(employee.role == "Emploee") return "selected"})()}>Emploee</option>
                                <option selected={(() => {if(employee.role == "Manager") return "selected"})()}>Manager</option>
                                <option selected={(() => {if(employee.role == "Administrator") return "selected"})()}>Administrator</option>
                                </select>
                            </div>
                            <div class="form-row mb-3">
                                <div class="col">
                                    <label for="firstName">First name</label>
                                    <input id="firstName" type="text" class="form-control" defaultValue={employee.first_name}></input>
                                </div>
                                <div class="col">
                                    <label for="lastName">Last name</label>
                                    <input id="lastName" type="text" class="form-control" defaultValue={employee.last_name}></input>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col mr-5">
                                    <label for="salary">Salary</label>
                                    <input id="salary" type="number" class="form-control" defaultValue={employee.salary}></input>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="active" checked={(() => {if (employee.active) return "checked"})()}></input>
                                    <label class="form-check-label" for="active">Active</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Submit</button>
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
                                    <h5>USER_ID: {employee.id} </h5>
                                </div>
                                <div class="row">
                                    <h4>USER_NAME: {employee.username}</h4>
                                </div>
                                <div class="row">
                                    <h5>ACTIVE: {employee.active.toString()} </h5>
                                </div>
                                <div class="row">
                                    <h6>ROLE: {employee.role}</h6>
                                </div>
                                <div class="row">
                                    <h6>FIRST_NAME: {employee.first_name}</h6>
                                </div>
                                <div class="row">
                                    <h6>LAST_NAME: {employee.last_name}</h6>
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
                <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#newEmploee">Dodaj pracownika</button>
            </div>

            {/* new employee modal */}
            <div class="modal fade" id="newEmploee" tabindex="-1" aria-labelledby="newEmploee" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newEmploee">New emploee</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div class="form-outline">
                                <label for="username">Username</label>
                                <input type="text" class="form-control" id="username"></input>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password"></input>
                            </div>
                            <div className="form-group">
                                <label for="role">Role</label>
                                <select id="role" class="form-control">
                                <option>Emploee</option>
                                <option>Manager</option>
                                <option>Administrator</option>
                                </select>
                            </div>
                            <div class="form-row mb-3">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="First name"></input>
                                </div>
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Last name"></input>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col mr-5">
                                    <input type="number" class="form-control" placeholder="Salary [pln/month]"></input>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="active" checked></input>
                                    <label class="form-check-label" for="active">Active</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Submit</button>
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