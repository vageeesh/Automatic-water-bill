import React, { Component } from 'react';

import { Table, Button  } from 'reactstrap';

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

class AdminPage extends Component {

  constructor(props) {
    super(props);

      this.state = {
        succuss: false,
        users: [],
        val: 0,
        isLoding: true,
        isOpen: false,
        Cust_id: '',
        message: ''
      };

        this.showUsers = this.showUsers.bind(this);
        this.addNewUser=this.addNewUser.bind(this);
        this.deleteUser=this.deleteUser.bind(this);
        this.showUserDetails=this.showUserDetails.bind(this);
  }

  showUsers() {
    console.log("Fetch users");

    fetch('/customer/fetchallusers',
    {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({

      }),

    }).then(res=>res.json())
      .then(result=> {
        console.log('fetched_array is',result);
        if(result.users!=null) {
         console.log("result is"+result.users);
         this.setState({
           users: result.users,
         })
        }
        else {
          this.setState({

            message: "No users in database",

          })
        }
      });
      console.log("result is"+this.state.users);
  }

  deleteUser(custid) {

      console.log("customer_to_delete"+custid);
          fetch('/customer/deleteuser',
          {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify({
              cid : custid,
            }),

          }).then(res=>res.json())
            .then(result=> {
              console.log('fetched_array is',result);
              if(result.succuss) {

                this.showUsers();
              }
              else {
                this.setState({
                  message: result.msg,
                })
              }
            });
  }

  showUserDetails(custid) {
    console.log("customer_to_show details"+custid);
    this.props.history.push({
    pathname: '/news',
    search: '?query=abc',
    state: { cid: custid }
  })

  }

  addNewUser() {
    var custid = prompt("Please enter Custeomer_id");

    fetch('/customer/register',
    {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        cid : custid,
      }),

    }).then(res=>res.json())
      .then(result=> {
        console.log('fetched_array is',result);
        if(result.succuss) {
          /*this.setState({
            message: result.msg,
          }) */
          this.showUsers();
        }
        else {
          this.setState({
            message: result.msg,
          })
        }
      });
  }


  componentWillMount(){
      this.showUsers();

    }

  render() {
    return (
      <div className="adminpage">
      <Navbar style={{backgroundColor: "#E4BC79"}} light expand="md">
  <NavbarBrand href="/" style = {{width : 150, marginLeft : 480, color: "#840101" }}>Easy Water Bill Payment </NavbarBrand>
  <NavbarToggler onClick={this.toggle} />
  <Collapse isOpen={this.state.isOpen} navbar>
    <Nav className="ml-auto" navbar>

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



<Table hover bordered>
    <thead style = {{backgroundColor: "#006B76" }}>
      <tr>
        <th>#</th>
        <th>Customer id</th>
        <th>Water Usage</th>
        <th>Show Details</th>
      </tr>
    </thead>
    <tbody >

      {this.state.users.map((item, idx) => (
                  <tr id="addr0" key={idx} style = {{marginLeft : 480}}>
                    <td>{idx}</td>
                    <td>
                      {item.id}
                    </td>
                    <td>
                      <Button color="warning" style = {{}} onClick={() => { this.deleteUser(item.id) }} >DELETE USER</Button>{' '}

                    </td>
                    <td>
                      <Button color="info" style = {{}}  onClick={() => { this.showUserDetails(item.id) }}>Show Details</Button>{' '}

                    </td>
                  </tr>
                ))}

    </tbody>
  </Table>

                  <Button color="success" size="lg" block  onClick={this.addNewUser}>Add New User</Button>
      </div>

    );
  }
}
export default AdminPage;
