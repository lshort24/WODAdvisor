import * as data from './Data';
import Events from './Events';
import Moment from "moment";

export let getBodyPartById = function(id) {
   let bodyPartRecord = data.bodyParts.find((record) => {
      return record[0] === id;
   });

   if (!bodyPartRecord) {
      throw Error(`Body part with id ${id} was not found.`);
   }

   return {
      id: id,
      name: bodyPartRecord[1],
      color: bodyPartRecord[2]
   }
};

export let getBodyParts = function(exerciseId) {
   return data.exerciseBodyPart.filter((exerciseBodyPart) => {
      return exerciseBodyPart[0] === exerciseId;
   }).map((exerciseBodyPart) => {
      return getBodyPartById(exerciseBodyPart[1]);
   });
};

export let getExerciseById = function(id) {
   let exerciseRecord = data.exercises.find((record) => {
      return record[0] === id;
   });

   if (!exerciseRecord) {
      throw Error(`Exercise with id ${id} was not found.`);
   }

   return {
      id: id,
      name: exerciseRecord[1],
      bodyParts: getBodyParts(id)
   };
};


export let getHistoryById = function(id) {
   let entryRecord = data.history.find((record) => {
      return record[0] === id;
   });

   if (!entryRecord) {
      throw Error(`Entry with id ${id} was not found.`);
   }

   let now = new Moment();
   let date = new Moment(entryRecord[1]);
   return {
      id: id,
      date: entryRecord[1],
      exercise: getExerciseById(entryRecord[2]),
      daysAgo: now.diff(date, 'days')
   };
};

export let getHistory = function() {
   return data.history;
};

export let getWOD = function() {
   return data.workoutOfTheDay.map((exerciseId) => {
      return getExerciseById(exerciseId);
   });
};

export let addToWOD = function(exerciseId) {
   if (data.workoutOfTheDay.indexOf(exerciseId) < 0) {
      data.workoutOfTheDay.push(exerciseId);
      Events.trigger('wodChange', data.workoutOfTheDay);
   }
};

export let removeFromWOD = function(exerciseId) {
   let index = data.workoutOfTheDay.indexOf(exerciseId);
   if (index >= 0) {
      data.workoutOfTheDay.splice(index, 1);
      Events.trigger('wodChange', data.workoutOfTheDay);
   }
};