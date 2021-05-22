import React from 'react';

class ServicesList extends React.Component {
    
    constructor(props) {
        super (props)

        // fetch('http://localhost:8080/ServicesList')
        //     .then(response => response.json())
        //     .then((jsonData) => {
        //         this.setState({employees: jsonData})
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })
        var json = JSON.parse(`[
            { "id": 1, "active": false, "parent": 0, "child": 0, "name": "Pierwsza usługa", "price": 150 },
            {
              "id": 2,
              "active": true,
              "child":
                [
                  { "id": 3, "active": true, "parent": 2, "child": 0, "name": "Pierwsza pod-usługa", "price": 25 },
                  { "id": 4, "active": true, "parent": 2, "child": 0, "name": "Druga pod-usługa", "price": 50 },
                  { "id": 5, "active": true, "parent": 2, "child": 
                    [
                        { "id": 6, "active": true, "parent": 5, "child":
                            [
                                { "id": 7, "active": true, "parent": 6, "child": 0, "name": "Pierwsza pod-pod-pod-usługa", "price": 250 }
                            ], 
                            "name": "Pierwsza pod-pod-usługa", "price": 0 }
                    ], 
                    "name": "Trzecia pod-usługa", "price": 0 }
                ],
                "name": "Druga usługa", "price": 0 },
            { "id": 8, "active": true, "parent": 0, "child": 
                [
                    {"id": 9, "active": false, "parent": 0, "child": 0, "name": "Pierwsza pod-usługa", "price": 15}
                ], "name": "Trzecia usługa", "price": 0}
        ]`)
        
        // var json = JSON.parse(`[]`)
        this.state = {
            services: json
        }
    }

    generate(services) {
        var tab = []
        for (const service of services) {
            
            // edit service modal
            tab.push (
                <div class="modal fade" id={"editService"+service.id} tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edytuj usługę</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div class="form-outline">
                                <label for="name">Nazwa</label>
                                <input type="text" class="form-control" id="name" defaultValue={service.name}></input>
                            </div>
                            <div class="form-group">
                                <label for="parentID">ID rodzica</label>
                                <input type="number" class="form-control" id="parentID" defaultValue={service.parent}></input>
                            </div>
                            <div class="form-row">
                                <div class="col mr-5">
                                    <label for="price">Cena</label>
                                    <input type="number" class="form-control" defaultValue={service.price}></input>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="active" checked={(() => {if (service.active) return "checked"})()}></input>
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
            )

            // childless service
            if (service.child == 0) {
                tab.push (
                    <div>
                    {/* single service */}
                    <div class="row card-body">
                        <div className="col-9">
                            ID: {service.id}
                            <h5><b>{service.name}</b></h5>
                            Cena: {service.price}zł
                        </div>
                        <div className="col-3 text-right">
                            <div class="row justify-content-end">
                                <button type="buttont" class="btn btn-success text-right" data-toggle="modal" data-target={"#editService" + service.id}>Edytuj</button>
                            </div>
                        </div>
                    </div>
                    </div>
                )
            }

            // services with childs
            else {
                tab.push (
                    <div>
                        <div class="row card-header">
                            <div className="col-9">
                                ID: {service.id}
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={"#collapse"+service.id} aria-expanded="true">
                                    <h5><b>{service.name}</b></h5>
                                </button>
                            </div>
                            <div className="col-3 text-right">
                            <div class="row justify-content-end">
                                <button type="buttont" class="btn btn-success text-right" data-toggle="modal" data-target={"#editService" + service.id}>Edytuj</button>
                            </div>
                            </div>
                        </div>

                        <div id={"collapse"+service.id} class="collapse collapsed">
                            <div class="card-body">
                                {this.generate(service.child)}
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return tab
    }

    render() {
        return (
            <div id="servicesList">

            {/* new service button */}
            <div class="row-12 mt-2 justify-content-center">
                <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#newService">Nowa usługa</button>
            </div>

            {/* new service modal */}
            <div class="modal fade" id="newService" tabindex="-1" aria-labelledby="newService" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nowa usługa</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div class="form-outline">
                                <label for="name">Nazwa</label>
                                <input type="text" class="form-control" id="name"></input>
                            </div>
                            <div class="form-group">
                                <label for="parentID">ID rodzica</label>
                                <input type="number" class="form-control" id="parentID"></input>
                            </div>
                            <div class="form-row">
                                <div class="col mr-5">
                                    <label for="price">Cena</label>
                                    <input type="number" class="form-control" id="price"placeholder="Cena"></input>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="active" checked></input>
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


            {/* services list */}
            <div class="row-12 mt-2 justify-content-center">
                <div class="accordion" id="accordionServices">
                    {this.generate(this.state.services)}
                </div>
            </div>
            
            </div>
        )
    }
}

export default ServicesList;