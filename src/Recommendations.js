import React from 'react';
import {Button, Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Component that displays a list of recommended exercises bases on past history of workouts
 */
class Recommendations extends React.Component {
    
    render() {
        const show_debug_info = true;
        
        return (
            <Panel header="Recommendations">
                {
                    this.props.recommendations.filter(recommendation => {
                            return this.props.choices.indexOf(recommendation.id) >= 0;
                    })
                    .map(entry => {
                        let debug_info = '';
                        if (show_debug_info) {
                            debug_info = <span>
                                &nbsp;<span>score = {entry.bodyPartScore}</span>
                                &nbsp;<span>ago = {entry.timeAgo}</span>
                            </span>;
                        }
                        
                        return (
                            <div key={entry.id}>
                                <Button bsStyle="success" className="plus-button" onClick={this.props.onAdd.bind(this, entry.exercise.id)}>
                                    <span className="glyphicon glyphicon-plus" />
                                </Button>
                                {entry.exercise.name}&nbsp;
                                {entry.exercise.bodyParts.map(bodyPart =>
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
    }
}


Recommendations.propTypes = {
    choices: PropTypes.array.isRequired,
    recommendations: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired
};

Recommendations.defaultTypes = {
    choices: [],
    recommendations: []
};

export default Recommendations;
