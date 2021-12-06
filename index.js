
const express = require('express')
const app = express()
app.use(express.json())

const port = process.env.PORT || 4001

const { users } = require('./state')

// app.all("/hello", function(req, res){
//   res.send("hi")
// })

// app.get("/hello/:name", function(req, res){
//   let input = req.params.name;
//   res.send("hi TEST")
// })

// app.post("/hi", function(req, res){
//   console.log("/Post hi");
//   let input = req.body;
//   console.log("Request body = ", input);
//   res.send("Hi " +input.name);
// })

let list = []
// Get a return of everything
app.get("/users", function(req, res){
  console.log("GET /users");
  res.json(users)
})

// Get User 1
app.get("/users/1", function(req, res){
  console.log("GET /users/1");
  res.json(users[0])
});

// Return any user
app.get("/users/:_id", function(req, res){
console.log("GET /users/1");
let id = req.params._id
for(let i = 0; i < users.length; i++){
  let currentUser = users[i]; 
  let currentUserId = users[i]._id;
  if(currentUserId == id){
    res.json(currentUser); 
  }
}
res.status(400).json({ msg: 'No member with the id of ' + id}); 
 })


// Delete data from the array

app.delete("/users/:_id", function(req, res){
  console.log('DELETE /list/', req.params.pos);
  let deleted = users.splice(req.params._id, 1);
  res.json(deleted)
})

// add data to the array

app.post("/users", function(req, res){
  console.log("POST /users");
  let input = req.body;
  users.push(input);
  res.sendStatus(202);
})

// Update the array

app.put("/users/_id", function(req, res){
  console.log('PUT /users');
  let input = req.body;
  let id = users[0]
  users[id] = input 
  res.sendStatus(202);
})




/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))