class Contact {
    constructor(contactId, contactFirstName, contactLastName, contactEmailAddress, contactNotes, contactCreatedDateTime, contactLastEditedDateTime) {
        this.id = contactId;
        this.firstName = contactFirstName;
        this.lastName = contactLastName;
        this.emailAddress = contactEmailAddress;
        this.notes = contactNotes;
        this.createdDateTime = contactCreatedDateTime;
        this.lastEditedDateTime = contactLastEditedDateTime;
    }
}

module.exports = Contact;
