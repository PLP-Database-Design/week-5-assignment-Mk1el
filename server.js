const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();


app.use(cors());
app.use(express.json());

// Connecting to Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Moseh1209#',
    database: 'hospital_db'
});

// Checking for valid connection
db.connect((err) => {
    if (err) {
        return console.log("Error connecting to database!", err);
    }

    console.log("Connection successful.", db.threadId);
});
//GET METHOD
//Question 1. Retrieve all patients
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/data', (req,res)=>{
    db.query('SELECT * FROM patients', (err, results)=>{
        if(err){
            console.log(err);
            res.statusMessage(500).send('Error retrieving data.');}
            else{
                res.render('data',{results:results});
            }
        });
    })

// Question 2: Retrieve all providers

app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});
//Question 3: Filter patients by First Name
app.get('/patients', (req, res) => {
    const query = 'SELECT first_name FROM patients'; 
    db.query(query, (err, results) => { 
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results); 
    });
});
//Question 4: Retrieve all providers by their specialty
app.get('/provider_specialty', (req, res)=>{
    const query = 'SELECT provider_specialty FROM providers';
    db.query(query, (err, results)=>{
        if(err){
            return res.status(500).json({error: 'Database query failed!'});

        }
        res.json(results);
    })
})
    // Start the server
    const PORT = process.env.PORT || 3000; // Set a default port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// GET METHOD for root
app.get('/', (req, res) => {
    res.send('Server started successfully!');
});
