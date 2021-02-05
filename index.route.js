const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const categoryRoutes = require('./server/categories/categories.route');
const postRoutes = require('./server/posts/posts.route');
const sizesRoutes = require('./server/sizes/sizes.route');
const favouritesRoutes = require('./server/favourites/favourites.route');
const commentsRoutes = require('./server/comments/comments.route');
const citiesRoutes = require('./server/cities/cities.route');
const slidersRoutes = require('./server/sliders/sliders.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/adem', (req, res) =>
  res.send('Success')
);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);
router.use('/sizes', sizesRoutes);
router.use('/favourites', favouritesRoutes);
router.use('/comments', commentsRoutes);
router.use('/cities', citiesRoutes);
router.use('/sliders', slidersRoutes);

module.exports = router;
