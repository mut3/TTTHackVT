/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Attraction = require('../api/attraction/attraction.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Attraction.find({}).remove(function() {
    Attraction.create(
        {
            name: "Antique&CraftShops",
            location: [44.198013, -72.502722]
        },
        {
            name: "Antique Mall",
            location: [44.160612, -72.451274]
        },
        {
            name: "Latchis Theatre",
            location: [42.851201, -72.557818]
        },
        {
            name: "Lake Champlain Chocolates",
            location: [44.458804, -73.213861]
        },
        {
            name: "Barre Opera House",
            location: [44.196858, -72.502025]
        },
        {
            name: "Millstone Hill Touring Center",
            location: [44.159468, -72.451211]
        },
        {
            name: "Brattleboro Museum And Art Center",
            location: [42.850719, -72.556582]
        },
        {
            name: "Arts Riot",
            location: [44.468124, -73.214793]
        }
    );
});
