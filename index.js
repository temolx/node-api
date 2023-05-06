const express = require("express");
const fs = require("fs");
const usersList = require("./usersList.json");

const app = express();
app.use(express.json());
let users = JSON.parse(fs.readFileSync("./usersList.json"))

let cors = require('cors');
app.use(cors());

// GET
app.get("/users", (req, res) => {
    res.send(usersList);
})

// POST
app.post("/users", (req, res) => {
    const userID = usersList[users.length - 1].id + 1;
    const newUser = Object.assign({ id: userID }, req.body);

    usersList.push(newUser);
    fs.writeFile("./usersList.json", JSON.stringify(users), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    });
})

// PUT
app.put("/users/:id", (req, res) => {
    const id = +req.params.id;
    const currentItem = usersList.find(item => item.id === id);
    const index = usersList.indexOf(currentItem);

    Object.assign(currentItem, req.body)
    usersList[index] = currentItem;

        fs.writeFile("./usersList.json", JSON.stringify(usersList), (err) => {
            res.status(200).json({
                status: 'success',
                data: {
                    user: currentItem
                }
            })
        });
})

// DELETE
app.delete("/users/:id", (req, res) => {
    const id = +req.params.id;
    const currentItem = usersList.find(item => item.id === id);
    const index = usersList.indexOf(currentItem);

    usersList.splice(index, 1);
    fs.writeFile("./usersList.json", JSON.stringify(users), (err) => {
        res.status(204).json({
            status: 'success',
            data: {
                user: null
            }
        })
    });
})


app.listen(3001, () => console.log("Users API Running..."));