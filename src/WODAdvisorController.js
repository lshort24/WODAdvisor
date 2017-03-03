import * as dataManager from './DataManager';
import Moment from "moment";

export let getRecommendations = function() {
   let haveLastEntryForExercise = [];

   // Get the latest history entry for each exercise
   let recent_history = dataManager.getHistory().sort((a,b) => {
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
   }).sort((a,b) => {
      return b.score - a.score;
   });
};

export let getWOD = function() {
   return dataManager.getWOD();
};
