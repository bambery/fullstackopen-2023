const bcrypt = require('bcrypt')

const saltPassword = async (password) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    return passwordHash
}

module.exports = {
  saltPassword
}
