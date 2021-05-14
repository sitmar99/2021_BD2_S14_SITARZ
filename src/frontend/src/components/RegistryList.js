import React from 'react';

class RegistryList extends React.Component {
    
    constructor(props) {
        super (props)
        var json = JSON.parse(`[
            {"id":1, "completed": true, "date": "12-05-2021", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717B", "price": 130},
            {"id":2, "completed": false, "date": "12-07-2031", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717A", "price": 230}
        ]`)
        
        this.state = {
            services: json
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

    render() {
        return (
            <div id="registryList">
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
