import * as dataManager from './DataManager';

const exerciseReducer = (state) => {
    if (typeof state === 'undefined') {
        return dataManager.getExerciseLookup();        
    }
    
    return state;
};

export default exerciseReducer;
