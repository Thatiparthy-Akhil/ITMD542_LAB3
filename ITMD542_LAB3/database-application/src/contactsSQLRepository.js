const path = require('node:path');
const betterSqlite3 = require('better-Sqlite3');
const Contact = require('./Contact');

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'),{verbose: console.log });

const createstmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,contactFirstName TEXT,contactLastName TEXT,contactEmailAddress TEXT DEFAULT '',contactNotes TEXT DEFAULT '',contactCreatedDateTime TEXT DEFAULT CURRENT_TIMESTAMP,contactLastEditedDateTime TEXT DEFAULT CURRENT_TIMESTAMP)");
createstmt.run();

const contactRepo = {
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM contacts");
        const rows = stmt.all();
        let contacts =[];
        rows.forEach((row)=>{
            const aContact = new Contact(row.id,row.contactFirstName,row.contactLastName,row.contactEmailAddress,row.contactNotes,row.contactCreatedDateTime,row.contactLastEditedDateTime);
            contacts.push(aContact);
        });  
        return contacts; 
    },
    findById: (id) => {

        const stmt = db.prepare("SELECT * FROM contacts WHERE id= ?");
        const row = stmt.get(id);

        return new Contact(row.id,row.contactFirstName,row.contactLastName,row.contactEmailAddress,row.contactNotes,row.contactCreatedDateTime,row.contactLastEditedDateTime);
        
    },  

    create: (contact) => {
        const stmt = db.prepare("INSERT INTO contacts (contactFirstName, contactLastName, contactEmailAddress, contactNotes) VALUES (?,?,?,?)");
        const createContactResult = stmt.run(contact.firstName, contact.lastName, contact.emailAddress, contact.notes);
        console.log(`contact created with id:${createContactResult.lastInsertRowid}`); 
    },
    
    
    deleteById: (id) => {

        const stmt = db.prepare("DELETE FROM contacts WHERE id= ?");;
        const deleteContactResult = stmt.run(id);
        console.log(`rows deleted:  ${deleteContactResult.changes}`); 

    },
    update: (contact) => {
        try {
            const stmt = db.prepare(`
                UPDATE contacts 
                SET 
                    contactFirstName = ?,
                    contactLastName = ?,
                    contactEmailAddress = ?,
                    contactNotes = ?,
                    contactLastEditedDateTime = ? 
                WHERE 
                    id = ?`
            );
    
            const updateContactResult = stmt.run(
                contact.contactFirstName,
                contact.contactLastName,
                contact.contactEmailAddress,
                contact.contactNotes,
                contact.contactLastEditedDateTime,
                contact.id
            );
    
            console.log(`rows updated:  ${updateContactResult.changes}`);
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    }
    
};

module.exports = contactRepo;
