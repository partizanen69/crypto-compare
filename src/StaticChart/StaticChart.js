import React from 'react';
import { Line } from 'react-chartjs-2';
import { Row, FormControl } from 'react-bootstrap';


class StaticChart extends React.Component {
	constructor() {
		super();
		this.state = {
			chartDays: [],
			chartDaysValues: [],
			chartMonth: [],
			chartMonthValues: [],
			chartYear: [],
			chartYearValues: [],
			selectRange: 1
		};
	}

	apiRequest(range, limit, aggr = 1) {
		const API = 'https://min-api.cryptocompare.com/data/histo';
		return `${API}${range}?fsym=BTC&tsym=USD&limit=${limit}&aggregate=${aggr}`;
	}

	componentDidMount() {
		fetch(this.apiRequest('hour', 23))
			.then(results => results.json())
			.then(results => {
				this.setState({
					chartDays: results.Data.map(
						item => new Date(item.time * 1000).getHours() + ':00'
					),
					chartDaysValues: results.Data.map(item => item.close)
				});
			});

		fetch(this.apiRequest('day', 30))
			.then(results => results.json())
			.then(results => {
				this.setState({
					chartMonth: results.Data.map(item =>
						new Date(item.time * 1000).toDateString().substring(4)
					),
					chartMonthValues: results.Data.map(item => item.close)
				});
			});

		fetch(this.apiRequest('day', 13, 30))
			.then(results => results.json())
			.then(results => {
				this.setState({
					chartYear: results.Data.map(item =>
						new Date(item.time * 1000).toDateString().substring(4)
					),
					chartYearValues: results.Data.map(item => item.close)
				});
			});
	}

	selectRange(e) {
		this.setState({ selectRange: e.target.value });
	}

	render() {
		const {
			selectRange,
			chartDays,
			chartDaysValues,
			chartMonth,
			chartMonthValues,
			chartYear,
			chartYearValues
		} = this.state;

		const data = {
			labels:
				selectRange == 1
					? chartDays
					: selectRange == 2 ? chartMonth : chartYear,
			datasets: [
				{
					label: 'BTC/USD dynamics history',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(75,192,192,0.4)',
					borderColor: 'rgba(75,192,192,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(75,192,192,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(75,192,192,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data:
						selectRange == 1
							? chartDaysValues
							: selectRange == 2 ? chartMonthValues : chartYearValues
				}
			]
		};

		return (
			<div>
					<h2><a name="static"></a>Bitcoin dynamics</h2>
					<Row className="show-grid">
						<div className="static-chart">
							<FormControl
								componentClass="select"
								onChange={this.selectRange.bind(this)}
							>
								<option value="1">Day</option>
								<option value="2">Month</option>
								<option value="3">Year</option>
							</FormControl>
						</div>
						<div className="chart">
							<Line data={data} />
						</div>
					</Row>
			</div>
		);
	}
}

export default StaticChart;
