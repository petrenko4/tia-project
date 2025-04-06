var express = require('express'); // ESM: import 
const tracks = []; 
var router = express.Router(); 
router.get('/', function(req, res, next) {  
    res.json(tracks); 
}); 
router.post('/', function(req, res, next) {  
  tracks.push(req.body);  
  res.status(200); 
});

module.exports = router; // ESM: export