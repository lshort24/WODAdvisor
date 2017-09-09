import React from 'react';
import PropTypes from 'prop-types';
import {Panel, Button} from 'react-bootstrap';

/**
 * Dumb component for the workout of the day
 */
const WorkoutOfTheDay = (props) => {

    if (props.wod.length === 0) {
        return <Panel header="Workout of the Day">
            <div>Select some exercises from the list below</div>
        </Panel>        
    }
    else {
        return <Panel header="Workout of the Day">
            <div>
                {
                    props.wod.map((exercise) => {
                        return (
                            <div key={exercise.id}>
                                <Button bsStyle="danger" className="minus-button" onClick={() => props.selectMinus(exercise)}>
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
                        onClick={() => props.saveWorkout(props.wod)}>
                    Save Workout
                </Button>
            </div>
        </Panel>
    }
};


WorkoutOfTheDay.propTypes = {
    wod: PropTypes.array,
    selectMinus: PropTypes.func,
    saveWorkout: PropTypes.func
};

WorkoutOfTheDay.defaultTypes = {
    wod: []
};

export default WorkoutOfTheDay;
