import * as dataManager from './DataManager';
import {SELECT_PLUS, SELECT_MINUS, SAVE_WORKOUT} from './wod';

export default function choicesReducer (state, action) {
    if (typeof state === 'undefined') {
        const choices = dataManager.loadChoices();
        return dataManager.sortRecommendations(choices);
    }

    switch (action.type) {
        case SELECT_PLUS:
            const pos = state.indexOf(action.payload.id);
            if (pos >= 0) {
                return [
                    ...state.slice(0, pos),
                    ...state.slice(pos + 1)
                ]
            }
            break;
        
        case SELECT_MINUS:
            const choices = [...state, action.payload.id];
            return dataManager.sortRecommendations(choices);

        case SAVE_WORKOUT:
            return dataManager.sortRecommendations();
        
        default:
            break;
    }
    
    return state;
}