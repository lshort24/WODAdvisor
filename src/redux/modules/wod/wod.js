import * as dataManager from '../../../services/data_manager';

/**
 * Actions
 */
const SELECT_PLUS = 'wodadvisor/wod/SELECT_PLUS';
const SELECT_MINUS = 'wodadvisor/wod/SELECT_MINUS';
const SAVE_WORKOUT = 'wodadvisor/wod/SAVE_WORKOUT';

export const actionTypes = {
    SELECT_PLUS,
    SELECT_MINUS,
    SAVE_WORKOUT
};

/**
 * Reducer
 */
export default function WodReducer(state, action) {
    if (typeof state === 'undefined') {
        
        return {
            wod: dataManager.loadWOD(),
            recommendations: dataManager.getRecommendations()
        };
    }

    let new_wod = state.wod;
    
    switch (action.type) {
        case SELECT_PLUS:
            // add the exercise specified by the payload to the wod
            if (!state.wod.find(exercise => exercise.id === action.payload.id)) {
                new_wod = [...state.wod, action.payload];

                // Save our state to local storage
                dataManager.saveWOD(new_wod);
            }
            
            return {
                ...state,
                wod: new_wod
            };

        case SELECT_MINUS:
            // remove the exercise specified by the payload from the wod
            const wod_index = state.wod.findIndex(exercise => exercise.id === action.payload.id);
            if (wod_index >= 0) {
                new_wod = [
                    ...state.wod.slice(0, wod_index),
                    ...state.wod.slice(wod_index + 1)
                ];

                // Save our state to local storage
                dataManager.saveWOD(new_wod);                
            }
            
            return {
                ...state,
                wod: new_wod
            };

        case SAVE_WORKOUT:
            dataManager.saveWorkout(action.payload);
            dataManager.saveWOD([]);
            
            return {
                ...state,
                wod: [],
                recommendations: dataManager.getRecommendations()
            };

        default:
            break;
    }

    return state;
}

/**
 * Action Creators
 */
function selectPlus (exercise) {
    return {
        type: SELECT_PLUS,
        payload: exercise
    };
}

function selectMinus(exercise) {
    return {
        type: SELECT_MINUS,
        payload: exercise
    };
}

function saveWorkout(wod) {
    return {
        type: SAVE_WORKOUT,
        payload: wod
    };
}

export const actionCreators = {
    selectPlus,
    selectMinus,
    saveWorkout
};

/**
 * Selectors
 */
const selectChoices = state => {
    return state.recommendations.filter(exercise => {
        // return true if the exercise id is not already in the wod
        return !state.wod.find(exercise2 => exercise2.id === exercise.id);
    })
};

export const selectors = {
    selectChoices
};
