import React from 'react';
import ResourceList from './ResourceList';

class RegistryList extends React.Component {
    

    constructor(props) {
        super (props)
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch('http://localhost:8080/service-history')
            .then(response => response.json())
            .then((jsonData) => {
                this.setState({services: jsonData})
            })
            .catch((error) => {
                console.error(error)
            })
        var json = JSON.parse(`[]`)

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
            nOfResources: 1,
            newResources: [
                <select class="custom-select mb-1" id="resource1">
                    <option selected>Wybierz...</option>
                    <option value="1">Zasób 1</option>
                    <option value="2">Zasób 2</option>
                    <option value="3">Zasób 3</option>
                </select>
                ],
            nOfServices: 1,
            newServices: [
                <select class="custom-select mb-1" id="service1">
                    <option selected>Wybierz...</option>
                    <option value="1">Usługa 21</option>
                    <option value="2">Usługa 2</option>
                    <option value="3">Usługa 3</option>
                </select>
                ]
        }
    }

    listServiceDetails(event)
    {
        var tab = []
        var r
        console.log("n of serv "+this.state.nOfServices)
        for(var i = 1; i <= this.state.nOfServices-1; i++)
        {
            r = document.getElementById("service"+i)
            tab.push(r.value)
        }
        return tab
        //console.log(tab)
    }

    listResourceDetails(event)
    {
        var tab = []
        var r
        console.log("n of res "+this.state.nOfResources)
        for(var i = 1; i <= this.state.nOfResources-1; i++)
        {
            r = document.getElementById("resource"+i)
            tab.push(r.value)
        }
        return tab
        //console.log(tab)
    }



    handleSubmit(event) {
        event.preventDefault()
        console.log("ilosc dodanych??"+this.state.nOfServices)
        const newReg = {
            "plateNumber": `${event.currentTarget.plateNumber.value}`,
            "date": `${event.currentTarget.date.value}`,
            "service": `${JSON.stringify(this.listServiceDetails(event))}`,
            "resource": `${JSON.stringify(this.listResourceDetails(event))}`
        }
        console.log(newReg)

        const URL = 'http://localhost:8080/service-history'

        fetch(URL, {
            method: "POST",
            body: JSON.stringify(newReg),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        console.log(JSON.stringify(newReg))
        alert('Operacja przebiegła pomyślnie!');
    }

    generateDetails(details) {
        var tab = []
        for (const detail of details) {
            tab.push(
                <div className="row">
                    <div className="col">
                        {detail.name}
                    </div>
                    <div className="col text-right">
                        {detail.price}zł
                    </div>
                </div>
            )
        }
        return tab
    }

    generate() {
        var tab = []
        for (const service of this.state.services) {
            tab.push(
                // single registry entry
                <a id={"accordion" + service.id} href="#" class={"list-group-item list-group-item-action " + (() => {if (!service.completed) return "active"})()} aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="col-9">
                            <div class="row">
                                <h5>ID usługi: {service.id} </h5>
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
                                {this.generateDetails(service.details)}
                            </div>
                            </div>

                        </div>
                        <div className="col-3 text-right">
                            <h3>Cena: {/*service.price*/this.priceSum(service.details)}zł</h3>
                            <div className="row justify-content-end align-self-end">
                                <button type="button" class="btn btn-warning" onClick={(e) => this.handleCompleteServiceClick(service.id, e)} disabled={(()=>{if (service.completed) return "disabled"})()}>Zakończ</button>
                            </div>
                        </div>
                    </div>
                </a>
            )
        }
        return tab
    }

    //summarize service price
    priceSum(details)
    {
        var sum = 0
        for (const detail of details) {
            sum+=detail.price
        }
        return sum
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
    generateServ()
    {
        var tab = []
        for(const serviceList of this.state.serviceList)
        {
            tab.push(
                <option>{serviceList.name}</option>
            )
        }
        return tab;
    }

    
    renderRes()
    {
        this.setState({newResources: [
            <select class="custom-select mb-1" id={"resource" + this.state.nOfResources}>
            <option selected>Wybierz...</option>
            {this.generateRes()}
        </select>
        ]})  
    }

    renderServ()
    {
        this.setState({newServices: [ 
            <select class="custom-select mb-1" id={"service" + this.state.nOfServices}>
                <option selected>Wybierz...</option>
                {this.generateServ()}
            </select>
        ]})
    }

    addResource() {
        
        this.setState({nOfResources: this.state.nOfResources + 1});
        this.setState({newResources: [...this.state.newResources,
            <select class="custom-select mb-1" id={"resource" + this.state.nOfResources}>
            <option selected>Wybierz...</option>
            {this.generateRes()}
        </select>
        ]})        
    }

    removeResource() {
        this.setState({nOfResources: this.state.nOfResources - 1});
        this.state.newResources.pop();
    }

    addService() {
        this.setState({nOfServices: this.state.nOfServices+1})
        this.setState({newServices: [...this.state.newServices, 
            <select class="custom-select mb-1" id={"service" + this.state.nOfServices}>
                <option selected>Wybierz...</option>
                {this.generateServ()}
            </select>
        ]})
    }

    handleCompleteServiceClick(id) {
        console.log('clicked complete service   ', id);
        const body = {
            "id": `${id}`
        }

        fetch('http://127.0.0.1:8080/service-history', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(body),
            })
            .then(response => response.json())
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
                        <h5 class="modal-title">Nowa usługa</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="plateNumber">Nr. rejestracyjny</label>
                                <input type="text" class="form-control" id="plateNumber"></input>
                            </div>
                            <div class="form-group">
                                <label for="date">Data</label>
                                <input type="date" class="form-control" id="date"></input>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Zasoby</label>
                                    <div class="row form-group ml-1">
                                        {this.state.newResources}
                                    </div>
                                    <div className="row ml-1">
                                        <button type="button" class="col mr-1 btn btn-primary" onClick={() => this.addResource()}>+ zasób</button>       
                                        <button type="button" class="col btn btn-primary" onClick={() => this.removeResource()}>- zasób</button>       
                                    </div>
                                </div>
                                <div className="col-6">
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
