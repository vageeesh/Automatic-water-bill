import React, { Component } from 'react';

import {
  Button ,
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
  DropdownItem, Form, FormGroup, Label, Input, Container, FormFeedback, FormText  } from 'reactstrap';


  class UserLogin extends Component {

    constructor(props) {
      super(props);
        this.state = {
          succuss: false,
          isLoding: true,
          id: '',
          pass: '',
          message: '',
        };

          this.onChangeId = this.onChangeId.bind(this);
          this.onChangePass = this.onChangePass.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeId(event) {
      this.setState({
        id: event.target.value,
      });
    }

    onChangePass(event) {
      this.setState({
        pass: event.target.value,
      });
    }

    onSubmit() {
      if(this.state.id=='admin' && this.state.pass=='admin') {
        this.props.history.push({
        pathname: '/Userlogin',
        search: '?adminlogin=succuss',
        })
      }
      else {
        this.setState({
          message: ' Invalid Login Credntials',
        })
      }
    }



    componentWillMount(){


      }

    render() {

      const {
        id,
        pass,
        message,
      } = this.state;

      return (
        <div className="adminpage">
        <Navbar style={{backgroundColor: "#E4BC79"}} light expand="md">
        <NavbarBrand href="/" style = {{width : 150, marginLeft : 480, color: "#840101" }}>Easy Water Bill Payment </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>

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

        <div id="frm" style={{  marginLeft: 30, marginTop: 150,padding: 10}}>
        <Container>
            <Form >
              <FormGroup>
                <Label for="exampleEmail" hidden>Email</Label>
                <Input valid type="email" name="email" id="exampleEmail" placeholder="Email" value={id} onChange={this.onChangeId}/>
                <FormFeedback valid>Sweet! </FormFeedback>
                <FormText>Enter Your Email</FormText>
                </FormGroup>
                {' '}
                <FormGroup>
                <Label for="examplePassword" hidden>Password</Label>
                <Input invalid type="password" name="password" id="examplePassword" placeholder="Password" value={pass} onChange={this.onChangePass}/>
                <FormFeedback >Sweet! </FormFeedback>
                <FormText>Enter Your password</FormText>
                </FormGroup>
                {' '}
                <Button color="info" style={{ marginLeft: 480}} onClick={this.onSubmit}>Submit</Button>

                </Form>
          </Container>

        </div>
      </div>

      );
    }
  }
  export default UserLogin;
