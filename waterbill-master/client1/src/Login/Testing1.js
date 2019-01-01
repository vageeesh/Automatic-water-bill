import React, {Component} from 'react';
import Userlogin from './Userlogin'

import { Route, Redirect } from 'react-router'



class Testing1 extends Component {

  constructor(props) {
    super(props);
      this.state = {
        islog: true,
        ddd: 'ddd',
         isVisible: false,
          selectedPath: "1" ,
      };

      ;
    }


    render() {

      const {
      islog
      } = this.state;


      return (

        <div>

            <h1> THIS IS TESTING!!!!!!!!!!!!!!!!!!! </h1>



      

       </div>

      );
    }

}

export default Testing1;
