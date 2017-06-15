import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectPlus, selectMinus, saveWorkout} from '../redux/modules/wod/index';
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
                            exercises={this.props.exercises}
                            selectMinus={this.props.selectMinus}
                            saveWorkout={this.props.saveWorkout}
                        />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12}>
                        <Recommendations 
                            choices={this.props.choices} 
                            exercises={this.props.exercises} 
                            scores={this.props.scores}
                            selectPlus={this.props.selectPlus}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        wod: state.wod,
        choices: state.choices,
        exercises: state.exercises,
        scores: state.scores
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectPlus: selectPlus,
        selectMinus: selectMinus,
        saveWorkout: saveWorkout
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
