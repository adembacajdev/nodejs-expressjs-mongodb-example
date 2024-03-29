const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const postRoutes = require('./server/posts/posts.route');
const favouritesRoutes = require('./server/favourites/favourites.route');
const commentsRoutes = require('./server/comments/comments.route');
const slidersRoutes = require('./server/sliders/sliders.route');
const testRoutes = require('./server/testImages/test.route');
//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** GET /health-check - Check service health */
router.get('/adem', (req, res) =>
  res.send('Success')
);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/favourites', favouritesRoutes);
router.use('/comments', commentsRoutes);
router.use('/sliders', slidersRoutes);
router.use('/test', testRoutes);

module.exports = router;
