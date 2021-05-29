import React, {useState} from 'react';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import auth from "../components/auth";
import {toast} from 'react-toastify';

function Login(props) {
  const [data, setData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/login" } };

  const login = (e) => {
    if(data.email === 'admin' && data.password === 'admin') {
      setIsLoading(true);
      e.preventDefault();
      localStorage.setItem('token', 'admin');
      setIsLoading(false);
      props.history.push('/country')

      auth.authenticate(() => {
        history.replace(from);
      });
    } else {
      e.preventDefault();
      toast.configure();
      toast.error("Email or password not correct", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1900,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  const onChange = (e) => {
    e.persist();
    setData({...data, [e.target.name]: e.target.value});
  };

  return (
    <div>
      {isLoading &&
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      }
      <Row>
        <Col sm={{ span: 10, offset: 1 }}  md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body className="text-center">
            <Card.Title>Login</Card.Title>
            <p>email: admin <br/>
              password: admin</p>
            <Form onSubmit={login}>
              <Form.Group as={Row}>
                <Form.Label column xs={3} className="text-right">
                  Email
                </Form.Label>
                <Col xs={8}>
                  <Form.Control size="sm" type="text" name="email" id="email" placeholder="email" value={data.email} onChange={onChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column xs={3} className="text-right">
                  Password
                </Form.Label>
                <Col xs={8}>
                  <Form.Control size="sm" type="password" name="password" id="password" placeholder="password" value={data.password} onChange={onChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="text-left">
                <Col xs={{ offset: 3 }}>
                  <Button size="sm" type="submit">Signin</Button>
                </Col>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Login);
