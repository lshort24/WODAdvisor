import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {selectPlus} from './actions';

/**
 * Component that displays a list of recommended exercises bases on past history of workouts
 */
class Recommendations extends React.Component {
    
    render() {
        return (
            <Panel header="Recommendations">
                {
                    this.props.choices.map(exercise_id => {
                        let debug_info = '';
                        if (this.props.scores[exercise_id]) {
                            debug_info = <span>
                                &nbsp;<span>score = {this.props.scores[exercise_id].bodyPartScore}</span>
                                &nbsp;<span>ago = {this.props.scores[exercise_id].timeAgo}</span>
                            </span>;
                        }
                        
                        return (
                            <div key={exercise_id}>
                                <Button bsStyle="success" className="plus-button" onClick={() => this.props.selectPlus(this.props.exercises[exercise_id])}>
                                    <span className="glyphicon glyphicon-plus" />
                                </Button>
                                {this.props.exercises[exercise_id].name}&nbsp;
                                {this.props.exercises[exercise_id].bodyParts.map(bodyPart =>
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
    choices: PropTypes.array,
    exercises: PropTypes.array,
    scores: PropTypes.object,
    selectPlus: PropTypes.func
};

Recommendations.defaultTypes = {
    choices: [],
    exercises: [],
    scores: []
};

function mapStateToProps(state) {
    return {
        choices: state.choices,
        exercises: state.exercises,
        scores: state.scores
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectPlus: selectPlus}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Recommendations);
