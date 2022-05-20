const Users = require('./Users')
const { generatePassword } = require('../utils')
const { connectToMongo } = require('../config')

let payloadAdmin = ({
  username: 'admin',
  password: 'admin',
  role: 'Admin'
})
payloadAdmin = generatePassword(payloadAdmin)

let payloadUser = ({
  username: 'user',
  password: 'user',
  role: 'User'
})

payloadUser = generatePassword(payloadUser)

function seed() {
  connectToMongo()
  Users.create([payloadAdmin, payloadUser]).then(result => {
    console.log(result);
    process.exit(1)
  }).catch(err => {
    console.log(err);
    process.exit(1)
  })
}

seed()