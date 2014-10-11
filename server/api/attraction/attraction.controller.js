'use strict';

var _ = require('lodash');
var Attraction = require('./attraction.model');

// Get list of attractions
exports.index = function(req, res) {
  Attraction.find(function (err, attractions) {
    if(err) { return handleError(res, err); }
    return res.json(200, attractions);
  });
};

// Get a single attraction
exports.show = function(req, res) {
  Attraction.findById(req.params.id, function (err, attraction) {
    if(err) { return handleError(res, err); }
    if(!attraction) { return res.send(404); }
    return res.json(attraction);
  });
};

// Creates a new attraction in the DB.
exports.create = function(req, res) {
  Attraction.create(req.body, function(err, attraction) {
    if(err) { return handleError(res, err); }
    return res.json(201, attraction);
  });
};

// Updates an existing attraction in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attraction.findById(req.params.id, function (err, attraction) {
    if (err) { return handleError(res, err); }
    if(!attraction) { return res.send(404); }
    var updated = _.merge(attraction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, attraction);
    });
  });
};

// Deletes a attraction from the DB.
exports.destroy = function(req, res) {
  Attraction.findById(req.params.id, function (err, attraction) {
    if(err) { return handleError(res, err); }
    if(!attraction) { return res.send(404); }
    attraction.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.near = function(req, res) {
    var miles = 1;
    Attraction.find({
        'location':
        {
            //$near: [req.params.latitude, req.params.longitude],
            //$maxDistance: 1
            $geoWithin: {
                // 3959 = radius of earth in miles
                $centerSphere: [ [ req.params.latitude, req.params.longitude ], miles / 3959 ]
            }
        }},
        function(err, attractions) {
            return res.json(200, attractions);
        }
    );
}

function handleError(res, err) {
  return res.send(500, err);
}
