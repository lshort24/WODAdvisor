import React, {Component} from 'react';
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import WorkoutOfTheDay from './WorkoutOfTheDay';
import Recommendations from './Recommendations';
import * as dataManager from './DataManager';
import {Col, Grid, PageHeader, Row } from 'react-bootstrap';
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            wod: [],
            choices: [],
            recommendations: []
        };
        // TODO: look at connect. Pull this out into index.js. Look at provider in react-redux package.
        this.store = createStore(rootReducer);
    }
    
    componentWillMount() {
        this.store.subscribe(() => {
            const new_state = this.store.getState();
            
            this.setState({
                wod: new_state.wod,
                choices: new_state.choices,
                recommendations: new_state.recommendations
            });
            
            dataManager.saveWOD(new_state.wod);
        });

        this.store.dispatch({
            type: 'INIT_WOD', 
            wod: dataManager.getWOD(),
            recommendations: dataManager.getRecommendations()
        });
    }
    
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={12}><PageHeader><img className="logo" src="logo.png"/>WOD Advisor</PageHeader></Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}>
                        <WorkoutOfTheDay 
                            wod={this.state.wod}
                            onSaveWorkout={(wod) => {
                                dataManager.saveWorkout(wod);
                                this.store.dispatch({
                                    type: 'SAVE_WORKOUT', 
                                    recommendations: dataManager.getRecommendations()
                                });
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
                            choices={this.state.choices}
                            recommendations={this.state.recommendations}
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
