/**
 * Redux Reducer
 */
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const rootReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            wod: [],
            choices: [],
            recommendations: []
        }
    }
    
    let wod = state.wod;
    let recommendations = state.recommendations;
    
    switch (action.type) {
        case 'INIT_WOD':
            wod = action.wod;
            recommendations = action.recommendations;
            break;
        
        case 'ADD_TO_WOD':
            validateWODIndex(action.value);
            
            wod = [...state.wod, action.value];
            break;
        
        case 'REMOVE_FROM_WOD':
            validateWODIndex(action.value);
            
            const pos = state.wod.indexOf(action.value);
            if (pos >= 0) {
                wod = [
                    ...wod.slice(0, pos),
                    ...wod.slice(pos + 1)
                ];
            }
            break;
        
        case 'SAVE_WORKOUT':
            wod = [];
            recommendations = action.recommendations;
            break;
            
        default:
            break;
    }
    
    return {
        wod: wod,
        choices: recommendations
            .map(recommendation => recommendation.id)
            .filter(id => wod.indexOf(id) < 0),
        recommendations: recommendations
    }
};

function validateWODIndex(index) {
    if (!/^[0-9]+$/.test(index) || ~~index <= 0) {
        throw new Error(`Invalid WOD index ${index}`);
    }
}

const testInit = () => {
    const stateBefore = {
        wod: [],
        choices: [],
        recommendations: []
    };
    const action = {
        type: 'INIT_WOD',
        wod: [1, 2],
        recommendations: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    };
    const stateAfter = {
        wod: [1, 2],
        choices: [3, 4, 5],
        recommendations: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    //noinspection JSUnresolvedFunction
    expect(
        rootReducer(stateBefore, action)
    ).toEqual(stateAfter);
};

const testAdd = () => {
    const stateBefore = {
        wod: [1, 3],
        choices: [2, 4, 5],
        recommendations: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    };
    const action = {
        type: 'ADD_TO_WOD',
        value: 2
    };
    const stateAfter = {
        wod: [1, 3, 2],
        choices: [4, 5],
        recommendations: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    };
    
    deepFreeze(stateBefore);
    deepFreeze(action);

    //noinspection JSUnresolvedFunction
    expect(
        rootReducer(stateBefore, action)
    ).toEqual(stateAfter);
};

const testRemove = () => {
    const stateBefore = {
        wod: [1, 2, 3],
        choices: [4, 5],
        recommendations: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    };
    const action = {
        type: 'REMOVE_FROM_WOD',
        value: 3
    };
    const stateAfter = {
        wod: [1, 2],
        choices: [3, 4, 5],
        recommendations: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    //noinspection JSUnresolvedFunction
    expect(
        rootReducer(stateBefore, action)
    ).toEqual(stateAfter);
};

const testSaveWorkout = () => {
    const stateBefore = {
        wod: [1, 3],
        choices: [2, 4, 5],
        recommendations: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    };
    const action = {
        type: 'SAVE_WORKOUT',
        recommendations: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    };
    const stateAfter = {
        wod: [],
        choices: [1, 2, 3, 4, 5],
        recommendations: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    //noinspection JSUnresolvedFunction
    expect(
        rootReducer(stateBefore, action)
    ).toEqual(stateAfter);
};

testInit();
testAdd();
testRemove();
testSaveWorkout();

console.info('Tests passed!');

export default rootReducer;