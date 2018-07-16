const express = require('express');
const hbs =require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
// app.set('view engine', 'hbs')   // What is happening here again?


app.use((req, res, next)=>{
var now = new Date().toString();
var log = `${now}:   ${req.method}    ${req.url}   \n`;
 console.log(log);
 fs.appendFile('server.log', log + '\n',(err) =>{
   if(err)
   console.log('unable to append to server.log');
      }// end inner fxn
    );// end fs.appendFile
  next(); // needed for page to be dynamic
  }// end request method
);// end use


// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
return new Date().getFullYear()   // this is written once
});// end auxilliary register helper 1


hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});// end auxilliary register helper 2


// app.get('/', (req, res) => {
//   // res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name: 'Andrew',
//     likes: [
//       'Biking',
//       'Cities'
//     ]
//   });
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
    // ,
    // currentYear: new Date().getFullYear()  // this is written twicee
      }//end object constaining injections for hbs
    );// end render
  }// end request object
);// end app.get

app.get('/about', (req, res) => {
  //res.send('About Page');
    res.render('about.hbs',{
      pageTitle: 'About Page'
      // ,
      // currentYear: new Date().getFullYear()
  });// end render
});// end get and req fxn

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });// end res.send
});// end get method and request fxn

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});// end listen method
