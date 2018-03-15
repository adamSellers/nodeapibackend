var express = require('express');
var router = express.Router();

//setup pg promise and DB
var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connString = process.env.DATABASE_URL;
var db = pgp(connString);

//api queries: get all contacts
function getAllContacts(req, res, next) {
    db.any('select * from salesforce.Contact')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'Success',
                    data: data,
                    message: 'Retreived all contacts'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

//api queries: get a single contact
function getSingleContact(req, res, next) {
    db.one('select * from salesforce.Contact where id = $1', parseInt(req.params.id))
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'Success',
                    data: data,
                    message: 'Retreived a single contact'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

//api queries: create a contact
function createContact(req, res, next) {
    db.none('insert into salesforce.Contact(FirstName, LastName, Email, MobilePhone) values ($FirstName, $LastName, $Email, $MobilePhone)',
req.body)
    .then(function() {
        res.status(200)
        .json({
            status: 'Success',
            message: 'Inserted a single contact'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

//api queries: update a contact
function updateContact(req, res, next) {
    db.one('update salesforce.Contact set FirstName=$1, LastName=$2, Email=$3, MobilePhone=$4 where Id=$5', 
        [req.body.FirstName, req.body.LastName, req.body.Email, req.body.MobilePhone, req.params.id])
        .then(function (data) {
            res.status(200)
            .json({
                status: 'Success',
                data: data,
                message: 'Updated one contact'
            });
        })
        .catch(function (err) {
            return next(err);
        });
}

//api queries: delete a contact
function deleteContact(req, res, next) {
    db.result('delete from salesforce.Contact where Id=$1', req.params.id)
        .then(function (result) {
            res.status(200)
            .json({
                status: 'Success',
                message: `Removed ${result.rowCount} Contact`
            });
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getAllContacts: getAllContacts,
    getSingleContact: getSingleContact,
    createContact: createContact,
    updateContact: updateContact,
    deleteContact: deleteContact
};