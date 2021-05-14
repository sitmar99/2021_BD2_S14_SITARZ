import React from 'react';

class ReportsPanel extends React.Component {
    constructor(props) {
        super(props)
        const json = JSON.parse(`
            [
                {
                    "report_type": "profit",
                    "available": [2021, 2020]
                },
                {
                    "report_type": "statistics",
                    "available": [2021]
                }
            ]
        `)

        let profitReports = []
        let statsReports = []
        for (const obj of json) {
            if (obj.report_type === "profit")
                profitReports = obj.available
            else if (obj.report_type === "statistics")
                statsReports = obj.available
        }

        this.state = {
            availableProfitReports: profitReports,
            availableStatisticsReports: statsReports
        }
    }

    generateProfitButtons() {
        let ret = []
        for (const item of this.state.availableProfitReports) {
            ret.push(
                <button type="button" className="list-group-item list-group-item-action">
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
                <button type="button" className="list-group-item list-group-item-action">
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
            </div>
        )
    }
}

export default ReportsPanel
