module.exports = {
  deleteUser: (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    db.users.delete_user(user_id)
    .then()


  }
}