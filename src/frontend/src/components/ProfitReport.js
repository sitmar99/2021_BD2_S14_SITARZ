import React from 'react';
import { Bar } from 'react-chartjs-2';

class ProfitReport extends React.Component {
    state = {
        chartData: {
            labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', ' Grudzień']
        }
    }

    componentDidMount() {
        var json = JSON.parse(`[1000, 2000, 4000, 500, -300, 600, 800]`)

        var bgColor = ((json) => {
            var ret = []
            for (let i = 0; i < json.length; i++) {
                    if (json[i] > 0) {
                        ret.push('rgba(0, 255, 0, 0.6)')
                    } else {
                        ret.push('rgba(255, 0, 0, 0.6)')
                    }
                }
            return ret;
        })(json)

        this.setState({chartData: {
            datasets: [{
                label: 'Dochód',
                data: [1000, 2000, 4000, 500, -300, 600, 800],
                backgroundColor: bgColor
            }]
        }})
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Wykres dochodów</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">Okres rozliczeniowy 2021</h6>
                    <Bar data={this.state.chartData} width={800} height={450} options={{ maintainAspectRatio: true }}/>
                </div>
                <div className="card-footer text-muted text-center">
                    <a href="#" className="btn btn-secondary mr-3">← Poprzedni</a>
                    <a href="#" className="btn btn-secondary disabled ml-3">Następny →</a>
                </div>
            </div>
        )
    }
}

export default ProfitReport;
