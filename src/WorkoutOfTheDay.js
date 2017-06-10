import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as dataManager from './DataManager';

/**
 * Component for the workout of the day
 */
class WorkoutOfTheDay extends React.Component {

    render() {
        let content = <div>Select some exercises from the list below</div>;
        if (this.props.wod.length > 0) {
            content = <div>
                {
                    this.props.wod.map((exercise_id) => {
                        const exercise = dataManager.getExerciseById(exercise_id);
                        return (
                            <div key={exercise.id}>
                                <Button bsStyle="danger" className="minus-button" onClick={this.props.onRemove.bind(this, exercise_id)}>
                                    <span className="glyphicon glyphicon-minus" />
                                </Button>
                                <span>{exercise.name}</span>&nbsp;
                                {exercise.bodyParts.map(bodyPart =>
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
                        onClick={this.props.onSaveWorkout.bind(this, this.props.wod)}>
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
    wod: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSaveWorkout: PropTypes.func.isRequired
};

WorkoutOfTheDay.defaultTypes = {
    wod: []
};

export default WorkoutOfTheDay;
