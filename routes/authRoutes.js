const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/')
})
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router