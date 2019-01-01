import React, {Component} from 'react';
import Image from '../images/water_save.png';

import { Route, Redirect } from 'react-router'
import { Container, Row, Col } from 'reactstrap';

//Imporrt dependency from reactstrap
import { Table, Button ,Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  class Userlogin extends Component {
    constructor(props) {
      super(props);
        this.state = {
          isLoding: true,
          signInError: '',
          signInCustId: '',
          message: '',
          islogin: false,
          Cust_id: ''
        };
        this.onChangeCustId = this.onChangeCustId.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
        this.onDummy=this.onDummy.bind(this);
    }

    onChangeCustId(event) {
      this.setState({
        signInCustId: event.target.value,
      });
    }

    onSignIn() {
      const {
        signInCustId
      } = this.state;

      console.log('customerid',signInCustId);

      this.setState({ isLoding: true, });

      fetch('/customer/login',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          cid: signInCustId,
        }),

      }).then(res=>res.json())
        .then(vageesh_para=> {
          if(vageesh_para.st) {
            this.setState({
              Cust_id: vageesh_para.c_id,
              message: vageesh_para.msg,
              islogin: true
            })
          }
          else {
            this.setState({

              message: 'Invaid Customer Id',
              islogin: false
            })
          }
        });
    }
    onDummy() {
      this.setState({
        message: 'hellow7777',
        islogin: true
      })
      //this.props.history.push('../news')
      //return (<Redirect to='../news'/>)

    }
    /*
    onSignUp() {
      fetch('/customer/login',
      {
        method: 'GET',
        headers: {
          'Content-Type':'application/json'
        },
      }).then(res=>res.json())
        .then(json=> {
          console.log('json',json);
        });
    } */
    render() {
      const {
        signInError,
        signInCustId,
        message,
        islogin
      } = this.state;

      if (islogin) {


      return (<Redirect to={{
              pathname: '/news',
              state: { cid: this.state.Cust_id }
          }} />)
    }

      return (
        <div >


        <Navbar style={{backgroundColor: "#E4BC79"}} light expand="md">
    <NavbarBrand href="/" style = {{width : 150, marginLeft : 480, color: "#840101" }}>Easy Water Bill Payment </NavbarBrand>
    <NavbarToggler onClick={this.toggle} />
    <Collapse isOpen={this.state.isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/AdminLogin" style = {{color: "#011684" }}>Admin panel</NavLink>
        </NavItem>

        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              About
            </DropdownItem>
            <DropdownItem>
              Help
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Reset
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Collapse>
  </Navbar>

        <div id="signInError">

          <center> <h1>
          {
            (message) ? (<p> {message} </p>) : (null)
          }

          </h1>
        </center>
        </div>


        <div style = {{ marginLeft: 20, marginTop:40 }}>
        <img src={Image} alt="Cinque Terre" width="304" height="236"/>
          <Container>
          <Form>
          <FormGroup>
            <Label for="exampleEmail">Enter Customer id</Label>
            <Input type="text" id="cid" id="exampleEmail" value={signInCustId} onChange={this.onChangeCustId} placeholder="Cust_id" />
          </FormGroup>

          <div id="submitbt">

            <center>  <Button  style = {{ marginTop: 20}} color="success" type="button"  size="lg"  onClick={this.onSignIn}>Submit </Button>{' '} </center>
          </div>

        </Form>  </Container>
        </div>

          </div>
      );
    }
  }

/*const userlogin = (props) => {
  return(




  )
}; */

export default Userlogin;
