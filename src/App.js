import React, {Component} from 'react';
import Recommendations from './Recommendations';
import {Col, Grid, PageHeader, Row } from 'react-bootstrap';
import "./App.css";

/* global render */
class App extends Component {
   //noinspection JSMethodCanBeStatic
   render() {
      return (
         <Grid>
            <Row className="show-grid">
               <Col sm={12}><PageHeader>WOD Advisor</PageHeader></Col>
            </Row>
            <Row className="show-grid">
               <Col sm={12}><Recommendations /></Col>
            </Row>
         </Grid>
      );
   }
}

export default App;
