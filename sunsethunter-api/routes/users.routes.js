const { Router } = require('express');
const { 
    addSite,
    getSites,
    getSite
} = require('../controllers/users.controller');

const router = Router();

router.post('/add_site', addSite);

router.get('/get_sites', getSites);

router.get('/get_site', getSite);


module.exports = router;