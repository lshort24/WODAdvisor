import * as dataManager from '../../../services/DataManager';

export default function reducer(state) {
    if (typeof state === 'undefined') {
        return dataManager.getExerciseLookup();
    }

    return state;
}