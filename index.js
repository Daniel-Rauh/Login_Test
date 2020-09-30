const express = require('express')
const app = express()
require("dotenv").config()
const hbs = require('hbs')
hbs.handlebars === require('handlebars')
hbs.registerPartials(__dirname + '/views/partials', function (err) { });
hbs.localsAsTemplateData(app)
const port = process.env.PORT || 3000
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const passportSetup = require('./config/passportSetup')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
    }))
app.use(express.static('public'))
app.set('view engine', 'hbs')
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("I am connect")
        app.listen(port, () => {
            console.log("listening at 3000")
        })
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.status(200).render('index')
})

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)