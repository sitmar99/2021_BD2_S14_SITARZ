import React from 'react';
import ProfitReport from '../components/ProfitReport'
import StatisticsReport from '../components/StatisticsReport';

class ReportsPanel extends React.Component {
    state = {
        availableProfitReports: [],
        availableStatisticsReports: [],
        chart: null
    }

    constructor(props) {
        super(props)

        fetch("http://localhost:8080/reports", {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(json => {
            let profitReports = []
            let statsReports = []
            for (const obj of json) {
                if (obj.report_type === "profit")
                    this.setState({availableProfitReports: obj.available})
                else if (obj.report_type === "statistics")
                    this.setState({availableStatisticsReports: obj.available})
            }
        })
        .catch(error => console.log('error', error))
    }

    generateProfitButtons() {
        let ret = []
        for (const item of this.state.availableProfitReports) {
            ret.push(
                <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target={"#profit-" + item}>
                    Okres rozliczeniowy {item}
                </button>
            )
        }
        return ret;
    }

    generateStatisticsButtons() {
        let ret = []
        for (const item of this.state.availableStatisticsReports) {
            ret.push(
                <button type="button" className="list-group-item list-group-item-action" data-toggle="modal" data-target={"#statistics-" + item}>
                    Okres rozliczeniowy {item}
                </button>
            )
        }
        return ret;
    }

    render() {
        return (
            <div id="reportsPanel">
                <h1 className="display-4 text-center">Panel z raportami</h1>
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse"
                                        data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Raporty dochodów
                                </button>
                            </h5>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                             data-parent="#accordionExample">
                            <div className="card-body p-0">
                                <div className="list-group list-group-flush">
                                    {this.generateProfitButtons()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse"
                                        data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Statystyki wykonanych usług
                                </button>
                            </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                             data-parent="#accordionExample">
                            <div className="card-body p-0">
                                <div className="list-group list-group-flush">
                                    {this.generateStatisticsButtons()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    (() => {
                        let ret = []
                        for (const item of this.state.availableProfitReports) {
                            ret.push(
                                <div className="modal fade" id={"profit-" + item} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body p-0">
                                                <ProfitReport year={item} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        for (const item of this.state.availableStatisticsReports) {
                            ret.push(
                                <div className="modal fade" id={"statistics-" + item} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body p-0">
                                                <StatisticsReport year={item} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return ret
                    })()
                }
            </div>
        )
    }
}

export default ReportsPanel