import React, {Component} from 'react';
import WorkoutOfTheDay from './WorkoutOfTheDay';
import Recommendations from './Recommendations';
import WODManager from './WODManager';
import {Col, Grid, PageHeader, Row } from 'react-bootstrap';
import "./App.css";

/* global render */
class App extends Component {
    constructor() {
        super();
        this.wodManager = new WODManager;
    }
    
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={12}><PageHeader>WOD Advisor</PageHeader></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}><WorkoutOfTheDay wodManager={this.wodManager}/></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}><Recommendations wodManager={this.wodManager}/></Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
