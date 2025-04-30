const express = require("express");
const router = express.Router();
const Controller = require('../controllers/task');



router.post('/task', Controller.add)
router.delete('/task/:id',Controller.delete);
router.put('/task/update/:id',Controller.update)
router.get('/task/:id',Controller.one); 
router.get('/tasks ',Controller.view);


module.exports = router;