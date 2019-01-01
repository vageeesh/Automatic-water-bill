import React, {Component} from 'react';
import Userlogin from './Userlogin'

import { Route, Redirect } from 'react-router'

import { SideNav, Nav } from 'react-sidenav'
 import Icon from 'react-icons-kit';
 import styled from "styled-components";
import {ic_arrow_forward} from 'react-icons-kit/md/ic_arrow_forward'
import { Container as BaseContainer } from 'react-sidenav/playground/Container'

const Container = styled(BaseContainer)`
    width: 900px;
    height: 50%;
    background: red;
    color: #FFF;
`

const theme = {
  selectionColor: "#FFF",
  hoverBgColor: "#181b20",
  selectionBgColor: "#E64A19"
};

class Testing1 extends Component {

  constructor(props) {
    super(props);
      this.state = {
        islog: true,
        ddd: 'ddd',
         isVisible: false,
          selectedPath: "1" ,
      };

      this.onItemSelection = this.onItemSelection.bind(this);
    }

    updateModal(isVisible) {
    	this.state.isVisible = isVisible;
      this.forceUpdate();
    }

    onItemSelection(arg: any) {

      this.setState({ selectedPath: arg.path, });

    };



    render() {

      const {
      islog
      } = this.state;


      return (

        <div>

            <h1> THIS IS TESTING!!!!!!!!!!!!!!!!!!! </h1>



        <Container>

        <SideNav
           defaultSelectedPath="1"
           theme={theme}
           onItemSelection={this.onItemSelection}
         >
         <Nav id="1">
               <Icon icon={ic_arrow_forward}/>
             Item 1
         </Nav>
         <Nav id="2">Item 2</Nav>
         <Nav id="3">Item 3</Nav>
         <Nav id="2">Item 2</Nav>
         <Nav id="3">Item 3</Nav>
         <Nav id="2">Item 2</Nav>
         <Nav id="3">Item 3</Nav>
         <Nav id="2">Item 2</Nav>
         <Nav id="3">Item 3</Nav>
         <Nav id="2">Item 2</Nav>
         <Nav id="3">Item 3</Nav>
         </SideNav>

      </Container>

       </div>

      );
    }

}

export default Testing1;
