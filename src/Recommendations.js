import React from 'react';
import * as dataManager from './DataManager';
import * as WODManager from './WODManager';
import CheckBoxButton from './CheckBoxButton';
import {Panel} from 'react-bootstrap';
import Moment from "moment";

class Recommendations extends React.Component {
    constructor() {
        super();

        this.state = {
            wod: [],
            recommendations: this._getRecommendations()
        };
    }

    componentWillMount() {
        this.setState({wod: this.props.wodManager.getWOD()}); 
    }
    
    update(exerciseId, checked) {
        if (checked) {
            this.props.wodManager.add(exerciseId);
        }
        else {
            this.props.wodManager.remove(exerciseId);
        }
        this.setState({wod: this.props.wodManager.getWOD()});
    }


    render() {
        let recommendationList = this._buildRecommendationList();

        return (
            <Panel header="Recommendations">
                {recommendationList}
            </Panel>
        )
    }

    _buildRecommendationList() {

        return this.state.recommendations.map((entry) => {
            return (
                <div key={entry.id}>
                    <CheckBoxButton update={this.update.bind(this, entry.exercise.id)}
                                    checked={this.state.wod.find(exercise => exercise.id === entry.exercise.id)}/>
                    {entry.exercise.name}&nbsp;
                    {entry.exercise.bodyParts.map(bodyPart =>
                        <span key={bodyPart.id} className="badge"
                              style={{backgroundColor: bodyPart.color}}>{bodyPart.name}&nbsp;</span>
                    )}
                </div>
            )
        });
    }

    _getRecommendations() {
        let haveLastEntryForExercise = [];

        // Get the latest history entry for each exercise
        let recent_history = dataManager.getHistory().sort((a, b) => {
            let aDate = new Moment(a[1]);
            let bDate = new Moment(b[1]);
            return bDate.diff(aDate);
        }).filter((historyRecord) => {
            let exerciseId = historyRecord[2];
            if (!haveLastEntryForExercise[exerciseId]) {
                haveLastEntryForExercise[exerciseId] = true;
                return true;
            }
            return false;
        }).map((historyRecord) => {
            return dataManager.getHistoryById(historyRecord[0])
        });

        // Determine the priority for body parts
        let priority = [];
        recent_history.forEach((entry) => {
            entry.exercise.bodyParts.forEach((bodyPart) => {
                if (!priority[bodyPart.id] || entry.daysAgo + 1 < priority[bodyPart.id]) {
                    priority[bodyPart.id] = entry.daysAgo + 1;
                }
            })
        });

        return recent_history.map((entry) => {
            entry.bodyParts = entry.exercise.bodyParts.map((bodyPart) => {
                return bodyPart.priority = priority[bodyPart.id];
            });
            return entry;
        }).map((entry) => {
            let maxBodyPartScore = 0;
            entry.exercise.bodyParts.forEach((bodyPart) => {
                if (bodyPart.priority > maxBodyPartScore) {
                    if (maxBodyPartScore !== 0) {
                        console.log(`Overriding body part score of ${maxBodyPartScore} because ${bodyPart.name} has a priority of ${bodyPart.priority}.`);
                    }
                    maxBodyPartScore = bodyPart.priority;
                }
            });

            let score = maxBodyPartScore * (entry.daysAgo + 1);

            return Object.assign(entry, {score});
        }).sort((a, b) => {
            return b.score - a.score;
        });
    }
}

export default Recommendations;
