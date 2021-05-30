import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {
  Accordion,
  Button,
  Card,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

class History extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg d-flex justify-content-start" style={{ textAlign: 'center', float: 'none', display: 'inline-block', backgroundColor: '#007BFF' }}>
          <Link to="/">
            <button type="button" className="btn" style={{ float: "left", color: 'white' }}>
              <i className="fa fa-arrow-left" style={{ fontSize: "28px" }}/>
            </button>
          </Link>
        </nav>
        <br />
        <h2 style={{ textAlign: "center" }}>HISTORY TRANSACTION</h2>
        <br />

        {this.props.history && this.props.history.map((val, ind) => {
          return (
            <Container className='mb-2'>
              <Accordion defaultActiveKey='1'>
                <Card border="info">
                  <Card.Header>
                    <Row>
                      <Col sm={10}>
                        <Card.Title>{ind + 1}. &ensp; {val.name} - ${val.totalPrice}</Card.Title>
                      </Col>
                      <Col sm={2}>
                        <Accordion.Toggle as={Button} variant="info" eventKey='0'>
                          Detail
                        </Accordion.Toggle>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                      <Card.Text>
                        <div className="container">
                          <div className="table-responsive">
                            <table className="table table-hover">
                              <thead>
                              <tr>
                                <th scope="col" style={{ verticalAlign: 'middle' }}>#</th>
                                <th scope="col" style={{ verticalAlign: 'middle' }}>Name</th>
                                <th scope="col" style={{ verticalAlign: 'middle' }}>Quantity</th>
                                <th scope="col" style={{ verticalAlign: 'middle' }}>Unit Price</th>
                                <th scope="col" style={{ verticalAlign: 'middle' }}>Total Price</th>
                              </tr>
                              </thead>
                              <tbody>
                                {val.items && val.items.map((item, ind) => {
                                  return (
                                    <tr key={ind}>
                                      <th scope="row" style={{ verticalAlign: 'middle' }}>{ind + 1}</th>
                                      <td style={{ verticalAlign: 'middle' }}>{item.name}</td>
                                      <td style={{ verticalAlign: 'middle' }}> x{item.quantity}</td>
                                      <td style={{ verticalAlign: 'middle' }}>${item.price}</td>
                                      <td style={{ verticalAlign: 'middle' }}>${item.total_price}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Container>
          );
        })}
      </div>
    );
  }
}

function mapStateToProp(state) {
  return ({
    history: state.root.history
  })
}

export default connect(mapStateToProp)(History);
