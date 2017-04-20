import * as random from 'random-guid';

class Events {
    static subscribers = [];
    
    constructor() {
        this.guid = random.randomGuid();
    }
    
    on(event_name, func) {
        let details = {
            guid: this.guid,
            event_name: event_name,
            func: func
        };
        
        // See if we have this subscriber already
        let subscriberIndex = Events.subscribers.findIndex((item) => {
            return (item.guid === this.guid && item.event_name === event_name);
        });
        
        if (subscriberIndex === -1) {
            Events.subscribers.push(details)
        }
        else {
            Events.subscribers[subscriberIndex] = details;
        }
    }
    
    off(event_name) {
        let subscriberIndex = Events.subscribers.findIndex((item) => {
            return (item.guid === this.guid && item.event_name === event_name);
        });
        
        if (subscriberIndex !== -1) {
            Events.subscribers.splice(subscriberIndex, 1);
        }
    }
    
    static trigger(event_name, data) {
        Events.subscribers.forEach((item) => {
            if (item.event_name === event_name) {
                item.func(data);
            }    
        });
    }
}

export default Events;
