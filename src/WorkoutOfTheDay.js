import React from 'react';
import {Panel, Button} from 'react-bootstrap';
import * as dataManager from './DataManager';
import Events from './Events';

class WorkoutOfTheDay extends React.Component {
    constructor() {
        super();
        
        this.state = {
            wod: []
        };
        
        this.events = new Events();
    }
    
    componentWillMount() {
        this.setState({
            wod: dataManager.getWOD()
        });
        
        this.events.on('wodChange', (wod) => {
            this.setState({wod: wod});            
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
    
    save() {
        dataManager.saveWorkout(this.state.wod); 
    }

    _getWOD() {
        if (this.state.wod.length === 0) {
            return (<div>Select some exercises from the list below</div>);
        }

        let wod = this.state.wod.map((exercise_id) => {
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
                    onClick={this.save.bind(this)}>
                Save Workout
            </Button>
        </div>
    }
}

export default WorkoutOfTheDay;
