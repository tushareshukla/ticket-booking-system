// src/models/Event.js

class Event {
    constructor(id, name, date, capacity) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.capacity = capacity;
      this.ticketsBooked = 0;
    }
  
    // Getter methods
    getId() {
      return this.id;
    }
  
    getName() {
      return this.name;
    }
  
    getDate() {
      return this.date;
    }
  
    getCapacity() {
      return this.capacity;
    }
  
    getTicketsBooked() {
      return this.ticketsBooked;
    }
  
    // Setter methods
    setName(name) {
      this.name = name;
    }
  
    setDate(date) {
      this.date = date;
    }
  
    setCapacity(capacity) {
      this.capacity = capacity;
    }
  
    setTicketsBooked(ticketsBooked) {
      this.ticketsBooked = ticketsBooked;
    }
  
    // Method to book tickets
    bookTickets(numTickets) {
      if (this.ticketsBooked + numTickets <= this.capacity) {
        this.ticketsBooked += numTickets;
        return true;
      } else {
        return false;
      }
    }
  
    // Method to cancel booking
    cancelBooking(numTickets) {
      if (this.ticketsBooked - numTickets >= 0) {
        this.ticketsBooked -= numTickets;
        return true;
      } else {
        return false;
      }
    }
  }
  
  module.exports = Event;
  