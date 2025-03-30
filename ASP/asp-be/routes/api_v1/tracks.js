var express = require('express'); // ESM: import 
const tracks = [
  {
    id: 1,
    title: 'Happy Birthday',
    artist: 'Unknown',
    album: 'Birthday Songs',
    file: 'https://example.com/happy-birthday.mp3',
    duration: '2:30',
  },
  {
    id: 2,
    title: 'Twinkle, Twinkle, Little Star',
    artist: 'Jane Taylor',
    album: 'Children\'s Songs',
    file: 'https://example.com/twinkle-twinkle.mp3',
    duration: '1:45',
  },
  {
    id: 3,
    title: 'The Wheels on the Bus',
    artist: 'Unknown',
    album: 'Children\'s Songs',
    file: 'https://example.com/wheels-on-the-bus.mp3',
    duration: '3:10',
  },
  {
    id: 4,
    title: 'Old MacDonald Had a Farm',
    artist: 'Unknown',
    album: 'Children\'s Songs',
    file: 'https://example.com/old-macdonald.mp3',
    duration: '2:20',
  },
  {
    id: 5,
    title: 'If You\'re Happy and You Know It',
    artist: 'Unknown',
    album: 'Children\'s Songs',
    file: 'https://example.com/if-youre-happy.mp3',
    duration: '2:50',
  },
]; 
var router = express.Router(); 
router.get('/', function(req, res, next) {  
    res.json(tracks); 
}); 

module.exports = router; // ESM: export