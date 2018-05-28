import React from 'react';
import { Row, Col, FormControl, Button } from 'react-bootstrap';

class Converter extends React.Component {
	constructor() {
		super();
		this.state = {
			inputValue: '',
			cryptoValue: 'BTC',
			cryptoName: 'Bitcoin',
			currencyValue: 'RUB',
			result: ''
		};
	}

	getNumber(e) {
		if (!isNaN(e.target.value)) this.setState({ inputValue: e.target.value });
	}

	chooseCryptoValue(e) {
		const { mapTable } = this.props;
		this.setState({
			cryptoValue: e.target.value,
			cryptoName: mapTable[e.target.value]
		});
	}

	chooseCurrencyValue(e) {
		this.setState({ currencyValue: e.target.value });
	}

	calcResult() {
		const { inputValue, cryptoValue, currencyValue } = this.state;
		const { data } = this.props;
		const result =
			(inputValue * data[cryptoValue][currencyValue]).toFixed(2);
		this.setState({ result: result });
	}

	render() {
		return (
			<div>
				<h2><a name="converter"></a>Converter</h2>
				<Row className="show-grid" bsClass="converter">
					<div>
						<p>From</p>
            <FormControl
              componentClass="select"
              onChange={this.chooseCryptoValue.bind(this)}
            >
							{Object.entries(this.props.mapTable).map(([key, value]) => {
								return (
									<option key={key} value={key}>
										{value}
									</option>
								);
							})}
            </FormControl>
						<FormControl
							type="text"
							onChange={this.getNumber.bind(this)}
							value={this.state.inputValue}
						/>
						<p>
							{this.state.inputValue} {this.state.cryptoName}
						</p>
					</div>
					<div>
						<p>To</p>
            <FormControl
              componentClass="select"
              onChange={this.chooseCurrencyValue.bind(this)}
							value={this.state.currencyValue}
            >
							<option>EUR</option>
							<option>USD</option>
							<option>RUB</option>
            </FormControl>
						<p>
							{this.state.result} {this.state.currencyValue}
						</p>
					</div>
					<div className="converter-button">
						<Button
							onClick={this.calcResult.bind(this)}
						>
							Calculate
						</Button>
					</div>
				</Row>
			</div>
		);
	}
}

export default Converter;
