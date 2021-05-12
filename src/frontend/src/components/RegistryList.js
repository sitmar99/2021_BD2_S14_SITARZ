import React from 'react';

class EmploeeList extends React.Component {
    
    constructor(props) {
        super (props)
        var json = JSON.parse('[{"id":1, "date": "12-05-2021", "first_name": "Ryszard", "last_name": "Sanchez", "plate_number": "WA 717B", "price": 130}]')
        
        this.state = {
            services: json
        }
    }

    generate() {
        var tab = []
        for (const service of this.state.services) {
            tab.push(
                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="col-9">
                                <div class="row">
                                    <h5>Service id: {service.id} </h5>
                                </div>
                                <div class="row">
                                    <h4>Date: {service.date}</h4>
                                </div>
                                <div class="row">
                                    <h5>First name: {service.first_name} </h5>
                                </div>
                                <div class="row">
                                    <h6>Last name: {service.last_name}</h6>
                                </div>
                                <div class="row">
                                    <h6>Plate number: {service.plate_number}</h6>
                                </div>
                            </div>
                            <div className="row-3">
                                <div className="col">
                                    <h3>Cena: {service.price}zł</h3>
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
            <div id="registryList">
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