import React from 'react';

class EmploeeList extends React.Component {
    
    constructor(props) {
        super (props)
        var json = JSON.parse('[{"id":1, "active":true, "username": "lesnik", "role": "pracownik", "first_name": "Andżej", "last_name": "Cienkopis"}, {"id":2, "active":false, "username": "prezes", "role": "admin", "first_name": "Czaruś", "last_name": "Fiona"}]')
        
        this.state = {
            employees: json
        }
    }

    generate() {
        var tab = []
        for (const employee of this.state.employees) {
            tab.push(
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
                                <div class="row">
                                    <div class="col">
                                        <button type="button" class="btn btn-success">Edytuj</button>
                                    </div>
                                    <div class="col">
                                        {(() => {
                                            if (employee.active)
                                                return <button type="button" class="btn btn-danger">Dezaktywuj</button>
                                            else
                                                return <button type="button" class="btn btn-danger">Aktywuj</button>
                                            })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
            )
        }
        return tab
    }

    render() {
        return (
            <div id="emploeeList">
            <div class="row-12 mt-2 justify-content-center">
                <button type="button" class="btn btn-block btn-info">Dodaj pracownika</button>
            </div>
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