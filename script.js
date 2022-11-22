const express = require('express');
const exphbs  = require('express-handlebars');
const helpers = require('./test2_moduleA.js');

const app = express();
const port = process.env.PORT || 8080;

app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs'
}));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/allStudents', (req, res) => {
    helpers.allStudents()
    .then((data) => res.render('students', {arr: data}))
    .catch((err) => res.status(500).send(err))
});

app.get('/BSD', (req, res) => {
    helpers.getBSD()
    .then((data) => res.render('students', {arr: data}))
    .catch((err) => res.status(500).send(err))
});

app.get('/highGPA', (req, res) => {
    helpers.highGPA()
    .then((data) => {
        res.render('student', {data})
    })
    .catch((err) => {
        res.status(500).send(err)
    })
});

app.use((req, res) => res.status(404).send('Error 404: page not found.'));

helpers.init()
.then(() => {
    app.listen(port, () => {
        console.log(`server is currently listening on ${port}`);
    })
})