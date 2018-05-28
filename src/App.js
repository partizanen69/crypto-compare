import React from 'react';
import { Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Styles from "./Styles"

import Header from './Header/Header.js'
import CurrentPrice from './CurrentPrice/CurrentPrice.js';
import Converter from './Converter/Converter.js';
import StaticChart from './StaticChart/StaticChart.js';
import StreamingChart from './StreamingChart/StreamingChart.js';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			chartDays: [],
			chartMonth: [],
			chartYear: []
		};
	}

	componentDidMount() {
		fetch(
			'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,BCH,ADA,LTC&tsyms=USD,EUR,RUB'
		)
			.then(results => results.json())
			.then(results => {
				this.setState({ data: results });
			});
	}

	render() {
		return (
      <Styles>
				<Header />
  			<Grid>
  				<CurrentPrice
            data={this.state.data}
            mapTable={mapTable}
          />
  				<Converter
            data={this.state.data}
            mapTable={mapTable}
          />
  				<StaticChart />
  				<StreamingChart />
  			</Grid>
      </Styles>
		);
	}
}

const mapTable = {
	BTC: 'Bitcoin',
	ETH: 'Ethereum',
	XRP: 'Ripple',
	BCH: 'Bitcoin Cash',
	ADA: 'Cardano',
	LTC: 'Litecoin'
};

export default App
