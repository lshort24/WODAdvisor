import React from 'react';
import PropTypes from 'prop-types';
import {Button, Panel} from 'react-bootstrap';

/**
 * Dump component that displays a list of recommended exercises bases on past history of workouts
 */
const Recommendations = (props) => {
    
    return (
        <Panel header="Recommendations">
            {
                props.choices.map(exercise => {
                    let debug_info = '';
                    if (props.showScores) {
                        debug_info = <span>
                            &nbsp;<span>score = {exercise.bodyPartScore}</span>
                            &nbsp;<span>ago = {exercise.timeAgo}</span>
                        </span>;
                    }
                    
                    return (
                        <div key={exercise.id}>
                            <Button bsStyle="success" className="plus-button" onClick={() => props.selectPlus(exercise)}>
                                <span className="glyphicon glyphicon-plus" />
                            </Button>
                            {exercise.name}&nbsp;
                            {exercise.bodyParts.map(bodyPart =>
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
    showScores: PropTypes.bool,
    selectPlus: PropTypes.func
};

Recommendations.defaultTypes = {
    choices: [],
    showScores: false
};

export default Recommendations;