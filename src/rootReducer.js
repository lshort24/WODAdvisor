/**
 * Redux Reducer
 */
import {combineReducers} from 'redux';
import reducer from './wod';
import choicesReducer from './choicesReducer';
import exerciseReducer from './exerciseReducer';
import scoresReducer from './scoresReducer';

const rootReducer = combineReducers({
    wod: reducer,
    choices: choicesReducer,
    exercises: exerciseReducer,
    scores: scoresReducer
});

export default rootReducer;