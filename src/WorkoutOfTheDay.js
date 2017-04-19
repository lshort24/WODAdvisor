import React from 'react';
import {Panel} from 'react-bootstrap';
import * as dataManager from './DataManager';

class WorkoutOfTheDay extends React.Component {
    constructor() {
        super();
        
        this.state = {
            wod: []
        };
    }
    
    componentWillMount() {
        let wod = this.props.wodManager.getWOD();   
        this.setState({wod: wod});
        
        let me = this;
        this.props.wodManager.on('change', 'WorkoutOfTheDay', (wod) => {
            me.setState({wod: wod});            
        });
    }
    
    render() {
        let wod = this._getWOD();
        return (
            <Panel header="Workout of the Day">
                {wod}
            </Panel>
        )
    } 
    
    _getWOD() {
        if (this.state.wod.length === 0) {
            return(<div>Select some exercises from the list below</div>);
        }
        
        return this.state.wod.map((exercise_id) => {
            let exercise = dataManager.getExerciseById(exercise_id);
            return (
                <div key={exercise.id}>
                    <span>{exercise.name}</span>&nbsp;
                    {exercise.bodyParts.map(bodyPart =>
                        <span key={bodyPart.id} className="badge" style={{backgroundColor: bodyPart.color}}>{bodyPart.name}</span>
                    )}
                </div>
            );
        });        
    }
}

export default WorkoutOfTheDay;
