import React, {Component} from 'react';
import WorkoutOfTheDay from './WorkoutOfTheDay';
import Recommendations from './Recommendations';
import {Col, Grid, PageHeader, Row } from 'react-bootstrap';
import "./App.css";

// TODO look into ducks
class App extends Component {
    //noinspection JSMethodCanBeStatic
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={12}><PageHeader><img className="logo" src="logo.png" alt="logo"/>WOD Advisor</PageHeader></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}>
                        <WorkoutOfTheDay />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}>
                        <Recommendations />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}>
                        Last updated 2017-09-09 11:50 AM
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
