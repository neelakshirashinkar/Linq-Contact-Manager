import { ObjectId } from 'mongodb';
import { contacts } from '../config/mongoCollections.js';
import helper from '../helper.js';

const exportedMethods = {
  async addContact(name, email) {
    helper.stringCheck(name, 'Name');
    helper.emailCheck(email);
    const contactCollection = await contacts();
    const existingContact = await contactCollection.findOne({ email });
    
    if (existingContact) {
      throw `A contact with the email ${email} already exists.`;
    }
    
    const newContact = {
      name,
      email,
    };

    const insertResult = await contactCollection.insertOne(newContact);
    if (insertResult.acknowledged) {
      return { _id: insertResult.insertedId, ...newContact };
    } else {
      throw 'Error inserting new contact';
    }
  },

  async deleteContact(id) {
    if (!id) throw 'Contact ID is required';
    const contactCollection = await contacts();
    const deleteResult = await contactCollection.deleteOne({ _id: new ObjectId(id) });
    if (deleteResult.deletedCount === 0) throw `Contact with ID ${id} does not exist`;
    return { success: true, message: 'Contact successfully deleted' };
  },

  async getAll() {
    const contactCollection = await contacts();
    const allContacts = await contactCollection.find({}).toArray();
    return allContacts;
  },

  async searchContacts(query, field) {
    helper.stringCheck(query, 'Query');
    helper.stringCheck(field, 'Field');

    if (field !== 'name' && field !== 'email') {
      throw 'Search field must be "name" or "email"';
    }
    
    const contactCollection = await contacts();
    const searchField = field === "name" ? "name" : "email";
    const searchRegex = new RegExp(query, "i");
    const results = await contactCollection.find({ [searchField]: searchRegex }).toArray();
    return results;
  }
};

export default exportedMethods;
