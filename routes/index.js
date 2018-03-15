var express = require('express');
var router = express.Router();

var db = require('./database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to the machine!' });
});


router.get('/api/v1/contacts', db.getAllContacts);
router.get('/api/v1/contacts/:id', db.getSingleContact);
router.post('/api/v1/contacts', db.createContact);
router.put('/api/v1/contacts/:id', db.updateContact);
router.delete('/api/v1/contacts/:id', db.deleteContact);

module.exports = router;
