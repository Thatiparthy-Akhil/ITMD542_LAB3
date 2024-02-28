const crypto = require('node:crypto');
const fs = require('fs').promises; // Import file system module
const path = require('path');

const dataFilePath = path.join(__dirname, 'contacts.json'); // Path to JSON data file

let contacts = []; // Initialize empty array to store contacts

// Load contacts data from JSON file
const loadData = async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    contacts = JSON.parse(data);
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

// Save contacts data to JSON file
const saveData = async () => {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

const repo = {
  findAll: () => contacts,
  findById: (id) => contacts.find(contact => contact.id === id),
  create: (contact) => {
    const newContact = {
      id: crypto.randomUUID(),
      firstName: contact.firstName,
      lastName: contact.lastName,
      emailAddress: contact.emailAddress,
      notes: contact.notes,
      createdDate: new Date().toISOString()
    };
    contacts.push(newContact);
    saveData(); // Save data after creating new contact
  },
  deleteById: (id) => {
    contacts = contacts.filter(contact => contact.id !== id);
    saveData(); // Save data after deleting contact
  },
  update: (updatedContact) => {
    contacts = contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact));
    saveData(); // Save data after updating contact
  }
};

// Load initial data
loadData();

module.exports = repo;
