// userRoute.mjs
import express from 'express';

const router = express.Router();

// Define your user routes here

router.route('/').get((req, res) => {
    res.status(200).json({
        success: true,
        message: "This is a route " + req.url.split('/')[2],
    });
});

export default router;
