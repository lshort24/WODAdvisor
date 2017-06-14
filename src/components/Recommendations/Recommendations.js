import React from 'react';
import PropTypes from 'prop-types';
import {Button, Panel} from 'react-bootstrap';

/**
 * Dump component that displays a list of recommended exercises bases on past history of workouts
 */
export const Recommendations = (props) => {
    
    return (
        <Panel header="Recommendations">
            {
                props.choices.map(exercise_id => {
                    let debug_info = '';
                    if (props.scores[exercise_id]) {
                        debug_info = <span>
                            &nbsp;<span>score = {props.scores[exercise_id].bodyPartScore}</span>
                            &nbsp;<span>ago = {props.scores[exercise_id].timeAgo}</span>
                        </span>;
                    }
                    
                    return (
                        <div key={exercise_id}>
                            <Button bsStyle="success" className="plus-button" onClick={() => props.selectPlus(props.exercises[exercise_id])}>
                                <span className="glyphicon glyphicon-plus" />
                            </Button>
                            {props.exercises[exercise_id].name}&nbsp;
                            {props.exercises[exercise_id].bodyParts.map(bodyPart =>
                                <span key={bodyPart.id} className="badge"
                                      style={{backgroundColor: bodyPart.color}}>{bodyPart.name}&nbsp;</span>
                            )}
                            {debug_info}
                        </div>
                    );
                })                   
            }
        </Panel>
    );
};


Recommendations.propTypes = {
    choices: PropTypes.array,
    exercises: PropTypes.array,
    scores: PropTypes.object,
    selectPlus: PropTypes.func
};

Recommendations.defaultTypes = {
    choices: [],
    exercises: [],
    scores: {}
};
