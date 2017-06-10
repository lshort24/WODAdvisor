import * as dataManager from './DataManager';

const scoresReducer = (state, action) => {
    let scores = {};
    const debug = true;
    
    if (!debug) {
        return scores;
    }
    
    if (typeof state === 'undefined' || action.type === 'SAVE_WORKOUT') {
        dataManager.scoreRecommendations().forEach(recommendation => {
            scores[recommendation.id] = {
                name: recommendation.name,
                bodyPartScore: recommendation.bodyPartScore,
                timeAgo: recommendation.timeAgo
            }
        });

        return scores;       
    }

    return state;
};

export default scoresReducer;
