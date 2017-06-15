/**
 * Redux Reducer
 */
import {combineReducers} from 'redux';
import wodReducer from './modules/wod/index';
import choicesReducer from './modules/choices/index';
import exerciseReducer from './modules/exercises/index';
import scoresReducer from './modules/scores/index';

export default combineReducers({
    wod: wodReducer,
    choices: choicesReducer,
    exercises: exerciseReducer,
    scores: scoresReducer
});