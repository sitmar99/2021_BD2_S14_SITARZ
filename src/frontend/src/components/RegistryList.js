import React from 'react';
import ResourceList from './ResourceList';

//TODO: step w input number w resources

class RegistryList extends React.Component {
    

    constructor(props) {
        super (props)
        this.handleSubmitNewRegistry = this.handleSubmitNewRegistry.bind(this);
        this.handleSubmitFinishRegistry = this.handleSubmitFinishRegistry.bind(this);

        fetch('http://localhost:8080/service-history')
            .then(response => response.json())
            .then((jsonData) => {
                this.setState({services: jsonData})
            })
            .catch((error) => {
                console.error(error)
            })
        var json = JSON.parse(`[]`)
        // var json = JSON.parse(`[
        //     {"id":1, "completed": true, "date": "12-05-2021", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717B", "price": 130, "details":
        //         [
        //             {"name": "mycie szyb", "price": "100"},
        //             {"name": "pranie", "price": 30}
        //         ]},
        //     {"id":2, "completed": false, "date": "12-07-2031", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717A", "price": 230, "details":
        //     [
        //         {"name": "mycie kół", "price": "200"},
        //         {"name": "pranie", "price": 30}
        //     ]}
        // ]`)


        fetch('http://localhost:8080/resource-list')
            .then(response => response.json())
            .then((jsonData) => {
                this.setState({resources: jsonData})
                this.renderRes()
            })
            .catch((error) => {
                console.error(error)
            })
        var jsonRes = JSON.parse(`[]`)

        fetch('http://localhost:8080/services-list')
            .then(response => response.json())
            .then((jsonData) => {
                this.setState({serviceList: jsonData})
                this.renderServ()
            })
            .catch((error) => {
                console.error(error)
            })
        var jsonServ = JSON.parse(`[]`)


        this.state = {
            resources: jsonRes,
            services: json,
            serviceList: jsonServ,
            nOfResources: 2,
            newResources: [
                <div className="row">
                    <select class="custom-select ml-2 mb-1 col-7" id="resource1">
                        <option selected>Wybierz...</option>
                        <option value="1">Usługa 1</option>
                        <option value="2">Usługa 2</option>
                        <option value="3">Usługa 3</option>
                    </select>
                    <div className="col">
                        <input type="number" id="quantity1" class="form-control"></input>
                    </div>
                </div>
                ],
            nOfServices: 2,
            newServices: [
                <select class="custom-select mb-1" id="service1">
                    <option selected>Wybierz...</option>
                    <option value="1">Usługa 1</option>
                    <option value="2">Usługa 2</option>
                    <option value="3">Usługa 3</option>
                </select>
                ]
        }
    }



    handleSubmitNewRegistry(event) {
        event.preventDefault()
        const URL = 'http://localhost:8080/service-history'

        var services = []
        for (var i=1; i<this.state.nOfServices; i++) {
            services.push(document.getElementById("service"+i).value)
        }

        const change = {
            "date": `${event.currentTarget.date.value}`,
            "plate_nuber": `${event.currentTarget.plate_number.value}`,
            "services": services
        }

        //sending json to backend
        fetch(URL, {
            method: "PUT",
            body: JSON.stringify(change),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        this.setState({
            nOfServices: 2,
            newServices: [
                <select class="custom-select mb-1" id={"service1"}>
                    <option selected>Wybierz...</option>
                    {this.generateServ}
                </select>
                ]
        })
    }

    handleSubmitFinishRegistry(event) {
        event.preventDefault()
        const URL = 'http://localhost:8080/service-history'

        var resources = []
        for (var i=1; i<this.state.nOfResources; i++) {
            resources.push({
                name: document.getElementById("resource"+i).value,
                quantity: document.getElementById("quantity"+i).value
                })
        }

        const change = {
            "id": `${event.currentTarget.id}`,
            "resources": resources
        }

        //sending json to backend
        fetch(URL, {
            method: "PATCH",
            body: JSON.stringify(change),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        this.setState({
            nOfResources: 2,
            newResources: [
                <div className="row">
                    <select class="custom-select ml-2 mb-1 col-7" id="resource1">
                        <option selected>Wybierz...</option>
                        {this.generateRes}
                    </select>
                    <div className="col">
                        <input type="number" step="0.1" id="quantity1" class="form-control"></input>
                    </div>
                </div>
                ]
        })
    }

    // generateDetails(details) {
    //     var tab = []
    //     for (const detail of details) {
    //         tab.push(
    //             <div className="row">
    //                 <div className="col">
    //                     {detail.name}
    //                 </div>
    //                 <div className="col text-right">
    //                     {detail.price}zł
    //                 </div>
    //             </div>
    //         )
    //     }
    //     return tab
    // }

    generate() {
        var tab = []
        for (const service of this.state.services) {
            tab.push(
                <div>
                {/* finish registry modal */}
                <div class="modal fade" id={"finishRegistry" + service.id} tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Finalizuj realizacje</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmitFinishRegistry} id={service.id}>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="plateNumber">Nr. rejestracyjny</label>
                                <input type="text" class="form-control" id="plate_number" defaultValue={service.plate_number}></input>
                            </div>
                            <div class="form-group">
                                <label for="date">Data</label>
                                {/* TODO: Function to show date */}
                                <input type="date" class="form-control" id="date" defaultValue="2021-01-01"></input>    
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Zasoby</label>
                                    <div class="form-group mr-1 ml-1">
                                        {this.state.newResources}
                                    </div>
                                    <div className="row ml-1 mr-1">
                                        <button type="button" class="col mr-1 btn btn-primary" onClick={() => this.addResource()}>+ zasób</button>       
                                        <button type="button" class="col btn btn-primary" onClick={() => this.removeResource()}>- zasób</button>       
                                    </div>
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

                {/* single registry entry */}
                <a id={"accordion" + service.id} href="#" class={"list-group-item list-group-item-action " + (() => {if (!service.completed) return "active"})()} aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="col-9">
                            <div class="row">
                                <h5>ID realizacji: {service.id} </h5>
                            </div>
                            <div class="row">
                                <h4>Data: {service.date}</h4>
                            </div>
                            <div class="row">
                                <h5>Nazwisko: {service.last_name}</h5>
                            </div>
                            <div class="row">
                                <h6>Imię: {service.first_name} </h6>
                            </div>
                            <div class="row">
                                <h6>Nr. rejestracyjny: {service.plate_number}</h6>
                            </div>
                            <div class="row">
                                <button class="btn btn-secondary text-left" type="button" data-toggle="collapse" data-target={"#collapse"+service.id} aria-expanded="false" aria-controls={"collapse"+service.id}>
                                    Szczegóły
                                </button>
                            </div>
                        
                            <div id={"collapse"+service.id} class="rowcollapse collapse" aria-labelledby="headingOne" data-parent={"#accordion" + service.id}>
                            <div class="card-body">
                                Poszczególne usługi:
                                {/* {this.generateDetails(service.details)} */}
                            </div>
                            </div>

                        </div>
                        <div className="col-3 text-right">
                            <h3>Cena: {service.price}zł</h3>
                            <div className="row justify-content-end align-self-end">
                                {/* <button type="button" class="btn btn-warning" disabled={(()=>{if (service.completed) return "disabled"})()} data-toggle="modal" data-target={"#finishRegistry"+service.id}>Zakończ</button> */}
                                <button type="button" class="btn btn-warning" data-toggle="modal" data-target={"#finishRegistry"+service.id}>Zakończ</button>
                            </div>
                        </div>

                    </div>
                </a>
                </div>
            )
        }
        return tab
    }

    //create option array for resources
    generateRes()
    {
        var tab = []
        for(const resouces of this.state.resources)
        {
            tab.push(
                <option>{resouces.name}</option>
            )
        }
        return tab;
    }

    //create option array for services
    generateServ() {
        var tab = []
        for(const serviceList of this.state.serviceList)
        {
            tab.push(
                <option>{serviceList.name}</option>
            )
        }
        return tab;
    }

    renderRes() {
        this.setState({newResources: [
            <div className="row">
                <select class="custom-select ml-2 mb-1 col-7" id="resource1">
                    <option selected>Wybierz...</option>
                    {this.generateRes()}
                </select>
                <div className="col">
                    <input type="number" id="quantity1" class="form-control"></input>
                </div>
            </div>
        ]})  
    }

    renderServ() {
        this.setState({newServices: [ 
            <select class="custom-select mb-1" id="service1">
                <option selected>Wybierz...</option>
                {this.generateServ()}
            </select>
        ]})
    }

    addResource() {
        this.setState({nOfResources: this.state.nOfResources + 1});
        this.setState({newResources: [...this.state.newResources,
            <div className="row">
            <select class="custom-select ml-2 mb-1 col-7" id={"resource" + this.state.nOfResources}>
                <option selected>Wybierz...</option>
                {this.generateRes()}
            </select>
            <div className="col">
                <input type="number" step="0.1" id={"quantity" + this.state.nOfResources} class="form-control"></input>
            </div>
            </div>
        ]})        
    }

    removeResource() {
        this.setState({nOfResources: this.state.nOfResources - 1});
        this.state.newResources.pop();
    }

    addService() {
        this.setState({nOfServices: this.state.nOfServices + 1})
        this.setState({newServices: [...this.state.newServices, 
            <select class="custom-select mb-1" id={"service" + this.state.nOfServices}>
                <option selected>Wybierz...</option>
                {this.generateServ()}
            </select>
        ]})
    }

    removeService() {
        this.setState({nOfResources: this.state.nOfServices - 1});
        this.state.newServices.pop();
    }

    render() {
        return (
            <div id="registryList">

            {/* new registry entry button */}
            <div class="row-12 mt-2 justify-content-center">
                <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#newRegistry">Nowa realizacja</button>
            </div>

            {/* new registry entry modal */}
            <div class="modal fade" id="newRegistry" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nowa realizacja</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmitNewRegistry} id="-1">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="plateNumber">Nr. rejestracyjny</label>
                                <input type="text" class="form-control" id="plate_number"></input>
                            </div>
                            <div class="form-group">
                                <label for="date">Data</label>
                                <input type="date" class="form-control" id="date"></input>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Usługi</label>
                                    <div class="row form-group ml-1 mr-1">
                                        {this.state.newServices}
                                    </div>
                                    <div className="row ml-1 mr-1">
                                        <button type="button" class="col mr-1 btn btn-primary" onClick={() => this.addService()}>+ usługa</button>       
                                        <button type="button" class="col btn btn-primary" onClick={() => this.removeService()}>- usługa</button>
                                    </div>
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

            {/* registry list */}
            <div class="row-12 mt-2 justify-content-center">
                <div class="list-group accordion">
                    {this.generate()}
                </div>
            </div>
            </div>
        )
    }
}

export default RegistryList;
