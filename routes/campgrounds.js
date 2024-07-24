const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const {
	isLoggedIn,
	isAuthor,
	validateCampground,
} = require('../middleware.js');

router
	.route('/')
	.get(catchAsync(campgrounds.index))
	.post(
		isLoggedIn,
		validateCampground,
		catchAsync(campgrounds.createCampground)
	);

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
	.route('/id')
	.get(isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))
	.put(
		isLoggedIn,
		isAuthor,
		validateCampground,
		catchAsync(campgrounds.updateCampground)
	)
	.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id', catchAsync(campgrounds.showCampground));

module.exports = router;
