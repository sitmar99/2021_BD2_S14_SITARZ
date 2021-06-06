import React from 'react';

class ServicesList extends React.Component {
    
    constructor(props) {
        super (props)
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch('http://localhost:8080/services-list', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then((jsonData) => {
            this.setState({services: jsonData})
        })
        .catch((error) => {
            console.error(error)
        })
    
        var json = JSON.parse(`[]`)
        this.state = {
            services: json
        }
    }

    zeroOne(current) {
        if (current == true)
            return 1
        else
            return 0
    }
    
    handleSubmit(event) {
        event.preventDefault()
        const URL = 'http://localhost:8080/services-list'

        const change = {
            "id": `${event.currentTarget.id}`,
            "active": `${this.zeroOne(event.currentTarget.active.checked)}`,
            "name": `${event.currentTarget.name.value}`,
            "parent_id": `${event.currentTarget.parentID.value}`,
            "price": `${event.currentTarget.price.value}`
        }

        //update service
        if (event.currentTarget.id != "-1") {
            //updating state
            let updatedList = this.state.services.map(item =>
                {
                    if (item.id == change.id) {
                        return change;
                    }
                    return item
                })
            this.setState({services: updatedList});

            //sending json to backend
            fetch(URL, {
                method: "PUT",
                body: JSON.stringify(change),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                credentials: 'include'
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
                },
                credentials: 'include'
            })
        }
        alert('Operacja przebiegła pomyślnie!');
    }

    update() {
        fetch('http://localhost:8080/service-list', {
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

    generate(services) {
        var tab = []
        for (const service of services) { 
            tab.push (
            <div id="singleService">

                {/* edit service modal */}
                <div className="modal fade" id={"editService"+service.id} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edytuj usługę</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit} id={service.id}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label for="name">Nazwa</label>
                                <input type="text" className="form-control" id="name" defaultValue={service.name}></input>
                            </div>
                            <div className="form-group">
                                <label for="parentID">ID rodzica</label>
                                <input type="number" className="form-control" id="parentID" defaultValue={service.parent}></input>
                            </div>
                            <div className="form-row">
                                <div className="col-5">
                                    <input type="number" className="form-control" id="price" defaultValue={service.price} placeholder="Cena"></input>
                                </div>
                                <div className="col mr-5 align-self-end">
                                    <label for="price">zł</label>
                                </div>
                                <div className="col-3 align-self-center">
                                    <input type="checkbox" className="form-check-input" id="active" defaultChecked={(() => {if (service.active) return "defaultChecked"})()}></input>
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
                </div>
            )

            // childless service
            if (!service.child) {
                tab.push (
                    <div>
                    {/* single service */}
                    <div className="row card-body">
                        <div className="col-9">
                            ID: {service.id}
                            <h5><b>{service.name}</b></h5>
                            Cena: {service.price}zł
                        </div>
                        <div className="col-3 text-right">
                            <div className="row justify-content-end">
                                <button type="buttont" className="btn btn-success text-right" data-toggle="modal" data-target={"#editService" + service.id}>Edytuj</button>
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
                        <div className="row card-header">
                            <div className="col-9">
                                ID: {service.id}
                                <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={"#collapse"+service.id} aria-expanded="true">
                                    <h5><b>{service.name}</b></h5>
                                </button>
                            </div>
                            <div className="col-3 text-right">
                            <div className="row justify-content-end">
                                <button type="buttont" className="btn btn-success text-right" data-toggle="modal" data-target={"#editService" + service.id}>Edytuj</button>
                            </div>
                            </div>
                        </div>

                        <div id={"collapse"+service.id} className="collapse collapsed">
                            <div className="card-body">
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

            <div className="row mt-2 justify-content-center">
                <div className="col-10">
                {/* new service button */}
                    <button type="button" className="btn btn-block btn-info" data-toggle="modal" data-target="#newService">Nowa usługa</button>
                </div>
                {/* refresh json button */}
                <div className="col">
                    <button type="button" className="btn btn-block btn-warning" onClick={this.update.bind(this)}>Aktualizuj</button>
                </div>
            </div>

            {/* new service modal */}
            <div className="modal fade" id="newService" tabIndex="-1" aria-labelledby="newService" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nowa usługa</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit} id="-1">
                        <div className="modal-body">
                            <div className="form-group">
                                <label for="name">Nazwa</label>
                                <input type="text" className="form-control" id="name"></input>
                            </div>
                            <div className="form-group">
                                <label for="parentID">ID rodzica</label>
                                <input type="number" className="form-control" id="parentID"></input>
                            </div>
                            <div className="form-row">
                            <div className="col-5">
                                    <input type="number" className="form-control" id="price" placeholder="Cena"></input>
                                </div>
                                <div className="col mr-5 align-self-end">
                                    <label for="price">zł</label>
                                </div>
                                <div className="col-3 align-self-center">
                                    <input type="checkbox" className="form-check-input" id="active" defaultChecked></input>
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


            {/* services list */}
            <div className="row-12 mt-2 justify-content-center">
                <div className="accordion" id="accordionServices">
                    {this.generate(this.state.services)}
                </div>
            </div>
            
            </div>
        )
    }
}

export default ServicesList;