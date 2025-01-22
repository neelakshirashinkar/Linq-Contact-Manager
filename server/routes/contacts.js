import express from 'express';
import { contactData } from '../data/index.js';
import helper from '../helper.js'; 

const router = express.Router();

router.get('/contacts', async (req, res) => {
  try {
    const allContacts = await contactData.getAll();
    res.status(200).json(allContacts);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/contacts', async (req, res) => {
  const { name, email } = req.body;
  try {
    helper.stringCheck(name, 'Name');
    helper.emailCheck(email);
    const newContact = await contactData.addContact(name, email);
    res.status(201).json(newContact);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/contacts/:id', async (req, res) => {
  const contactId = req.params.id;
  try {
    if (!contactId) throw 'Contact ID is required'; 
    const result = await contactData.deleteContact(contactId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/contacts/search', async (req, res) => {
  const { query, field } = req.query;
  try {
   
    if (!query || !field) throw 'Query and field are required';
    helper.stringCheck(query, 'Query'); 
    helper.stringCheck(field, 'Field'); 

    const results = await contactData.searchContacts(query, field);
    res.status(200).json(results);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
