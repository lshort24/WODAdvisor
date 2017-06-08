import React, {Component} from 'react';
import { createStore } from 'redux';
import stateManager from './stateManager';
import WorkoutOfTheDay from './WorkoutOfTheDay';
import Recommendations from './Recommendations';
import * as dataManager from './DataManager';
import {Col, Grid, PageHeader, Row } from 'react-bootstrap';
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            wod: []
        };
        this.store = createStore(stateManager);
    }
    
    componentWillMount() {
        this.store.subscribe(() => {
            let new_state = this.store.getState();
            
            // Save the WOD to local storage
            dataManager.saveWOD(new_state.wod);
            
            // Save the workout
            if (new_state.save) {
                dataManager.saveWorkout(new_state.save_wod);
            }
            this.setState({wod: new_state.wod});
        });

        this.store.dispatch({type: 'INIT'});
    }
    
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={12}><PageHeader>WOD Advisor</PageHeader></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}>
                        <WorkoutOfTheDay 
                            value={this.state.wod}
                            onSaveWorkout={() => {
                                this.store.dispatch({type: 'SAVE_WORKOUT'});
                            }}
                            onRemove={(index) => {
                                this.store.dispatch({type: 'REMOVE_FROM_WOD', value: index});
                            }}
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}>
                        <Recommendations 
                            value={this.state.wod}
                            onAdd={(index) => {
                                this.store.dispatch({type: 'ADD_TO_WOD', value: index});
                            }} 
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
