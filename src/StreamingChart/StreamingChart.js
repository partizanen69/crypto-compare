import React from 'react';
import { Line } from 'react-chartjs-2';
import Websocket from 'react-websocket';
import { Row } from 'react-bootstrap';

class StreamingChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeValues: [],
			priceValues: []
		};
	}

	getTime(t) {
		var date = new Date(t * 1000);
		var hour = date.getHours();
		var min = '0' + date.getMinutes();
		var sec = '0' + date.getSeconds();
		return hour + ':' + min.substr(-2) + ':' + sec.substr(-2);
	}

	handleData(data) {
		let result = JSON.parse(data);
		const { timeValues, priceValues } = this.state;

		if (timeValues.length < 20) {
			timeValues.push(this.getTime(result.timestamp));
		} else {
			timeValues.splice(0, 1);
			timeValues.push(this.getTime(result.timestamp));
		}

		if (priceValues.length < 20) {
			priceValues.push(result.events[0]['price']);
		} else {
			priceValues.splice(0, 1);
			priceValues.push(result.events[0]['price']);
		}

		this.setState({
			timeValues: [...timeValues],
			priceValues: [...priceValues]
		});
	}

	render() {
		const data = {
			labels: this.state.timeValues,
			datasets: [
				{
					label: 'BTC/USD streaming data',
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
					data: this.state.priceValues
				}
			]
		};

		return (
			<Row className="show-grid">
				<h2><a name="stream"></a>Bitcoin streaming data</h2>
				<Websocket
					url="wss://api.gemini.com/v1/marketdata/btcusd"
					onMessage={this.handleData.bind(this)}
				/>
				<div className="chart">
					<Line data={data} />
				</div>
			</Row>
		);
	}
}

export default StreamingChart;
