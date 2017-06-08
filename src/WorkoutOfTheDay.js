import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import * as dataManager from './DataManager';

/**
 * Component for the workout of the day
 * 
 * @param   {array}     props.value
 * @param   {function}  props.onSaveWorkout
 */
class WorkoutOfTheDay extends React.Component {
    render() {
        let wodList = this._getWODList();
        return (
            <Panel header="Workout of the Day">
                {wodList}
            </Panel>
        )
    }

    
    _getWODList() {
        if (this.props.value.length === 0) {
            return (<div>Select some exercises from the list below</div>);
        }

        let wod = this.props.value.map((exercise_id) => {
            let exercise = dataManager.getExerciseById(exercise_id);
            return (
                <div key={exercise.id}>
                    <span>{exercise.name}</span>&nbsp;
                    {exercise.bodyParts.map(bodyPart =>
                        <span key={bodyPart.id} className="badge"
                              style={{backgroundColor: bodyPart.color}}>{bodyPart.name}</span>
                    )}
                </div>
            );
        });

        return <div>
            {wod}
            <Button bsStyle="primary" 
                    bsSize="small" 
                    style={{float: 'right'}}
                    onClick={this.props.onSaveWorkout}>
                Save Workout
            </Button>
        </div>
    }
}

export default WorkoutOfTheDay;
