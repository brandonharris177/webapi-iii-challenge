const express = require('express');

const router = express.Router();

const UserDB = require('./userDb')

router.post('/', validateUser, (req, res) => {
    UserDB.insert(req.body)
    .then(newUser =>
        res.status(201).json(newUser)
    ).catch(error =>
        res.status(500).json({error: `Server error could not create user error: ${error}`})
    )
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

router.get('/:id', validateUserId, (req, res) => {
    UserDB.getById(req.params.id).then(user => {
            res.status(200).json(user)
    }).catch(error =>
        res.status(500).json({error: `Server error could not get data error: ${error}`})
    )
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id
    console.log('made it this far')
    UserDB.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts)
    }).catch(error =>
        res.status(500).json({error: `Server Error ${error}`})
    )
});

router.delete('/:id', validateUserId, (req, res) => {
    UserDB.getById(req.params.id)
    .then(user => {
        UserDB.remove(user)
        res.status(204).json({Message: 'user deleted'})
    }).catch(error =>
    res.status(500).json({error: `Server error, could not delete user error: ${error}`})
    )
});

router.put('/:id', validateUserId, (req, res) => {
    console.log('running validate userID')
    const id = req.params.id
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
}); 

//custom middleware

function validateUserId(req, res, next) {
    // console.log(`running validate user id`)
    const id = req.params.id
    // console.log(id)
    UserDB.getById(id)
    .then(user => {
        // console.log(`user`, user)
        if(user) {
            next();
        } else {
            res.status(404).json({Messgae: "invalid user id"})
        }
    }).catch (error =>
        res.status(500).json({error: `Server error: ${error}`})
    )
};

function validateUser(req, res, next) {
    if (req.body) {
        if (req.body.name) {
            next ();
        } else {
            res.status(400).json({ message: "missing required name field"  })
        }
    } else {
        res.status(400).json({ message: "missing user data" })
    }
    
};

function validatePost(req, res, next) {

};

module.exports = router;
