import * as dataManager from '../../../services/data_manager';

// Actions
export const SELECT_PLUS = 'wodadvisor/wod/SELECT_PLUS';
export const SELECT_MINUS = 'wodadvisor/wod/SELECT_MINUS';
export const SAVE_WORKOUT = 'wodadvisor/wod/SAVE_WORKOUT';

// Reducer
export default function reducer(state, action) {
    if (typeof state === 'undefined') {
        return dataManager.loadWOD();
    }

    let new_state = [];

    switch (action.type) {
        case SELECT_PLUS:
            new_state = [...state, action.payload.id];
            dataManager.saveWOD(new_state);
            return new_state;

        case SELECT_MINUS:
            const pos = state.indexOf(action.payload.id);
            if (pos >= 0) {
                new_state = [
                    ...state.slice(0, pos),
                    ...state.slice(pos + 1)
                ];
                dataManager.saveWOD(new_state);
                return new_state;
            }
            break;

        case SAVE_WORKOUT:
            dataManager.saveWorkout(action.payload);
            dataManager.saveWOD([]);
            return [];

        default:
            break;
    }

    return state;
}

// Action Creators
export function selectPlus (exercise) {
    return {
        type: SELECT_PLUS,
        payload: exercise
    };
}

export function selectMinus(exercise) {
    return {
        type: SELECT_MINUS,
        payload: exercise
    };
}

export function saveWorkout(wod) {
    return {
        type: SAVE_WORKOUT,
        payload: wod
    };
}
    

