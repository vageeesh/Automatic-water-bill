import React, { Component } from 'react';

import { Table, Card, Button, CardTitle, CardText,CardHeader, CardFooter, CardBody,  Row, Col } from 'reactstrap';


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

  import styled, { css } from 'styled-components'

  import html2canvas from 'html2canvas';

  import jsPDF from 'jspdf';


  class billGenerationPage extends Component {

      constructor(props) {
        super(props);

          this.state = {
            unit: 10,
            totalamount: 0,
            unitandprice: 0,
            isLoding: true,
            isOpen: false,

          };

      }

      printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
    }

      componentWillMount(){

            console.log("Attribute id"+this.props.location.state.cid);
            console.log("Attribute amount"+this.props.location.state.total);

            this.setState({
               unitandprice: this.state.unit * this.props.location.state.total ,

            })

        }

    render() {
      return (

        <div className="App">

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

  <div id="divToPrint" className="mt4" {...css({
      backgroundColor: '#f5f5f5',
      width: '500mm',
      minHeight: '197mm',
      marginLeft: 'auto',
      marginRight: 'auto'
    })}>

  <Row>
  <Col sm="6">
  <Card>
  <CardHeader tag="h3">Vijay Babu Company</CardHeader>
  <CardBody>
  <CardTitle>Address and Details : </CardTitle>
  <CardText><h5> #15, 2nd main , DubasiPalya, Kengeri, Pincode: 560059 </h5></CardText>
  <CardText><h5> Contact me@ : 7778833441</h5></CardText>

  </CardBody>
  </Card>
  </Col>

  <Col sm="6">
  <Card>
  <CardHeader tag="h3">Customer Details</CardHeader>
  <CardBody>
  <CardText><h4>Customer id: { this.props.location.state.cid } </h4></CardText>
  <CardText><h5>Date: {'6/12/24'}</h5></CardText>

  </CardBody>
  </Card>
  </Col>
  </Row>


 <Card >

 <CardBody>
 <CardTitle><b>Amount Details</b></CardTitle>
 <CardText>

 <Table hover>
    <thead style = {{backgroundColor: "#7D8170" }}>
      <tr>
      <th>Description</th>
      <th>Quantity</th>
      <th>Unit Price</th>
      <th>Amount</th>
      </tr>
    </thead>
    <tbody>
        <tr>
          <td>
             <b>Amount  paid for your water usage</b>
          </td>
          <td>
            { this.props.location.state.total }
          </td>
          <td>
            { this.state.unit }
          </td>
           <td>
            { this.state.unitandprice }
           </td>
        </tr>
        <tr>
          <td><b> GST </b></td>
          <td> 5% </td>
          <td> - </td>
          <td> {50} </td>
        </tr>

    </tbody>
  </Table>
  <h2>    Total Amount to be paid: { this.state.unitandprice + 50 }  </h2>
</CardText>

</CardBody>
<CardFooter><Button color="info" size="lg" block onClick={this.printDocument}>Pay My Bill</Button></CardFooter>
</Card>
</div>
        </div>
      );
    }
  }
    export default billGenerationPage;
