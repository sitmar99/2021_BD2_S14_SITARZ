import React from 'react';
import { Bar } from 'react-chartjs-2';

class ProfitReport extends React.Component {
    state = {
        chartData: {
            labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', ' Grudzień']
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/reports/profit?year=${this.props.year}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(json => {
            const bgColor = ((json) => {
                let ret = [];
                for (let i = 0; i < json.length; i++) {
                    if (json[i] > 0) {
                        ret.push('rgba(0, 255, 0, 0.6)')
                    } else {
                        ret.push('rgba(255, 0, 0, 0.6)')
                    }
                }
                return ret;
            })(json);

            this.setState({
                chartData: {
                    datasets: [{
                        label: 'Dochód',
                        data: json,
                        backgroundColor: bgColor
                    }]
                }
            })
        })
        .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Wykres dochodów</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">Okres rozliczeniowy {this.props.year}</h6>
                    <Bar data={this.state.chartData} width={800} height={450} options={{ maintainAspectRatio: true }}/>
                </div>
            </div>
        )
    }
}

export default ProfitReport