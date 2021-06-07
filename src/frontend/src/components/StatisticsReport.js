import React from 'react';
import { Bar } from 'react-chartjs-2';

class StatisticsReport extends React.Component {
    state = {
        chartData: {}
    }

    componentDidMount() {
        fetch(`http://localhost:8080/reports/statistics?year=${this.props.year}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(json => {
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
        })
        .catch(error => console.log('error', error));
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
                    <h6 className="card-subtitle mb-2 text-muted text-center">Okres rozliczeniowy {this.props.year}</h6>
                    <Bar data={this.state.chartData} options={chartOptions}/>
                </div>
            </div>
        )
    }
}

export default StatisticsReport