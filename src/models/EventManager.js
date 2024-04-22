// src/models/EventManager.js

class EventManager {
    constructor() {
      this.events = [];
    }
  
    // Method to add a new event
    addEvent(event) {
      this.events.push(event);
    }
  
    // Method to list all events
    listEvents() {
      return this.events;
    }
  
    // Method to find event by ID
    findEventById(id) {
      return this.events.find(event => event.getId() === id);
    }
  }
  
  module.exports = EventManager;
  