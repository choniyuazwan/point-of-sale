import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ItemsList from './components/itemsList.js';
import ShoppingCart from './components/shoppingCart.js';
import Payment from './components/payment';
import History from './components/history';
import Login from './components/login';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { PrivateRoute, LoginRoute } from "./components/auth";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <LoginRoute path="/login" exact> <Login/> </LoginRoute>
              <PrivateRoute exact path="/"> <ItemsList/> </PrivateRoute>
              <PrivateRoute exact path="/cart"> <ShoppingCart/> </PrivateRoute>
              <PrivateRoute exact path="/payment"> <Payment/> </PrivateRoute>
              <PrivateRoute exact path="/history"> <History/> </PrivateRoute>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
