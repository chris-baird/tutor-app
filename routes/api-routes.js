const db = require('../models');
const passport = require('../config/passport');
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {
  app.post('/api/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(false);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  });

  // Add student route
  app.post('/api/addStudent', isAuthenticated, (req, res) => {
    db.Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      timeZone: req.body.timeZone,
      zoomLink: req.body.zoomLink,
      userId: req.body.userId
    })
      .then(student => {
        res.json(student);
      })
      .catch(err => console.log(err));
  });

  // Get student info route
  app.get('/api/users/:userId/students', isAuthenticated, (req, res) => {
    db.Student.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(students => {
        res.json(students);
      })
      .then(err => console.log(err));
  });

  app.post('/api/signup', function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.json(false);
      })
      .catch(function(err) {
        res.json(true);
      });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.json({ message: 'Logged out' });
  });

  app.get('/api/user_data', function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get('/api/info', isAuthenticated, (req, res) => {
    res.json({ message: 'Hello World' });
  });

  // Email check
  app.get('/api/email/availability/:email', (req, res) => {
    db.User.findOne({ where: { email: req.params.email } }).then(user => {
      !user ? res.json(false) : res.json(true);
    });
  });
};
