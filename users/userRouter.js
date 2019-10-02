const express = require('express');

const router = express.Router();

const UserDB = require('./userDb')

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    UserDB.get().then(users => {
        res.status(200).json(users)
    }).catch(error =>
        res.status(500).json({error: `Server error could not get data error: ${error}`})
    )
});

router.get('/:id', (req, res) => {
    UserDB.getById(req.params.id).then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({Messgae: `user with given id does not exist`})
        }
    }).catch(error =>
        res.status(500).json({error: `Server error could not get data error: ${error}`})
    )
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    UserDB.getById(id)
    .then(user => {
        console.log(`user`, user)
        if(user) {
            UserDB.update(id, req.body)
           .then (response => {
               if (response === 1) {
                UserDB.getById(id)
                .then(updatedUser =>
                    res.status(200).json(updatedUser)
                )
               } else {
                   res.status(500).json({error: 'error user not correctly updated'})
               }
           }).catch (error =>
                res.status(500).json({error: `Server error could not update data error: ${error}`})
           )
        } else {
            res.status(404).json({Messgae: `user with given id does not exist`})
        }
    }).catch (error =>
        res.status(500).json({error: `Server error could not update data error: ${error}`})
    )
}); 

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
