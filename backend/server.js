const express = require('express')
const cors = require('cors')
const { createRandomUser } = require('./data')
const { createFaker } = require('./createFaker')
const { createError, times } = require('./errors')
const { de, pl, it, Faker } = require('@faker-js/faker')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.post('/table', (req, res) => {
    console.log(req.body)
    let loc;
    let formats = [];
    if (req.body.locale == 'de') {
        loc = de;
        formats = ['+49 ## ######', '0049 ## ######', '0## ######']
    }
    else if (req.body.locale == 'pl') {
        loc = pl;
        formats = ['+48 ## ### ## ##', '## ### ## ##']
        
    }
    else {
        loc = it;
        formats = ['+39 ### #######', '### #######']
    }
    const faker = createFaker(loc)
    faker.seed(req.body.seed)

    users = []
    for (let i = 0; i < 20; i++) {
        let user = createRandomUser(faker, formats, req.body.seed)
        users.push(user)
    }

    for (let i = 0; i < req.body.page * 10; i++) {
        let user = createRandomUser(faker, formats, req.body.seed)
        users.push(user)
    }

    let errUsers = []
    for (let user of users) {
        let createErrors = times(req.body.errnum, createError)
        errUsers.push(createErrors(faker, user))
    }

    return res.send(errUsers) 
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log('listening')
})