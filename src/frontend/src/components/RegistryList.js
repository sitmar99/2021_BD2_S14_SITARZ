import React from 'react';
import ResourceList from './ResourceList';

class RegistryList extends React.Component {
    

    constructor(props) {
        super (props)
        var json = JSON.parse(`[
            {"id":1, "completed": true, "date": "12-05-2021", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717B", "price": 130},
            {"id":2, "completed": false, "date": "12-07-2031", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717A", "price": 230}
        ]`)
        
        this.state = {
            services: json,
            newResources: [
                <select class="custom-select mb-1" id="resource">
                    <option selected>Choose...</option>
                    <option value="1">Resource 1</option>
                    <option value="2">Resource 2</option>
                    <option value="3">Resource 3</option>
                </select>
                ],
            newServices: [
                <select class="custom-select mb-1" id="service">
                    <option selected>Choose...</option>
                    <option value="1">Service 1</option>
                    <option value="2">Service 2</option>
                    <option value="3">Service 3</option>
                </select>
                ]
        }
    }

    checkComplete(completed) {
        if (completed)
            return ""
        return "active"
    }

    generate() {
        var tab = []
        for (const service of this.state.services) {
            tab.push(
                // single registry entry
                <a id={"accordion" + service.id} href="#" class={"list-group-item list-group-item-action " + this.checkComplete(service.completed)} aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="col-9">
                            <div class="row">
                                <h5>Service id: {service.id} </h5>
                            </div>
                            <div class="row">
                                <h4>Date: {service.date}</h4>
                            </div>
                            <div class="row">
                                <h5>Last name: {service.last_name}</h5>
                            </div>
                            <div class="row">
                                <h6>First name: {service.first_name} </h6>
                            </div>
                            <div class="row">
                                <h6>Plate number: {service.plate_number}</h6>
                            </div>
                            <div class="row">
                                <button class="btn btn-secondary text-left" type="button" data-toggle="collapse" data-target={"#collapse"+service.id} aria-expanded="false" aria-controls={"collapse"+service.id}>
                                    Details
                                </button>
                            </div>
                        
                            <div id={"collapse"+service.id} class="rowcollapse collapse" aria-labelledby="headingOne" data-parent={"#accordion" + service.id}>
                            <div class="card-body">
                                Some important (or not) details about the service.
                            </div>
                            </div>

                        </div>
                        <div className="col-3 text-right">
                            <h3>Cena: {service.price}zł</h3>
                        </div>

                    </div>
                </a>
            )
        }
        return tab
    }

    addResource() {
        this.setState({newResources: [this.state.newResources, 
            <select class="custom-select mb-1" id="resource">
                <option selected>Choose...</option>
                <option value="1">Resource 1</option>
                <option value="2">Resource 2</option>
                <option value="3">Resource 3</option>
            </select>
        ]})
    }

    addService() {
        this.setState({newServices: [this.state.newServices, 
            <select class="custom-select mb-1" id="resource">
                <option selected>Choose...</option>
                <option value="1">Service 1</option>
                <option value="2">Service 2</option>
                <option value="3">Serivce 3</option>
            </select>
        ]})
    }

    render() {
        return (
            <div id="registryList">

            {/* new registry entry button */}
            <div class="row-12 mt-2 justify-content-center">
                <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#newRegistry">New registry entry</button>
            </div>

            {/* new registry entry modal */}
            <div class="modal fade" id="newRegistry" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">New registry entry</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div class="form-outline">
                                <label for="plateNumber">Plate number</label>
                                <input type="text" class="form-control" id="plateNumber"></input>
                            </div>
                            <div class="form-group">
                                <label for="date">Date</label>
                                <input type="date" class="form-control" id="date"></input>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div class="row form-group ml-1 mr-1">
                                        <label for="date">Resources</label>
                                        {this.state.newResources}
                                    </div>
                                    <div className="row ml-1 mr-1">
                                        <button type="button" class="btn btn-block btn-primary" onClick={() => this.addResource()}>Add resource</button>       
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div class="row form-group ml-1 mr-1">
                                        <label for="date">Services</label>
                                        {this.state.newServices}
                                    </div>
                                    <div className="row ml-1 mr-1">
                                        <button type="button" class="btn btn-block btn-primary" onClick={() => this.addService()}>Add service</button>       
                                    </div>
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
