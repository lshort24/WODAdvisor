import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators, selectors} from '../redux/modules/wod/index';
import WorkoutOfTheDay from '../components/workout_of_the_day/index';
import Recommendations from '../components/recommendations/index';
import {Col, Grid, PageHeader, Row } from 'react-bootstrap';
import "../app.css";

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
                        <WorkoutOfTheDay 
                            wod={this.props.wod} 
                            selectMinus={this.props.selectMinus}
                            saveWorkout={this.props.saveWorkout}
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}>
                        <Recommendations 
                            choices={this.props.choices} 
                            scores={this.props.scores}
                            selectPlus={this.props.selectPlus}
                            showScores={false}
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}>
                        Last updated 2017-09-09 12:36 PM
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        wod: state.wod,
        choices: selectors.selectChoices(state)
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectPlus: actionCreators.selectPlus,
        selectMinus: actionCreators.selectMinus,
        saveWorkout: actionCreators.saveWorkout
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
