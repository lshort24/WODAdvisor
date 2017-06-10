import Moment from "moment";

const exercises = [
    [1, 'Shoulder Press'],
    [2, 'Back Raises'],
    [3, 'Wall Balls'],
    [4, 'Sit-ups'],
    [5, 'Air Squats'],
    [6, 'Dead Lifts'],
    [7, 'Dips'],
    [8, 'Pull-ups'],
    [9, 'Push-ups'],
    [10, 'Squats'],
    [11, 'Cleans'],
    [12, 'Rowing'],
    [13, 'Kettle Bell Swings'],
    [14, 'Hamstring Pulls']
];

const bodyParts = [
    [1, 'shoulders',  '#f45628'], /* orange */
    [2, 'lower-back', '#3c38e8'], /* royal blue */
    [3, 'quads',      '#b2515b'], /* rose */
    [4, 'abs',        '#c11c59'], /* berry */
    [5, 'triceps',    '#630436'], /* magenta */
    [6, 'upper-back', '#395992'], /* slate blue */
    [7, 'chest',      '#f8829e'], /* pink */
    [8, 'back',       '#074739'], /* dark green */
    [9, 'arms',       '#986435'], /* brown */
    [10, 'core',      '#00bfff'], /* aqua */
    [11, 'hamstrings','#483D8B']  /* purple */
];

const exerciseBodyPart = [
    [1, 1],
    [2, 2],
    [3, 1],
    [3, 3],
    [4, 4],
    [5, 3],
    [6, 2],
    [7, 5],
    [8, 6],
    [8, 9],
    [9, 7],
    [9, 9],
    [10, 3],
    [11, 8],
    [11, 9],
    [12, 8],
    [13, 10],
    [14, 11]
];

/*
const history = [
    [1, '2017-02-04', 1],
    [2, '2017-02-04', 2],
    [3, '2017-02-04', 3],
    [4, '2017-02-02', 4],
    [5, '2017-02-02', 5],
    [6, '2017-02-02', 6],
    [7, '2017-01-30', 7],
    [8, '2017-01-30', 8],
    [9, '2017-01-30', 9],
    [10, '2017-01-21', 6],
    [11, '2017-01-21', 1],
    [12, '2017-02-18', 10],
    [13, '2017-02-18', 11],
    [14, '2017-02-18', 2],
    [15, '2017-02-18', 4],
    [16, '2017-03-11', 10],
    [17, '2017-03-11', 12],
    [18, '2017-03-11', 13],
    [19, '2017-03-18', 6],
    [20, '2017-03-18', 14],
    [21, '2017-03-18', 9]
];
*/

export const getBodyPartById = function (id) {
    const bodyPartRecord = bodyParts.find((record) => {
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

export const getBodyParts = function (exerciseId) {
    return exerciseBodyPart.filter((exerciseBodyPart) => {
        return exerciseBodyPart[0] === exerciseId;
    }).map((exerciseBodyPart) => {
        return getBodyPartById(exerciseBodyPart[1]);
    });
};


export const getExerciseById = function (id) {
    const exerciseRecord = exercises.find((record) => {
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


export const getExercises = function () {
    return exercises.map((exerciseRecord) => {
        return getExerciseById(exerciseRecord[0]);
    });
};


export const getHistory = function () {
    //return history;

    //localStorage.removeItem('history');
    const historyJSON = localStorage.getItem('history');
    if (historyJSON) {
        return JSON.parse(historyJSON);
    }

    return [];
};

export const getExerciseHistory = function () {
    const now = new Moment();
    const base_date_string = '2017-06-08';   // Date to use for new exercises so they will appear at the top of the list.
    const base_date = new Moment(base_date_string);
    
    // Sort history by date - from newest to oldest
    const sorted_history = getHistory().sort((a, b) => {
        const aDate = new Moment(a[1]);
        const bDate = new Moment(b[1]);
        return bDate.diff(aDate);
    });

    // Build a list of exercises based on the latest history entry for each exercise
    let haveLastEntryForExercise = [];
    let exercises = sorted_history.filter(historyRecord => {
        const exerciseId = historyRecord[2];
        if (!haveLastEntryForExercise[exerciseId]) {
            haveLastEntryForExercise[exerciseId] = true;
            return true;
        }
        return false;
    });
    
    // Now expand the info to an object. Set the id to the id of the exercise
    exercises = exercises.map(historyRecord => {
        const date = new Moment(historyRecord[1]);
        return {
            id: historyRecord[2],
            date: historyRecord[1],
            exercise: getExerciseById(historyRecord[2]),
            timeAgo: now.diff(date, 'seconds')
        }
    });

    // Add any exercises that are missing with a date of today
    getExercises().forEach((exercise) => {
        const match = exercises.find((history) => {
            return history.exercise.id === exercise.id;
        });
        if (!match) {
            
            exercises.push({
                id: exercise.id,
                date: base_date_string,
                exercise: exercise,
                timeAgo: now.diff(base_date, 'seconds')
            });
        }
    });
    
    return exercises;
};


export const saveWOD = function(wod) {
    if (wod) {
        const wodString = JSON.stringify(wod);
        localStorage.setItem('wod', wodString);
    }
    else {
        localStorage.removeItem('wod');
    }
};



export const saveWorkout = function (wod) {
    const history = getHistory();
    const now = new Moment();
    
    let lastHistoryId = 0;
    if (history && history.length > 0) {
        lastHistoryId = history[history.length-1][0];
        if (!Number.isInteger(lastHistoryId)) {
            throw new Error(`ID '${lastHistoryId}' is not a valid id.`);
        }
    }
    
    wod.forEach(exercise_id => {
        lastHistoryId++;
        history.push([lastHistoryId, now.format(), exercise_id]);   
    });
    
    const historyJSON = JSON.stringify(history);
    localStorage.setItem('history', historyJSON);
};

export const getWOD = function() {
    const wodJSON = localStorage.getItem('wod');
    if (wodJSON) {
        return JSON.parse(wodJSON);
    }

    return [];
};  


export const getRecommendations = function() {
    // Start off with a list of all exercises and the date they were last performed.
    let recommendations = getExerciseHistory();

    // Determine the priority for body parts
    let priority = [];
    recommendations.forEach((entry) => {
        entry.exercise.bodyParts.forEach((bodyPart) => {
            if (!priority[bodyPart.id] || entry.timeAgo < priority[bodyPart.id]) {
                priority[bodyPart.id] = entry.timeAgo;
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

        entry.bodyPartScore = maxBodyPartScore;
        return entry;
    });

    // Sort first by body part score then by timeAgo in descending order
    // a == b => 0
    // a < b  => positive value - a should come after b
    // a > b  => negative value - a should come before b
    recommendations = recommendations.sort((a, b) => {
        if (a.bodyPartScore === b.bodyPartScore) {
            // sort by timeAgo
            return b.timeAgo - a.timeAgo;
        }

        // sort by body part score
        return b.bodyPartScore - a.bodyPartScore;
    });

    return recommendations;    
};



