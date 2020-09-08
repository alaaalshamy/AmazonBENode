var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.send({mess:"hi"});
});
router.post('/',(req,res)=>{
 res.send(req.body.name);
})

module.exports = router;
