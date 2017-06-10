/**
 * Redux Reducer
 */
import {combineReducers} from 'redux';
import wodReducer from './wodReducer';
import choicesReducer from './choicesReducer';
import exerciseReducer from './exerciseReducer';
import scoresReducer from './scoresReducer';

const rootReducer = combineReducers({
    wod: wodReducer,
    choices: choicesReducer,
    exercises: exerciseReducer,
    scores: scoresReducer
});

export default rootReducer;