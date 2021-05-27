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

        fetch("http://127.0.0.1:8080/reports", {
            method: 'GET',
            redirect: 'follow'
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
        .catch(error => console.log('error', error));
    }

    generateProfitButtons() {
        let ret = []
        for (const item of this.state.availableProfitReports) {
            ret.push(
                <button type="button" className="list-group-item list-group-item-action" onClick={() => this.selectChart('profit')} data-toggle="modal" data-target="#exampleModal">
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
                <button type="button" className="list-group-item list-group-item-action" onClick={() => this.selectChart('statistics')} data-toggle="modal" data-target="#exampleModal">
                    Okres rozliczeniowy {item}
                </button>
            )
        }
        return ret;
    }

    selectChart(type) {
        switch (type) {
            case 'profit': {
                this.setState({chart: (() => <ProfitReport />)()})
                break
            }
            case 'statistics': {
                this.setState({chart: (() => <StatisticsReport />)()})
                break
            }
        }
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

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body p-0">
                                {this.state.chart}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportsPanel
