// src/cli.js

const readline = require('readline');
const Event = require('./models/Event');
const EventManager = require('./models/EventManager');
const TicketBookingService = require('./services/TicketBookingService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const eventManager = new EventManager();
const ticketBookingService = new TicketBookingService(eventManager);

function displayEvents() {
    // Get the list of events from the event manager
  const events = eventManager.listEvents();
  if (events.length === 0) {
    console.log('No events available.');
  } else {
    console.log('Available Events:');
    events.forEach(event => {
      console.log(`ID: ${event.getId()}, Name: ${event.getName()}, Date: ${event.getDate()}, Capacity: ${event.getCapacity()}, Tickets Booked: ${event.getTicketsBooked()}`);
    });
  }
}
async function bookTickets() {
    // Get the event ID and number of tickets to book from the user
    const eventId = await askQuestion('Enter event ID: ');
    const numTickets = parseInt(await askQuestion('Enter number of tickets to book: '));
    try {
      const success = await ticketBookingService.bookTickets(eventId, numTickets);
      if (success) {
        console.log('Tickets booked successfully.');
      } else {
        console.log('Failed to book tickets. Insufficient capacity or invalid event ID.');
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function cancelBooking() {
    // Get the event ID and number of tickets to cancel from the user
    const eventId = await askQuestion('Enter event ID: ');
    const numTickets = parseInt(await askQuestion('Enter number of tickets to cancel: '));
    try {
      const success = await ticketBookingService.cancelBooking(eventId, numTickets);
      if (success) {
        console.log('Booking canceled successfully.');
      } else {
        console.log('Failed to cancel booking. Invalid event ID or insufficient booked tickets.');
      }
    } catch (err) {
      console.log(err.message);
    }
  }

async function addEvent() {
    // Get event details from the user and create a new event
  const name = await askQuestion('Enter event name: ');
  const date = await askQuestion('Enter event date: ');
  const capacity = parseInt(await askQuestion('Enter event capacity: '));
  const event = new Event(generateUniqueId(), name, date, capacity);
  eventManager.addEvent(event);
  console.log('Event added successfully.');
}

function generateUniqueId() {
    // Generate a random alphanumeric ID
  return Math.random().toString(36).substr(2, 9);
}

async function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

async function main() {
    // Main function to display options and handle user input
  console.log('Welcome to the Ticket Booking System CLI');
  while (true) {
    console.log('\nOptions:');
    console.log('1. View available events');
    console.log('2. Add an event');
    console.log('3. Book tickets for an event');
    console.log('4. Cancel a booking');
    console.log('5. Exit');

    const option = parseInt(await askQuestion('Enter option: '));
    switch (option) {
        // Handle user input based on the selected option
      case 1:
        console.log('\nAvailable Events:');
         displayEvents();
        break;
      case 2:
        console.log('\nAdd Event:');
        await addEvent();
        break;
      case 3:
        console.log('\nBook Tickets:');
        await bookTickets(); // Call the function to book tickets
        break;
      case 4:
        console.log('\nCancel Booking:');
        await cancelBooking(); // Call the function to cancel booking
        break;
      case 5:
        rl.close();
        return;
      default:
        console.log('Invalid option. Please try again.');
    }
  }
}

main();
