export const selectPlus = (exercise) => {
    return {
        type: 'SELECT_PLUS',
        payload: exercise
    };
};

export const selectMinus = (exercise) => {
    return {
        type: 'SELECT_MINUS',
        payload: exercise
    };
};

export const saveWorkout = (wod) => {
    return {
        type: 'SAVE_WORKOUT',
        payload: wod
    };
};
