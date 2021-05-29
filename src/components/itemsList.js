import React, { Component } from 'react';
import Items from '../json/items.json';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToReduxCart, incrementCounter, putKeyInCheckArray } from '../store/action/action.js';
import '../css/cartBadge.css';
import '../css/loading.css';
import auth from '../components/auth';

class ItemsList extends Component {
  constructor() {
    super();
    this.state = {
      products: Items.items,
      searchText: ''
    }
  }

  onChange = e => {
    this.setState({ searchText: e.target.value });
  }

  addItemToCart(i) {
    const { products } = this.state;
    if (this.props.cartCheck.includes(i)) {
      var cartIndex;
      for (var j = 0; j < this.props.cartItems.length; j++) {
        if (this.props.cartItems[j].id === i) {
          cartIndex = j;
        }
      }
      this.props.cartItems[cartIndex].total_price = (++this.props.cartItems[cartIndex].quantity) * this.props.cartItems[cartIndex].price;
    } else {
      this.props.checkKey(i);
      var obj = {
        id: i,
        name: products[i].name,
        price: products[i].price,
        imageURL: products[i].imageURL,
        quantity: 1,
        total_price: products[i].price
      }
      this.props.addItem(obj);
    }

    var value = this.props.counterValue + 1;
    this.props.incrementCounter(value);
    toast.configure();
    toast.success("Added to Cart !", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1900,
      hideProgressBar: true,
      pauseOnHover: false,
      draggable: true,
    });
  }

  hideLoader() {
    var preloader =  document.getElementById("loading");
    preloader.style.display = "none";
  }

  render() {
    const { products } = this.state;
    return (
      <div onLoad={() => this.hideLoader()}>
        <div id="loading"/>
        <nav className="navbar navbar-expand-lg fixed-top animate__animated animate__zoomInDown" style={{ textAlign: 'center', float: 'none', display: 'inline-block', backgroundColor: '#007BFF' }}>
          <button onClick={() => auth.signout(() => this.props.history.push("/login"))} style={{ float: "left", backgroundColor: "transparent", border: "none", color: 'white' }}>
            <i className="fa fa-sign-out" style={{ fontSize: "28px" }}/>
          </button>
          <Link to="/cart">
            <button style={{ float: "right", backgroundColor: "transparent", border: "none", color: 'white' }}>
              <i className="fa" style={{ fontSize: "28px" }}>&#xf07a;</i>
              <span className='badge badge-warning' id='lblCartCount'> {this.props.counterValue} </span>
            </button>
          </Link>
          <Link to="/history">
            <button style={{ float: "right", backgroundColor: "transparent", border: "none", color: 'white' }}>
              <i className="fa fa-history" style={{ fontSize: "28px" }}/>
            </button>
          </Link>
        </nav>
        <br /><br /><br /><br />
        <div className="container">
          <br />
          <div className="row animate__animated animate__lightSpeedInRight" style={{ textAlign: "center" }}>
            <div className="col-sm-1">
            </div>
            <div className="col-sm-9">
              <input type="text" placeholder="Search Products" onChange={this.onChange} className="form-control" style={{ margin: '2px' }} ></input>
            </div>
          </div>
          <br />
          <div className="row">
            {
              products.map((val, ind) => {
                const { searchText } = this.state;
                if (searchText !== "" && val.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1) {
                  return null;
                }
                return (
                  <div className="card mx-2 my-2 shadow-lg p-3 mb-5 bg-white rounded animate__animated animate__flipInY" key={ind} style={{ width: '345px', alignItems: 'center' }}>
                    <img src={val.imageURL} className="card-img-top" style={{ height: '240px', width: '240px' }} alt="product image" />
                    <div className="card-body" style={{ backgroundColor: '#a6b0bf', width: '100%', textAlign: 'center' }}>
                      <h5 className="card-title">{val.name}</h5>
                      <p className="card-text">${val.price}</p>
                      {(val.availability == 'In Stock') &&
                      <div>
                        <p className="card-text" style={{ color: "green", fontWeight: 'bold' }}>{val.availability}</p>
                        <button type="button" onClick={() => this.addItemToCart(ind)} style={{ width: '120px' }} className="btn btn-primary">Add to Cart</button>
                      </div>}
                      {(val.availability == 'Out of Stock') &&
                      <p className="card-text" style={{ color: "red", fontWeight: 'bold' }}>{val.availability}</p>}
                    </div>
                  </div>
                );
              })
            }
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
    addItem: (data) => { dispatch(addToReduxCart(data)) },
    incrementCounter: (i) => { dispatch(incrementCounter(i)) },
    checkKey: (key) => { dispatch(putKeyInCheckArray(key)) },
  })
}

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(ItemsList))
