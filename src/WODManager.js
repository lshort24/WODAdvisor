import * as dataManager from './DataManager';

class WODManager {
    constructor() {
        this.workoutOfTheDay = []; 
        this.subscribers = {};
    }
    
    on(event, id, func) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = {};
        }
        this.subscribers[event][id] = func;
    }
    
    off(event, id) {
        delete(this.subscribers[event][id]);    
    }
    
    trigger(event) {
        if (this.subscribers[event]) {
            for (let id in this.subscribers[event]) {
                if (this.subscribers[event].hasOwnProperty(id)) {
                    let func = this.subscribers[event][id];
                    func(this.workoutOfTheDay);                    
                }
            }
        }        
    }
    
    getWOD() {
        return this.workoutOfTheDay.map((exerciseId) => {
            return dataManager.getExerciseById(exerciseId);
        });
    }

    add (exerciseId) {
        if (this.workoutOfTheDay.indexOf(exerciseId) < 0) {
            this.workoutOfTheDay.push(exerciseId);
            this.trigger('change');
        }
    }

    remove (exerciseId) {
        let index = this.workoutOfTheDay.indexOf(exerciseId);
        if (index >= 0) {
            this.workoutOfTheDay.splice(index, 1);
            this.trigger('change');
        }
    }
}

export default WODManager;