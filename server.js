const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const db = require('./models');
const app = express();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  session({ secret: process.env.SECRET, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/api-routes.js')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});
db.sequelize
  .sync()
  .then(function() {
    app.listen(PORT, function() {
      console.log(
        '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
        PORT,
        PORT
      );
    });
  })
  .catch(err => console.log(err));
