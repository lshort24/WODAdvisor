import * as data from './Data';
import Moment from "moment";

export let getBodyPartById = function (id) {
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

export let getBodyParts = function (exerciseId) {
    return data.exerciseBodyPart.filter((exerciseBodyPart) => {
        return exerciseBodyPart[0] === exerciseId;
    }).map((exerciseBodyPart) => {
        return getBodyPartById(exerciseBodyPart[1]);
    });
};


export let getExerciseById = function (id) {
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


export let getExercises = function () {
    return data.exercises.map((exerciseRecord) => {
        return getExerciseById(exerciseRecord[0]);
    });
};


export let getHistory = function () {
    //return data.history;

    //localStorage.removeItem('history');
    let historyJSON = localStorage.getItem('history');
    if (historyJSON) {
        return JSON.parse(historyJSON);
    }

    return [];
};

export let getExerciseHistory = function () {
    // Sort history by date - from newest to oldest
    let sorted_history = getHistory().sort((a, b) => {
        let aDate = new Moment(a[1]);
        let bDate = new Moment(b[1]);
        return bDate.diff(aDate);
    });

    // Build a list of exercises based on the latest history entry for each exercise
    let haveLastEntryForExercise = [];
    let exercises = sorted_history.filter(historyRecord => {
        let exerciseId = historyRecord[2];
        if (!haveLastEntryForExercise[exerciseId]) {
            haveLastEntryForExercise[exerciseId] = true;
            return true;
        }
        return false;
    });
    
    // Now expand the info to an object. Set the id to the id of the exercise
    exercises = exercises.map(historyRecord => {
        let now = new Moment();
        let date = new Moment(historyRecord[1]);
        
        return {
            id: historyRecord[2],
            date: historyRecord[1],
            exercise: getExerciseById(historyRecord[2]),
            daysAgo: now.diff(date, 'days')
        }
    });

    // Add any exercises that are missing with a date of today
    getExercises().forEach((exercise) => {
        let match = exercises.find((history) => {
            return history.exercise.id === exercise.id;
        });
        if (!match) {
            let now = new Moment();
            exercises.push({
                id: exercise.id,
                date: now.format(),
                exercise: exercise,
                daysAgo: 0
            });
        }
    });
    
    return exercises;
};


export let saveWOD = function(wod) {
    if (wod) {
        let wodString = JSON.stringify(wod);
        localStorage.setItem('wod', wodString);
    }
    else {
        localStorage.removeItem('wod');
    }
};



export let saveWorkout = function (wod) {
    let history = getHistory();
    let now = new Moment();
    
    let lastHistoryId = 0;
    if (history && history.length > 0) {
        lastHistoryId = history[history.length-1].id;
    }
    
    wod.forEach(exercise_id => {
        lastHistoryId++;
        history.push([lastHistoryId, now.format(), exercise_id]);   
    });
    
    let historyJSON = JSON.stringify(history);
    localStorage.setItem('history', historyJSON);
};

export let getWOD = function() {
    let wodJSON = localStorage.getItem('wod');
    if (wodJSON) {
        return JSON.parse(wodJSON);
    }

    return [];
};    



