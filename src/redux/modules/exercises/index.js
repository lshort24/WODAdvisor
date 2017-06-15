import * as dataManager from '../../../services/data_manager';

export default function reducer(state) {
    if (typeof state === 'undefined') {
        return dataManager.getExerciseLookup();
    }

    return state;
}