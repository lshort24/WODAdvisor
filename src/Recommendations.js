import React from 'react';
import * as dataManager from './DataManager';
import CheckboxButton from './CheckboxButton';
import {Panel} from 'react-bootstrap';

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
            <Panel header="Recommendations">
                {recommendationList}
            </Panel>
        )
    }

    _onChange(index) {
        this.props.onAdd(index);        
    }
    
    
    _buildRecommendationList(wod) {
        let component = this;
        
        console.log('build recommendations');
        let recommendations = this._getRecommendations(wod);
        return recommendations.map((entry) => {
            let show_debug_info = false;
            let debug_info = '';
            if (show_debug_info) {
                debug_info = <span>
                    &nbsp;<span>score = {entry.score}</span>
                    &nbsp;<span>ago = {entry.daysAgo}</span>
                </span>;                
            }
            
            return (
                <div key={entry.id}>
                    <CheckboxButton onChange={component._onChange.bind(component, entry.exercise.id)} checked={entry.checked} />
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
                if (!priority[bodyPart.id] || entry.daysAgo + 1 < priority[bodyPart.id]) {
                    priority[bodyPart.id] = entry.daysAgo + 1;
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

            entry.score = maxBodyPartScore * (entry.daysAgo + 1);
            return entry;
        });
    
        // Sort
        recommendations = recommendations.sort((a, b) => {
            return b.score - a.score;
        });
        
        // Set checked state
        recommendations = recommendations.map(entry => {
            entry.checked = wod.indexOf(entry.exercise.id) >= 0; 
            return entry;
        });

        return recommendations;
    }
}

export default Recommendations;
