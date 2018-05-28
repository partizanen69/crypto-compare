import React from 'react';
import { FormGroup, FormControl, Table, Row, Col, Grid } from 'react-bootstrap';



class CurrentPrice extends React.Component {
  constructor() {
    super();
    this.state = {
      activeCurrency: 'USD'
    }
  }

  chooseCurrency(e) {
    this.setState({activeCurrency: e.target.value});
  }

  render() {
    const { data, mapTable } = this.props;
    const { activeCurrency } = this.state;

    return (
      <div>
        <h2 class="current">
          <a name="current"></a>Current cryptocurrencies rate
        </h2>
        <Row className="show-grid" bsClass="current-price">
          <div>
            <p>
              Choose currency
            </p>
            <FormGroup controlId="formControlsSelect">
              <FormControl
                componentClass="select"
                onChange={this.chooseCurrency.bind(this)}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>RUB</option>
              </FormControl>
            </FormGroup>
          </div>

          <div>
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>
                    Cryptocurrency
                  </th>
                  <th>
                    Exchange rate
                  </th>
                </tr>
              </thead>
              <tbody>
              {
                Object.entries(data).map(([key, { EUR, USD, RUB }]) => {
                  return <tr
                    key={key}
                  >
                    <td>
      	              {
                    		Object.keys(mapTable).map((item) => {
      		              	if (key == item) return mapTable[key];
      	              	})
      	              }
                    </td>
                    <td>
                      {activeCurrency == 'EUR' && `${EUR.toFixed(2)} EUR`}
                      {activeCurrency == 'USD' && `${USD.toFixed(2)} USD`}
                      {activeCurrency == 'RUB' && `${RUB.toFixed(2)} RUB`}
                    </td>
                  </tr>
                })
              }
              </tbody>
            </Table>
          </div>
        </Row>
      </div>
    )
  }
}

export default CurrentPrice;
