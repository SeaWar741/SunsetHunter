const { Router } = require('express');
const { 
    addSite,
    getSites,
    getSite,
    removeSite
} = require('../controllers/users.controller');

const router = Router();

router.post('/add_site', addSite);

router.post('/get_sites', getSites);

router.post('/get_site', getSite);
router.post('/remove_site', removeSite);


module.exports = router;