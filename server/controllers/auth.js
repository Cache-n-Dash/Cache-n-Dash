const bcrypt = require('bcryptjs');
module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const {email, username, password} = req.body
    const [checkEmail] = await db.users.get_user_by_email(email)
    if(checkEmail){
      return res.status(409).send("Email is already registered.")
    }
    const [checkUsername] = await db.users.get_user_by_username(username)
    if(checkUsername){
      return res.status(409).send("Username is already registered.")
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const [user] = await db.users.create_user(email, hash)
    delete user.password
    req.session.user = user
    return res.status(200).send(req.session.user)
  },

  login: async (req,res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    const [user] = await db.users.get_user_by_email(email)
    if (!user){
      return res.status(401).send("Email not found.")
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password)
    if(!isAuthenticated){
      return res.status(403).send("Incorrect Password.")
    }
    delete user.password
    req.session.user = user
    return res.status(200).send(req.session.user)
},

  logout: (req, res) => {
    if(!req.session.user){
      return res.status(404).send("User not found.")
    }
    return res.status(200).send(req.session.user)
  },

  getUser: (req, res) => {
    if(!req.session.user){
      return res.status(404).send ("User not found.")
    }
     return res.status(200).send(req.session.user)
  }
}