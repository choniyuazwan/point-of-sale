import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {clearCart, resetCounter, clearItemKey, addHistory} from '../store/action/action';

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      grandTotal: 0,
    }
  }

  componentDidMount() {
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    var gt = 0;
    for (var i = 0; i < this.props.cartItems.length; i++) {
      gt = gt + parseInt(this.props.cartItems[i].total_price);
    }
    this.setState({ grandTotal: gt });
  }

  async payment () {
    await this.props.clearCart();
    await this.props.resetCounter();
    await this.props.clearItemKey();
    await this.calculateGrandTotal();
    const data = {
      name: `trx${Date.now()}`,
      totalPrice: this.state.grandTotal
    }
    this.props.addHistory(data);
    toast.configure();
    toast.success("Payment success", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1900,
      hideProgressBar: true,
      pauseOnHover: false,
      draggable: true,
    })
  }

  render() {
    const { grandTotal } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <nav className="navbar navbar-expand-lg d-flex justify-content-start" style={{ textAlign: 'center', float: 'none', display: 'inline-block', backgroundColor: '#007BFF' }}>
          <Link to="/cart">
            <button type="button" className="btn" style={{ float: "left", color: 'white' }}>
              <i className="fa fa-arrow-left" style={{ fontSize: "28px" }}/>
            </button>
          </Link>
        </nav>
        <br />
        <h2>PAYMENT</h2>
        <br />
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
              {this.props.cartItems.map((val, ind) => {
                return (
                  <tr key={ind}>
                    <th scope="row" style={{ verticalAlign: 'middle' }}>{ind + 1}</th>
                    <td style={{ verticalAlign: 'middle' }}>{val.name}</td>
                    <td style={{ verticalAlign: 'middle' }}> x{val.quantity}</td>
                    <td style={{ verticalAlign: 'middle' }}>${val.price}</td>
                    <td style={{ verticalAlign: 'middle' }}>${val.total_price}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <h4>
              Total Payment : ${grandTotal} &ensp;
              <Link to={'/'}>
                {grandTotal > 0 && <button onClick={() => this.payment()} className="btn btn-success">Pay</button>}
              </Link>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return ({
    cartItems: state.root.reduxCart,
    counterValue: state.root.reduxCartCounter,
    cartCheck: state.root.cartChecker
  })
}

function mapDispatchToProp(dispatch) {
  return ({
    clearCart: () => { dispatch(clearCart()) },
    resetCounter: () => { dispatch(resetCounter()) },
    clearItemKey: () => { dispatch(clearItemKey()) },
    addHistory: (data) => { dispatch(addHistory(data)) }
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(Payment);
