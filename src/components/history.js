import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

class History extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <nav className="navbar navbar-expand-lg d-flex justify-content-start" style={{ textAlign: 'center', float: 'none', display: 'inline-block', backgroundColor: '#007BFF' }}>
          <Link to="/">
            <button type="button" className="btn" style={{ float: "left", color: 'white' }}>
              <i className="fa fa-arrow-left" style={{ fontSize: "28px" }}/>
            </button>
          </Link>
        </nav>
        <br />
        <h2>HISTORY TRANSACTION</h2>
        <br />
        <div className="container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
              <tr>
                <th scope="col" style={{ verticalAlign: 'middle' }}>#</th>
                <th scope="col" style={{ verticalAlign: 'middle' }}>Name</th>
                <th scope="col" style={{ verticalAlign: 'middle' }}>Total Price</th>
              </tr>
              </thead>
              <tbody>
              {this.props.history && this.props.history.map((val, ind) => {
                return (
                  <tr key={ind}>
                    <th scope="row" style={{ verticalAlign: 'middle' }}>{ind + 1}</th>
                    <td style={{ verticalAlign: 'middle' }}>{val.name}</td>
                    <td style={{ verticalAlign: 'middle' }}>${val.totalPrice}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
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
