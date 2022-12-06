const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String
});

let User;

function startDB() {
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb+srv://walter_white:heisenberg@cluster0.9k3caib.mongodb.net/?retryWrites=true&w=majority");
            const userSchema = new Schema({
                email: {
                  type: String,
                  unique: true
                },
                password: String
              });
              User = mongoose.model("finalUser", userSchema);
              console.log('DB connection successful');
              resolve();
    });
}

function register(user) {
    return new Promise((resolve, reject) => {
        const email = user.email;
        const password = user.password;
        if(email.trim() == '' || password.trim() == '') 
            reject('Error: email or password cannot be empty');
        else {
            bcrypt.hash(password, 10)
            .then(hashedPassword => {
                user.password = hashedPassword;
                const newUser = new User(user);
                newUser.save()
                .then(() => {
                    resolve(newUser);
                })
                .catch((err) => {
                    if(err.code == 11000)
                        reject(`Error: ${email} already exists`);
                    else 
                        reject('Error: cannot create the user');
                });
            })
            .catch(err => {
                reject(err);
            });
        }
    });
}

function signIn(user) {
    return new Promise((resolve, reject) => {
        User.findOne({email: user.email}).exec()
        .then((foundUser) => {
            console.log(user);
            console.log(foundUser);
            bcrypt.compare(user.password, foundUser.password).then((result) => {
                if(result) {
                    resolve(user)
                }
                else {
                    reject(`Incorrect password for user ${user.email}`)
                }
            })
        })
        .catch(() => {  
            reject(`Cannot find the user: ${user.email}`);
        });
    });
}

module.exports = {
    startDB,
    register,
    signIn
}