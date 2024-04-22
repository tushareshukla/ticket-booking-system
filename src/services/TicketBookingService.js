// src/services/TicketBookingService.js

const EventEmitter = require('events');

class TicketBookingService extends EventEmitter {
  constructor(eventManager) {
    super();
    this.eventManager = eventManager;
  }

  // Method to book tickets for an event
  async bookTickets(eventId, numTickets) {
    // Find the event by ID
    const event = this.eventManager.findEventById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    const success = event.bookTickets(numTickets);
    if (success) {
      this.emit('booking', eventId, numTickets);
    }
    return success;
  }

  // Method to cancel a booking
  async cancelBooking(eventId, numTickets) {
    // Find the event by ID
    const event = this.eventManager.findEventById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    const success = event.cancelBooking(numTickets);
    if (success) {
      this.emit('cancel', eventId, numTickets);
    }
    return success;
  }
}

module.exports = TicketBookingService;
