import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Panel, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {selectMinus, saveWorkout} from './actions';

/**
 * Component for the workout of the day
 */
class WorkoutOfTheDay extends Component {

    render() {
        let content = <div>Select some exercises from the list below</div>;
        if (this.props.wod.length > 0) {
            content = <div>
                {
                    this.props.wod.map((exercise_id) => {
                        return (
                            <div key={exercise_id}>
                                <Button bsStyle="danger" className="minus-button" onClick={() => this.props.selectMinus(this.props.exercises[exercise_id])}>
                                    <span className="glyphicon glyphicon-minus" />
                                </Button>
                                <span>{this.props.exercises[exercise_id].name}</span>&nbsp;
                                {this.props.exercises[exercise_id].bodyParts.map(bodyPart =>
                                    <span key={bodyPart.id} className="badge"
                                          style={{backgroundColor: bodyPart.color}}>{bodyPart.name}</span>
                                )}
                            </div>
                        );
                    })
                }
                <Button bsStyle="primary"
                        bsSize="small"
                        style={{float: 'right'}}
                        onClick={() => this.props.saveWorkout(this.props.wod)}>
                    Save Workout
                </Button>
            </div>
        }
        
        return (
            <Panel header="Workout of the Day">
                {content}
            </Panel>
        )
    }
}


WorkoutOfTheDay.propTypes = {
    wod: PropTypes.array,
    exercises: PropTypes.array,
    selectMinus: PropTypes.func,
    saveWorkout: PropTypes.func
};

WorkoutOfTheDay.defaultTypes = {
    wod: [],
    exercises: []
};


function mapStateToProps(state) {
   return {
       wod: state.wod,
       exercises: state.exercises
   } 
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectMinus: selectMinus,
        saveWorkout: saveWorkout
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(WorkoutOfTheDay);
