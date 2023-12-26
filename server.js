const express = require("express")
const mongoose = require("mongoose")
const UserModel = require('./Model/User')

const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://admin:admin@cluster0.xvza2cd.mongodb.net')
console.log("connect db")
app.post("/user", (req, res) => {
    const { email, name } = req.body
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("User is already exist !!!")
            } else {
                UserModel.create(req.body)
                    .then(user => res.json("Add user success !!!"))
                    .catch(err => res.json(err))
            }
        })
})

app.get("/users", (req, res) => {
    UserModel.find()
        .then(users => {
            res.json(users)
        })
})

app.listen(8000, () => console.log("Server start"))