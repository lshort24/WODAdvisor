import React from 'react';
import * as dataManager from './DataManager';
import {Button, Panel} from 'react-bootstrap';

/**
 * Component that displays a list of recommended exercises bases on past history of workouts
 *  
 * @param   {array}     props.value
 * @param   {function}  props.onAdd
 */
class Recommendations extends React.Component {
    render() {
        let recommendationList = this._buildRecommendationList(this.props.value);

        return (
            <Panel header="Recommendationss">
                {recommendationList}
            </Panel>
        )
    }
    
    
    _buildRecommendationList(wod) {
        console.log('build recommendations');
        let recommendations = this._getRecommendations(wod);
        return recommendations.map((entry) => {
            if (entry.in_wod) {
                return false;
            }
            
            let show_debug_info = false;
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
            )
        });
    }

    
    _getRecommendations(wod) {
        // Start off with a list of all exercises and the date they were last performed
        let recommendations = dataManager.getExerciseHistory();
        
        // Determine the priority for body parts
        let priority = [];
        recommendations.forEach((entry) => {
            entry.exercise.bodyParts.forEach((bodyPart) => {
                if (!priority[bodyPart.id] || entry.timeAgo < priority[bodyPart.id]) {
                    priority[bodyPart.id] = entry.timeAgo;
                }
            })
        });

        // Assign a priority to each of the recommendations
        recommendations = recommendations.map((entry) => {
            entry.bodyParts = entry.exercise.bodyParts.map((bodyPart) => {
                return bodyPart.priority = priority[bodyPart.id];
            });
            return entry;
        });
    
        // Score
        recommendations = recommendations.map((entry) => {
            let maxBodyPartScore = 0;
            entry.exercise.bodyParts.forEach((bodyPart) => {
                if (bodyPart.priority > maxBodyPartScore) {
                    if (maxBodyPartScore !== 0) {
                        console.log(`Overriding body part score of ${maxBodyPartScore} because ${bodyPart.name} has a priority of ${bodyPart.priority}.`);
                    }
                    maxBodyPartScore = bodyPart.priority;
                }
            });

            entry.bodyPartScore = maxBodyPartScore;
            return entry;
        });
    
        // Sort first by body part score then by timeAgo in descending order
        // a == b => 0
        // a < b  => positive value - a should come after b
        // a > b  => negative value - a should come before b
        recommendations = recommendations.sort((a, b) => {
            if (a.bodyPartScore === b.bodyPartScore) {
                // sort by timeAgo
                return b.timeAgo - a.timeAgo;
            }
            
            // sort by body part score
            return b.bodyPartScore - a.bodyPartScore;
        });
        
        // Set in_wod state
        recommendations = recommendations.map(entry => {
            entry.in_wod = wod.indexOf(entry.exercise.id) >= 0; 
            return entry;
        });

        return recommendations;
    }
}

export default Recommendations;
