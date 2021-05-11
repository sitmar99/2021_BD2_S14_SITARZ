import React from 'react';

class EmploeeList extends React.Component {
    render() {
        return (
            <div id="emploeeList">
            <div class="row-12 mt-2 justify-content-center">
                <button type="button" class="btn btn-block btn-info">Dodaj pracownika</button>
            </div>
            <div class="row-12 mt-2 justify-content-center">
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="col-9">
                                <div class="row">
                                    <h5>USER_ID</h5>
                                </div>
                                <div class="row">
                                    <h4>USER_NAME</h4>
                                </div>
                                <div class="row">
                                    <h6>ROLE</h6>
                                </div>
                                <div class="row">
                                    <h6>FIRST_NAME</h6>
                                </div>
                                <div class="row">
                                    <h6>LAST_NAME</h6>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="row">
                                    <div class="col">
                                        <button type="button" class="btn btn-success">Edytuj</button>
                                    </div>
                                    <div class="col">
                                        <button type="button" class="btn btn-danger">Dezaktywuj</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            </div>
        )
    }
}

export default EmploeeList;