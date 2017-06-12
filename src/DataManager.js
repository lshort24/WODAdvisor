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

export const getExerciseLookup = function() {
    let lookup = [];
    exercises.forEach(function(exercise) {
        let id = exercise[0];
        lookup[id] = getExerciseById(id);
    });
    return lookup;
};

export const getHistory = function () {
    //localStorage.removeItem('history');
    const historyJSON = localStorage.getItem('history');
    if (historyJSON) {
        return JSON.parse(historyJSON);
    }

    return [];
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

export const loadWOD = function() {
    const wodJSON = localStorage.getItem('wod');
    if (wodJSON) {
        return JSON.parse(wodJSON);
    }

    return [];
};  

export const loadChoices = function () {
    const wod = loadWOD();
    return exercises.map(record => {
        return record[0];   
    }).filter(id => wod.indexOf(id) < 0)
};



export function scoreRecommendations(ids) {
    if (ids && ids.length === 0) {
        // Nothing to do
        return ids;
    }
    
    // Build a list of exercises with the last time they were done
    let exercise_last_workout = [];
    const now = new Moment();
    
    getHistory().forEach(record => {
        const exercise_id = record[2];
        if (!ids || ids.find(id => id === exercise_id)) {
            // this is one that we are interested in
            const date = new Moment(record[1]);
            const timeAgo = now.diff(date, 'seconds');
            
            if (!exercise_last_workout[exercise_id]) {
                exercise_last_workout[exercise_id] = getExerciseById(exercise_id);
                exercise_last_workout[exercise_id].timeAgo = timeAgo;
                exercise_last_workout[exercise_id].date = record[1];
            }
            else if (timeAgo < exercise_last_workout[exercise_id].timeAgo) {
                exercise_last_workout[exercise_id].timeAgo = timeAgo;
                exercise_last_workout[exercise_id].date = record[1];
            }
        }
    });
    
    // If there are any exercises that have not been done yet, set their last date to some old date
    exercises.forEach(record => {
        const exercise_id = record[0];
        if ((!ids || ids.find(id => id === exercise_id)) && !exercise_last_workout[exercise_id]) {
            exercise_last_workout[exercise_id] = getExerciseById(exercise_id);
            exercise_last_workout[exercise_id].timeAgo = now.diff(new Moment('2017-06-01'), 'seconds');
        }
    });

    // Convert the exercise list from an object to an array of choices
   console.log('Last exercise time ago');
    let recommendations = Object.keys(exercise_last_workout).map(exercise_id => {
        console.log(exercise_last_workout[exercise_id].name, exercise_last_workout[exercise_id].date, exercise_last_workout[exercise_id].timeAgo);
        return exercise_last_workout[exercise_id];    
    });
    
    // Determine the score for body parts. The score is higher for exercises that have not been done recently
    let bodyPartScores = [];
    recommendations.forEach((recommendation) => {
        recommendation.bodyParts.forEach((bodyPart) => {
            if (!bodyPartScores[bodyPart.id] || recommendation.timeAgo < bodyPartScores[bodyPart.id]) {
                bodyPartScores[bodyPart.id] = recommendation.timeAgo;
            }
        })
    });

    // Use the maximum body part score for each exercise
    recommendations = recommendations.map(recommendation => {
        let maxBodyPartScore = 0;
        recommendation.bodyParts.forEach((bodyPart) => {
            console.log('Body part score for ' + recommendation.name + ': ' + bodyPart.name + '=' + bodyPartScores[bodyPart.id]);
            if (bodyPartScores[bodyPart.id] > maxBodyPartScore) {
                if (maxBodyPartScore !== 0) {
                    console.log(`Overriding body part score of ${maxBodyPartScore} because ${bodyPart.name} has a priority of ${bodyPartScores[bodyPart.id]}.`);
                }
                maxBodyPartScore = bodyPartScores[bodyPart.id];
            }
        });

        return Object.assign({}, recommendation, {bodyPartScore: maxBodyPartScore})
    });
    
    return recommendations;
}

export function sortRecommendations(ids) {
    const recommendations = scoreRecommendations(ids);
    
    // Sort first by body part score then by timeAgo in descending order
    // a == b => 0
    // a < b  => positive value - a should come after b
    // a > b  => negative value - a should come before b
    let choices = recommendations.sort((a, b) => {
        if (a.bodyPartScore === b.bodyPartScore) {
            // sort by timeAgo
            return b.timeAgo - a.timeAgo;
        }

        // sort by body part score
        return b.bodyPartScore - a.bodyPartScore;
    }); 
    
    // just return the ids
    return choices.map(choice => choice.id);
}



