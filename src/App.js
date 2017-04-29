import React, {Component} from 'react';
import WorkoutOfTheDay from './WorkoutOfTheDay';
import Recommendations from './Recommendations';
import * as dataManager from './DataManager';
import {Col, Grid, PageHeader, Row } from 'react-bootstrap';
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            wod: dataManager.getWOD()
        };
    }
    
    
    _updateWOD(exerciseId, checked) {
        if (checked) {
            dataManager.addToWOD(exerciseId);
        }
        else {
            dataManager.removeFromWOD(exerciseId);
        } 
        this.setState({
            wod: dataManager.getWOD()
        });
    }
    
    
    _clearWOD() {
        // Clear the workout for next time
        dataManager.saveWOD([]);
        this.setState({
            wod: []
        });
    }
    
    
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={12}><PageHeader>WOD Advisor</PageHeader></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}><WorkoutOfTheDay wod={this.state.wod} onSaveWorkout={this._clearWOD.bind(this)}/></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}><Recommendations wod={this.state.wod} onSelection={this._updateWOD.bind(this)}/></Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
