module.exports = {
  deleteUser: (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    db.users.delete_user(user_id)
    .then((data) => {
      res.status(200).send(data)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },
  queryUsers: (req,res) => {
    const db = req.app.get('db')
    const {query} = req.query;
    if(query !== ''){
        db.users.query_user(query)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }else{
        db.users.get_all_users()
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
  },
  makeAdmin: (req,res) => {
    const db = req.app.get('db')
    const {user_id} = req.params;
    const id = +user_id;
    db.users.make_admin(id)
    .then(data=>{
       res.status(200).send(data)
    }).catch(err=>{
       console.log(err)
       res.status(500).send(err)
    })
 }
}