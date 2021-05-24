import React from 'react';

class ResourceList extends React.Component {
    
    constructor(props) {
        super (props)

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
                    <form>
                        <div class="modal-body">
                            <div class="form-outline">
                                <label for="name">Nazwa</label>
                                <input type="text" class="form-control" id="name" defaultValue={resource.name}></input>
                            </div>
                            <div class="form-group">
                                <label for="brand">Marka</label>
                                <input type="text" class="form-control" id="brand" defaultValue={resource.brand}></input>
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

            {/* new resource button */}
            <div class="row-12 mt-2 justify-content-center">
                <button type="button" class="btn btn-block btn-info" data-toggle="modal" data-target="#newResource">Dodaj zasób</button>
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
                    <form>
                        <div class="modal-body">
                            <div class="form-outline">
                                <label for="name">Nazwa</label>
                                <input type="text" class="form-control" id="name"></input>
                            </div>
                            <div class="form-group">
                                <label for="brand">Marka</label>
                                <input type="text" class="form-control" id="brand"></input>
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