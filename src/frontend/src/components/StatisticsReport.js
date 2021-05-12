import React from 'react';
import { Bar } from 'react-chartjs-2';

class StatisticsReport extends React.Component {
    state = {
        chartData: {}
    }

    componentDidMount() {
        const json = JSON.parse(`
            [
                {
                    "service_name": "Mycie auta",
                    "count": 23
                },
                {
                    "service_name": "Mycie felg",
                    "count": 18
                },
                {
                    "service_name": "Woskowanie",
                    "count": 34
                },
                {
                    "service_name": "Mycie auta",
                    "count": 23
                },
                {
                    "service_name": "Mycie felg",
                    "count": 18
                },
                {
                    "service_name": "Woskowanie",
                    "count": 34
                }
            ]
        `)

        let _labels = []
        let _datas = []
        for (const obj of json) {
            _labels.push(obj.service_name)
            _datas.push(obj.count)
        }

        this.setState({
            chartData: {
                labels: _labels,
                datasets: [{
                    label: 'Ilość',
                    data: _datas,
                    backgroundColor: 'rgba(0, 0, 255, 0.6)'
                }]
            }
        })
    }

    render() {
        let chartOptions = {
            maintainAspectRatio: true,
            indexAxis: 'y'
        }

        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Zakres wykonanych usług</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">Okres rozliczeniowy 2021</h6>
                    <Bar data={this.state.chartData} options={chartOptions}/>
                </div>
                <div className="card-footer text-muted text-center">
                    <a href="#" className="btn btn-secondary mr-3">← Poprzedni</a>
                    <a href="#" className="btn btn-secondary disabled ml-3">Następny →</a>
                </div>
            </div>
        )
    }
}

export default StatisticsReport;
