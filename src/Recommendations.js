import React from 'react';
import * as controller from './WODAdvisorController';
import * as dataManager from './DataManager';
import CheckBox from './CheckBox';

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

      return (
         <div>
            <h2>Workout of the Day</h2>
            {wod.map(exercise =>
               <div key={exercise.id}>
                  <span>{exercise.name}</span>
               </div>
            )}
            <h2>Recommendations</h2>
            {recommendations.map(entry =>
               <div key={entry.id}>
                  <CheckBox update={this.update.bind(this, entry.exercise.id)}
                            checked={this.state.wod.find(exercise => exercise.id === entry.exercise.id)} />
                  {entry.exercise.name}&nbsp;
                  {entry.exercise.bodyParts.map(tag =>
                     <span key={tag.id}>{tag.name}&nbsp;</span>
                  )}
               </div>
            )}
         </div>
      )
   }
}

export default Recommendations;
