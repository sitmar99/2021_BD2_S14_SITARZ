import React from 'react';

class ResourceList extends React.Component {
    
    constructor(props) {
        super (props)
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch('http://localhost:8080/resource-list', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then((jsonData) => {
            this.setState({resources: jsonData})
        })
        .catch((error) => {
            console.error(error)
        })

        var json = JSON.parse(`[]`)

        this.state = {
            resources: json,
            alert: "",
            lowResources: "cokolwiek"
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const URL = 'http://localhost:8080/resource-list'

        const change = {
            "id": `${event.currentTarget.id}`,
            "name": `${event.currentTarget.name.value}`,
            "brand": `${event.currentTarget.brand.value}`,
            "model": `${event.currentTarget.model.value}`,
            "quantity": `${event.currentTarget.quantity.value}`,
            "unit": `${event.currentTarget.unit.value}`
        }

        //updating state
        if (event.currentTarget.id != "-1") {
            let updatedList = this.state.resources.map(item =>
                {
                    if (item.id == change.id) {
                        return change;
                    }
                    return item
                })
            this.setState({resources: updatedList});

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
        fetch('http://localhost:8080/resource-list', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then((jsonData) => {
            this.setState({resources: jsonData})
        })
        .catch((error) => {
            console.error(error)
        })
    }

    lowStateButton(resource) {
        if ((resource.unit === "szt" && resource.quantity < 5) || (resource.unit === "l" && resource.quantity < 0.15)) {
            return "btn-danger"
        }
        return "btn-success"
    }

    lowStateAlert(resource) {
        if ((resource.unit === "szt" && resource.quantity < 5) || (resource.unit === "l" && resource.quantity < 0.15)) {
            return (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Niski stan zasobu!</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        }
        return ""
    }
    
    generate() {
        var tab = []
        for (const resource of this.state.resources) {

            tab.push(
            <div id="singleResource">
                {/* edit resource modal */}
                <div className="modal fade" id={"editResource"+resource.id} tabIndex="-1" aria-labelledby="editResource" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edytuj zasób</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id={resource.id} onSubmit={this.handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label for="name">Nazwa</label>
                                <input type="text" className="form-control" id="name" defaultValue={resource.name}></input>
                            </div>
                            <div className="form-group">
                                <label for="brand">Marka</label>
                                <input type="text" className="form-control" id="brand" defaultValue={resource.brand}></input>
                            </div>
                            <div className="form-group">
                                <label for="model">Model</label>
                                <input type="text" className="form-control" id="model" defaultValue={resource.model}></input>
                            </div>
                            <div className="form-row mb-3">
                                <div className="col">
                                    <label for="quantity">Ilość</label>
                                    <input id="quantity" type="number" className="form-control" defaultValue={resource.quantity}></input>
                                </div>
                                <div className="col">
                                    <label for="unit">Jednostka</label>
                                    <input id="unit" type="text" className="form-control" defaultValue={resource.unit}></input>
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

                {/* single resource card */}
                <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                        <div className="col-9">
                            <div className="row">
                                <h5>ID: {resource.id} </h5>
                            </div>
                            <div className="row">
                                <h4>Nazwa: {resource.name}</h4>
                            </div>
                            <div className="row">
                                <h5>Marka: {resource.brand} </h5>
                            </div>
                            <div className="row">
                                <h5>Model: {resource.model} </h5>
                            </div>
                            <div className="row">
                                <h6>Ilość: {resource.quantity} {resource.unit}</h6>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="row mb-2 justify-content-end">
                                <button type="buttont" className={"btn text-right " + this.lowStateButton(resource)} data-toggle="modal" data-target={"#editResource" + resource.id}>Edytuj</button>
                            </div>
                            <div className="row justify-content-end">
                                {this.lowStateAlert(resource)}
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
            <div className="row mt-2 mb-2 justify-content-center">
                {/* new resource button */}
                <div className="col-10">
                    <button type="button" className="btn btn-block btn-info" data-toggle="modal" data-target="#newResource">Dodaj zasób</button>
                </div>
                {/* refresh json button */}
                <div className="col">
                    <button type="button" className="btn btn-block btn-warning" onClick={this.update.bind(this)}>Aktualizuj</button>
                </div>
            </div>

            {/* new resource modal */}
            <div className="modal fade" id="newResource" tabIndex="-1" aria-labelledby="newResource" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nowy zasób</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="-1" onSubmit={this.handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label for="name">Nazwa</label>
                                <input type="text" className="form-control" id="name"></input>
                            </div>
                            <div className="form-group">
                                <label for="brand">Marka</label>
                                <input type="text" className="form-control" id="brand"></input>
                            </div>
                            <div className="form-group">
                                <label for="model">Model</label>
                                <input type="text" className="form-control" id="model"></input>
                            </div>
                            <div className="form-row mb-3">
                                <div className="col">
                                    <label for="quantity">Ilość</label>
                                    <input id="quantity" type="number" className="form-control"></input>
                                </div>
                                <div className="col">
                                    <label for="unit">Jednostka</label>
                                    <input id="unit" type="text" className="form-control"></input>
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
            
            {/* resource list */}
            <div className="row-12 mt-2 justify-content-center">
                <div className="list-group">
                    {this.generate()}
                </div>
            </div>
            
            </div>
        )
    }
}

export default ResourceList;