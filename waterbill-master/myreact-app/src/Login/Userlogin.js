import React, {Component} from 'react';
import Image from '../images/water_save.png';

import { Route, Redirect } from 'react-router'

//Imporrt dependency from reactstrap
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
              state1: { referrer: this.state.Cust_id }
          }} />)
    }

      return (
        <div>




        <div id="signInError">
          {
            (message) ? (<p> {message} </p>) : (null)
          }
        </div>

        <div >
        <img src={Image} alt="Cinque Terre" width="304" height="236"/>
        <form >
           <div >
          <label>Enter Customer id  </label>
          <input type="text" id="cid" value={signInCustId} onChange={this.onChangeCustId}/>

          <div id="submitbt">
             <button color="success" type="button"  onClick={this.onSignIn}>Primary</button>
          </div>
           </div>
        </form>
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
