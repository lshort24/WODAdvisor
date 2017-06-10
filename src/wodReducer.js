import * as dataManager from './DataManager';

const wodReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return dataManager.loadWOD();
    }

    let new_state = [];
    
    switch (action.type) {
        case 'SELECT_PLUS':
            new_state = [...state, action.payload.id];
            dataManager.saveWOD(new_state);
            return new_state;
        
        case 'SELECT_MINUS':
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
        
        case 'SAVE_WORKOUT':
            dataManager.saveWorkout(action.payload);
            dataManager.saveWOD([]);
            return [];

        default:
            break;
    }
    
    return state;
};

export default wodReducer;
    
    