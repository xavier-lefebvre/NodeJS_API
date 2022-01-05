// Express integration in index.js
const express = require('express'); 
const app = express();
const parkings = require('./parkings.json');
const reservations = require('./reservations.json');

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
    const reservs = reservations.filter(reservs => reservs.parkingId === id); 
    res.status(200).json(reservs);
});

app.get('/parking/:id/reservations/:idReservation', (req,res) => {
    const id = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    const reservs = reservations.filter(reservs => reservs.idReservation === idReservation && reservs.parkingId === id); 
    res.status(200).json(reservs);
})

// app.get('/reservations', (req,res) => { // get : request to specific resources
//     // res.send("Liste des parkings"); // send : request to the server
//     res.status(200).json(reservations); // status : display result of a code ; json : return a json file.
// });

// app.get('/reservations/:parkingId', (req,res) => {
//     const parkingId = parseInt(req.params.parkingId);
//     const reservation = reservations.filter(reservation => reservation.parkingId === parkingId); 
//     res.status(200).json(reservation);
// });

// // post request
// app.post('/reservations', (req,res) => { 
//     reservations.push(req.body) // push() is an array function from Node.js that is used to add element to the end of an array.
//     res.status(200).json(reservations)
// });

// // put request
// app.put('/reservations/:id', (req,res) => {
//     const id = parseInt(req.params.id)
//     let reservation = reservation.find(reservation => reservation.id === id)
//     reservation.name =req.body.name,
//     reservation.city =req.body.city,
//     reservation.type =req.body.type,
//     reservation.clientName = req.body.clientName,
//     reservation.vehicle = req.body.vehicle,
//     reservation.licensePlate = req.body.licensePlate,
//     reservation.checkin = req.body.checkin,
//     reservation.checkout = req.body.checkout,
//     res.status(200).json(reservation)
// })

// // delete request
// app.delete('/reservations/:id', (req,res) => {
//     const id = parseInt(req.params.id)
//     let reservation = reservations.find(reservation => reservation.id === id)
//     reservations.splice(reservations.indexOf(reservation),1)
//     res.status(200).json(reservations)
// })