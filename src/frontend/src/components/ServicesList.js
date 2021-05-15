import React from 'react';

class ServicesList extends React.Component {
    
    constructor(props) {
        super (props)
        var json = JSON.parse(`[
            { "id": 1, "active": true, "child": 0, "name": "Pierwsza usługa" },
            {
              "id": 2,
              "active": true,
              "child":
                [
                  { "id": 3, "active": true, "child": 0, "name": "Pierwsza pod-usługa" },
                  { "id": 4, "active": true, "child": 0, "name": "Druga pod-usługa" },
                  { "id": 5, "active": true, "child": 
                    [
                        { "id": 6, "active": true, "child":
                            [
                                { "id": 7, "active": true, "child": 0, "name": "Pierwsza pod-pod-pod-usługa" }
                            ], 
                            "name": "Pierwsza pod-pod-usługa" }
                    ], 
                    "name": "Trzecia pod-usługa" }
                ],
                "name": "Druga usługa"
            }
        ]`)
        
        this.state = {
            services: json
        }
    }

    generate(services) {
        var tab = []
        for (const service of services) {
            if (service.child == 0) {
                tab.push (
                    <div class="card-body">
                        {service.name}
                    </div>
                )
            }

            else {
                tab.push (
                    <div>
                        <div class="card-header" id={"heading"+service.id}>
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={"#collapse"+service.id} aria-expanded="true">
                                    {service.name}
                                </button>
                            </h2>
                        </div>

                        <div id={"collapse"+service.id} class="collapse collapsed">
                            <div class="card-body">
                                {this.createAcordion(service.child)}
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
                <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#newEmploee">New emploee</button>
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