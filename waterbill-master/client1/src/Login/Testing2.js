import React, {Component} from 'react';
import Userlogin from './Userlogin'

import { Route, Redirect } from 'react-router'

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import PropTypes from 'prop-types';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { Table, Button  } from 'reactstrap';

class Testing2 extends Component {

  constructor(props) {
    super(props);

      console.log('props',this.props);
      var total1=0;

      this.state = {
        icid: 0,
        islog: true,
        message: 'wel',
        expanded: false,
        selected_month:1,
        total: 0,
        user_retrieved_array: [],
        user_retrieved_array1:[]
      }


      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.billGeneration=this.billGeneration.bind(this);


    }

    onSelectedMonth(val) {

      if(this.props.location.state) {
      console.log("customer id is",this.props.location.state.cid);

      this.setState({
            icid: this.props.location.state.cid,
         });
      }
      this.setState({
          selected_month: val,
      });
      fetch('/customer/retrieve',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          cid : this.state.icid,
          amount: "67",
          year : "2017",
          month: val,
          date: "2017/5/4"
        }),

      }).then(res=>res.json())
        .then(result=> {
          console.log('fetched_array is',result);
          if(result.dat!=null) {
           console.log("result is"+result);

            this.setState({
            user_retrieved_array: result.wateruse.dailyusage,
            })
            console.log('fetched_array_result',this.state.user_retrieved_array[0].usebyday);
            this.setState({
            user_retrieved_array1: this.state.user_retrieved_array[0].usebyday,
          })
          }
          else {
            this.setState({
              user_retrieved_array1: [],
              message: "No data to display",

            })
          }
        });
    }



    componentDidMount() {

       //document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillMount(){
        this.onSelectedMonth(1);

      }

    handleClickOutside(event) {
        this.setState({ expanded: false });
      }
    billGeneration() {

          var tota=0;
          this.state.user_retrieved_array1.map((item,idx) => (
            tota=tota + item.amount
          ));

        console.log("Total amount is"+tota);


        this.props.history.push({
        pathname: '/billGenerationPage',
        search: '?query=bill',
        state: { cid: this.state.icid, total: tota }
      })
    }


  render() {

    const {
    islog
    } = this.state;


    return (

      <div>
          <SideNav

              onSelect={(selected,key) => {
                  // Add your code here
                  console.log(selected);
                  this.onSelectedMonth(selected);
              }}
              expanded={this.state.expanded}
              onToggle={(expanded) => {
                  this.setState({ expanded });
                }}
          >
<SideNav.Toggle />
<SideNav.Nav defaultSelected="1">
  <NavItem eventKey="1" onClick={this.handleClickOutside}>
      <NavIcon>
          <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
      </NavIcon>
      <NavText>
          Janaury
      </NavText>
  </NavItem>
  <NavItem eventKey="2"  onClick={this.handleClickOutside}>
      <NavIcon>
          <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
      </NavIcon>
      <NavText>
          Febrary
      </NavText>
  </NavItem>
  <NavItem eventKey="3"  onClick={this.handleClickOutside}>
      <NavIcon>
          <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
      </NavIcon>
      <NavText>
          March
      </NavText>
  </NavItem>
  <NavItem eventKey="4"  onClick={this.handleClickOutside}>
      <NavIcon>
          <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
      </NavIcon>
      <NavText>
          April
      </NavText>
  </NavItem>
  <NavItem eventKey="5"  onClick={this.handleClickOutside}>
      <NavIcon>
          <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
      </NavIcon>
      <NavText>
          May
      </NavText>
  </NavItem>
  <NavItem eventKey="6"  onClick={this.handleClickOutside}>
      <NavIcon>
          <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
      </NavIcon>
      <NavText>
          June
      </NavText>
  </NavItem>
  <NavItem eventKey="7"  onClick={this.handleClickOutside}>
      <NavIcon>
          <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
      </NavIcon>
      <NavText>
          July
      </NavText>
  </NavItem>
  <NavItem eventKey="8"  onClick={this.handleClickOutside}>
  <NavIcon>
             <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
         </NavIcon>
      <NavText>
          August
      </NavText>
  </NavItem>
  <NavItem eventKey="9"  onClick={this.handleClickOutside}>
  <NavIcon>
             <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
         </NavIcon>
      <NavText>
          September
      </NavText>
  </NavItem>
  <NavItem eventKey="10"  onClick={this.handleClickOutside}>
  <NavIcon>
             <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
         </NavIcon>
      <NavText>
          October
      </NavText>
  </NavItem>
  <NavItem eventKey="11"  onClick={this.handleClickOutside}>
  <NavIcon>
             <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
         </NavIcon>
      <NavText>
          November
      </NavText>
  </NavItem>
  <NavItem eventKey="12"  onClick={this.handleClickOutside}>
  <NavIcon>
             <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
         </NavIcon>
      <NavText>
          December
      </NavText>
  </NavItem>
</SideNav.Nav>
</SideNav>


<Table hover>
    <thead style = {{backgroundColor: "#779951" }}>
      <tr>
        <th>#</th>
        <th>Customer id</th>
        <th>Water Usage</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>

      {this.state.user_retrieved_array1.map((item,idx) => (

                  <tr id="addr0" key={idx}>
                    <td>{idx}</td>
                    <td>
                      {item._id}
                    </td>
                    <td>
                      {item.amount}

                    </td>
                    <td>
                      {item.date.slice(0,10)}


                    </td>
                  </tr>
                ))}

    </tbody>
  </Table>
      {
        ( this.props.location.search) ? (null) : (<p>   <center><Button block style = {{ marginDown: 40, marginTop:20 }} color="primary"  onClick={this.billGeneration}>Pay My Bill</Button>{' '} </center> </p>)

      }
      </div>

    );
  }

}

export default Testing2;
