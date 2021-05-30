import React from 'react';

class ResourceList extends React.Component {
    
    constructor(props) {
        super (props)
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch('http://localhost:8080/ResourceList')
            .then(response => response.json())
            .then((jsonData) => {
                this.setState({resources: jsonData})
            })
            .catch((error) => {
                console.error(error)
            })

        var json = JSON.parse(`[]`)

        this.state = {
            resources: json
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const change = {
            "id": `${event.currentTarget.id}`,
            "name": `${event.currentTarget.username.name}`,
            "brand": `${event.currentTarget.brand.value}`,
            "model": `${event.currentTarget.model.value}`,
            "qunatity": `${event.currentTarget.qunatity.value}`,
            "unit": `${event.currentTarget.unit.value}`
        }

        //updating state
        if (event.currentTarget.id != "-1") {
            let updatedList = this.state.employees.map(item =>
                {
                    if (item.id == change.id) {
                        return change;
                    }
                    return item
                })
            this.setState({employees: updatedList});
        }

        //sending json to backend
        const URL = 'http://localhost:8080/ResourceList'

        fetch(URL, {
            method: "PUT",
            body: JSON.stringify(change),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        // alert('Operacja przebiegła pomyślnie!');
    }

    update() {
        fetch('http://localhost:8080/ResourceList')
        .then(response => response.json())
        .then((jsonData) => {
            this.setState({employees: jsonData})
        })
        .catch((error) => {
            console.error(error)
        })
    }

    generate() {
        var tab = []
        for (const resource of this.state.resources) {
            tab.push(
            <div id="singleResource">

                {/* edit resource modal */}
                <div class="modal fade" id={"editResource"+resource.id} tabindex="-1" aria-labelledby="editResource" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edytuj zasób</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id={resource.id} onSubmit={this.handleSubmit}>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="name">Nazwa</label>
                                <input type="text" class="form-control" id="name" defaultValue={resource.name}></input>
                            </div>
                            <div class="form-group">
                                <label for="brand">Marka</label>
                                <input type="text" class="form-control" id="brand" defaultValue={resource.brand}></input>
                            </div>
                            <div class="form-group">
                                <label for="model">Model</label>
                                <input type="text" class="form-control" id="model" defaultValue={resource.model}></input>
                            </div>
                            <div class="form-row mb-3">
                                <div class="col">
                                    <label for="quantity">Ilość</label>
                                    <input id="quantity" type="number" class="form-control" defaultValue={resource.quantity}></input>
                                </div>
                                <div class="col">
                                    <label for="unit">Jednostka</label>
                                    <input id="unit" type="text" class="form-control" defaultValue={resource.unit}></input>
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

                {/* single resource card */}
                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="col-9">
                            <div class="row">
                                <h5>ID: {resource.id} </h5>
                            </div>
                            <div class="row">
                                <h4>Nazwa: {resource.name}</h4>
                            </div>
                            <div class="row">
                                <h5>Marka: {resource.brand} </h5>
                            </div>
                            <div class="row">
                                <h5>Model: {resource.model} </h5>
                            </div>
                            <div class="row">
                                <h6>Ilość: {resource.quantity} {resource.unit}</h6>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="row justify-content-end">
                                <button type="buttont" class="btn btn-success text-right" data-toggle="modal" data-target={"#editResource" + resource.id}>Edytuj</button>
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
            <div id="resourceList">

            <div class="row mt-2 justify-content-center">
                {/* new resource button */}
                <div className="col-10">
                    <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#newEmploee">Dodaj zasób</button>
                </div>
                {/* refresh json button */}
                <div className="col">
                    <button type="button" class="btn btn-block btn-warning" onClick={this.update.bind(this)}>Aktualizuj</button>
                </div>
            </div>

            {/* new resource modal */}
            <div class="modal fade" id="newResource" tabindex="-1" aria-labelledby="newResource" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nowy zasób</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="-1" onSubmit={this.handleSubmit}>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="name">Nazwa</label>
                                <input type="text" class="form-control" id="name"></input>
                            </div>
                            <div class="form-group">
                                <label for="brand">Marka</label>
                                <input type="text" class="form-control" id="brand"></input>
                            </div>
                            <div class="form-group">
                                <label for="model">Model</label>
                                <input type="text" class="form-control" id="model"></input>
                            </div>
                            <div class="form-row mb-3">
                                <div class="col">
                                    <label for="quantity">Ilość</label>
                                    <input id="quantity" type="number" class="form-control"></input>
                                </div>
                                <div class="col">
                                    <label for="unit">Jednostka</label>
                                    <input id="unit" type="text" class="form-control"></input>
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
            
            {/* resource list */}
            <div class="row-12 mt-2 justify-content-center">
                <div class="list-group">
                    {this.generate()}
                </div>
            </div>
            
            </div>
        )
    }
}

export default ResourceList;