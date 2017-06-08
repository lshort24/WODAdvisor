/**
 * Redux Reducer
 */
import * as dataManager from './DataManager';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const stateManager = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            save: false,
            wod: []
        };
    }
    
    let new_state = {
        save: false,
        save_wod: null,
        wod: []
    };
    
    switch (action.type) {
        case 'INIT':
            new_state.wod = dataManager.getWOD();
            break;
        
        case 'ADD_TO_WOD':
            validateWODIndex(action.value);
            
            new_state.wod = [...state.wod, action.value];
            break;
        
        case 'REMOVE_FROM_WOD':
            validateWODIndex(action.value);
            
            let pos = state.wod.indexOf(action.value);
            if (pos >= 0) {
                new_state.wod = [
                    ...state.wod.slice(0, pos),
                    ...state.wod.slice(pos + 1)
                ];
            }
            break;
        
        case 'SAVE_WORKOUT':
            new_state = {
                save: true,
                save_wod: state.wod,
                wod: []
            };
            break;
            
        default:
            break;
    }
    
    return new_state;
};

function validateWODIndex(index) {
    if (!/^[0-9]+$/.test(index) || ~~index <= 0) {
        throw new Error(`Invalid WOD index ${index}`);
    }
}

const testAdd = () => {
    const stateBefore = {
        wod: []
    };
    const action = {
        type: 'ADD_TO_WOD',
        value: 1
    };
    const stateAfter = {
        save: false,
        save_wod: null,
        wod: [1]
    };
    
    deepFreeze(stateBefore);
    deepFreeze(action);

    //noinspection JSUnresolvedFunction
    expect(
        stateManager(stateBefore, action)
    ).toEqual(stateAfter);
};

const testRemove = () => {
    const stateBefore = {
        wod: [1, 2, 3]
    };
    const action = {
        type: 'REMOVE_FROM_WOD',
        value: 2
    };
    const stateAfter = {
        save: false,
        save_wod: null,
        wod:[1, 3]
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    //noinspection JSUnresolvedFunction
    expect(
        stateManager(stateBefore, action)
    ).toEqual(stateAfter);
};

const testSaveWorkout = () => {
    const stateBefore = {
        wod: [1, 2, 3]
    };
    const action = {
        type: 'SAVE_WORKOUT'
    };
    const stateAfter = {
        save: true,
        save_wod: [1, 2, 3],
        wod:[]
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    //noinspection JSUnresolvedFunction
    expect(
        stateManager(stateBefore, action)
    ).toEqual(stateAfter);
};

testAdd();
testRemove();
testSaveWorkout();

console.info('Tests passed!');

export default stateManager;