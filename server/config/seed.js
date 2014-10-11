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
        },
		{
            name: "America's Largest Zipper",
            location: [44.199261, -72.503832]
        },
		{
			name: "Anna Margolis's House",
			location: [44.482639, -73.216847]
		},
		{
			name: "Annual Turkey Supper",
			location: [44.735239, -73.113638]
		},
		{
			name: "Bob's Camera&Video (walking tour map)",
			location: [42.856029, -72.568746]
		},
		{
			name: "Brattleboro Farmer's Market",
			location: [42.849528, -72.585553]
		},
		{
			name: "Burlington Parks and Recreation",
			location: [44.461722, -73.215329]
		},
		{
			name: "Church Street",
			location: [44.476003, -73.212504]
		},
		{
			name: "City Market",
			location: [44.478103, -73.210559]
		},
		{
			name: "Creamery Covered Bridge",
			location: [42.849528, -72.585553]
		},
		{
			name: "Fletcher Free Library",
			location: [44.476816, -73.210289],
		},
		{
			name: "Flynn Center for the Performing Arts",
			location: [44.475686, -73.213148],
		},
		{
			name: "Genealogical Clues in Family Photographs",
			location: [44.195991, -72.498383]
		},
		{
			name: "Granite Scuptures",
			location: [44.208621, -72.500246]
		},
		{
			name: "HackVT",
			location: [44.4763899, -73.2084],
		},
		{
			name: "Historic Preservation Tour",
			location: [42.862999, -72.567632]
		},
		{
			name: "Island Line Trail",
			location: [44.463786, -73.218415]
		},
		{
			name: "KidsPLAYce: Children's Discovery Center",
			location: [42.851916, -72.558434]
		},
		{
			name: "Lake Champlain Chocolates",
			location: [44.458804, -73.213861}
		},
		{
			name: "Lakeside Massage Studio",
			location: [44.462055, -73.217840]
		},
		{
			name: "Merril's Roxy",
			location: [44.477257, -73.210794]
		},
		{
			name: "Nectar's",
			location: [44.476111, -73.211759]
		},
		{
			name: "North American Breweries",
			location: [44.467847, -73.215402]
		},
		{
			name: "Orange Leaf Frozen Yogurt",
			location: [44.477209, -73.212057]
		},
		{
			name: "Out of the Darkness Walk to Prevent Suicide",
			location: [44.481062, -73.219953]
		},
		{
			name: "Radio Bean Coffeehouse",
			location: [44.480842, -73.211038]
		},
		{
			name: "Retreat Farm",
			location: [42.862999, -72.567632]
		},
		{
			name: "Switchback Brewing Co",
			location: [44.456183, -73.220619]
		},
		{
			name: "Thunder Road Racetrack",
			location: [44.179956, -72.487549],
		},
		{
			name: "Vintage Inspired Lifestyle Marketplace",
			location: [44.456704, -73.219632]
		},
		{
			name: "Wolf Kahn",
			location: [42.850715, -72.556579]
		},
		{
			name: "Yankee Tattoo",
			location: [44.480585, -73.210872]
		}

    );
});
