// Express integration in index.js
const express = require('express')
const app = express()
const parkings = require('./parkings.json')
const reservations = require('./reservations.json')

//middleware
app.use(express.json()); // express.json : It parses incoming requests with JSON payloads and is based on body-parser.

// server is listening
app.listen(8080, () => {
    console.log("Serveur à l'écoute");
});

//<=============================================================Parkings============================================================================================>
app.get('/parkings', (req,res) => { // get : request to specific resources
    // res.send("Liste des parkings"); // send : request to the server
    res.status(200).json(parkings); // status : display result of a code ; json : return a json file.
});

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const parking = parkings.find(parking => parking.id === id); // parking return the first value from the first element find in the object.
    res.status(200).json(parking);
});

// post request
app.post('/parkings', (req,res) => { 
    parkings.push(req.body) // push() is an array function from Node.js that is used to add element to the end of an array.
    res.status(200).json(parkings)
});

// put request
app.put('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parking.name =req.body.name,
    parking.city =req.body.city,
    parking.type =req.body.type,
    res.status(200).json(parking)
})

// delete request
app.delete('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let parking = parkings.find(parking => parking.id === id)
    parkings.splice(parkings.indexOf(parking),1)
    res.status(200).json(parkings)
})
//<=============================================================Reservations============================================================================================>

app.get('/parkings/:id/reservations', (req,res) => {
    const id = parseInt(req.params.id);
    const byParkingId = reservations.filter(byParkingId => byParkingId.parkingId === id); 
    res.status(200).json(byParkingId);
});

app.get('/parkings/:idp/reservations/:idr', (req,res) => {
   const idp = parseInt(req.params.idp);
   const idr = parseInt(req.params.idr);
   const reserv = reservations.find(reserv => reserv.parkingId === idp && reserv.id === idr); 
   res.status(200).json(reserv);
})

// // post request
app.post('/parkings/:idp/reservations', (req,res) => { 
    reservations.push(req.body) // push() is an array function from Node.js that is used to add element to the end of an array.
    res.status(200).json(reservations)
});

// put request
app.put('/parkings/:idp/reservations/:idr', (req,res) => {
    const idp = parseInt(req.params.idp);
    const idr = parseInt(req.params.idr);
    let reserv = reservations.find(reserv => reserv.parkingId === idp && reserv.id === idr)
    reserv.parking=req.body.parking,
    reserv.city =req.body.city,
    reserv.clientName = req.body.clientName,
    reserv.vehicle = req.body.vehicle,
    reserv.licensePlate = req.body.licensePlate,
    reserv.checkin = req.body.checkin,
    reserv.checkout = req.body.checkout,
    res.status(200).json(reserv)
})

// delete request
app.delete('/parkings/:idp/reservations/:idr', (req,res) => {
    const idp = parseInt(req.params.idp);
    const idr = parseInt(req.params.idr);
    let reserv = reservations.find(reserv => reserv.parkingId === idp && reserv.id === idr);
    reservations.splice(reservations.indexOf(reserv),1)
    res.status(200).json(reserv)
})