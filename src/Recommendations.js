import React from 'react';
import * as controller from './WODAdvisorController';
import * as dataManager from './DataManager';
import CheckBoxButton from './CheckBoxButton';
import {Panel} from 'react-bootstrap';

class Recommendations extends React.Component {
   constructor() {
      super();
      this.state = {
         wod: controller.getWOD(),
         recommendations: controller.getRecommendations()
      }
   }

   update(exerciseId, checked) {
      if (checked) {
         let wod = this.state.wod;
         let found = wod.find((exercise) => {
            return exercise.id === exerciseId
         });

         if (!found) {
            let exercise = dataManager.getExerciseById(exerciseId);
            wod.push(exercise);
            this.setState({wod});
         }
      }
      else {
         let wod = this.state.wod.filter((exercise) => {
            return exercise.id !== exerciseId;
         });
         this.setState({wod});
      }
   }


   render() {
      let recommendations = this.state.recommendations;
      let wod = this.state.wod;
      
      let wod_html = '';
      if (wod.length === 0) {
         wod_html = <div>Select some exercises from the list below</div>
      }
      else {
         wod_html = wod.map(exercise =>
            <div key={exercise.id}>
               <span>{exercise.name}</span>&nbsp;
               {exercise.bodyParts.map(bodyPart =>
                  <span key={bodyPart.id} className="badge" style={{backgroundColor: bodyPart.color}}>{bodyPart.name}</span>
               )}
            </div>
         )
      }
   
      return (
         <div>
            <Panel header="Workout of the Day">
               {wod_html}
            </Panel>

            <Panel header="Recommendations">
               {recommendations.map(entry =>
                  <div key={entry.id}>
                     <CheckBoxButton update={this.update.bind(this, entry.exercise.id)}
                                     checked={this.state.wod.find(exercise => exercise.id === entry.exercise.id)} />
                     {entry.exercise.name}&nbsp;
                     {entry.exercise.bodyParts.map(bodyPart =>
                        <span key={bodyPart.id} className="badge" style={{backgroundColor: bodyPart.color}}>{bodyPart.name}&nbsp;</span>
                     )}
                  </div>
               )}
            </Panel>
         </div>
      )
   }
}

export default Recommendations;
