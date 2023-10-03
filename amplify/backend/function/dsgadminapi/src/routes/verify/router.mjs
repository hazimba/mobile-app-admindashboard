import express from 'express';
import post from "./post.mjs";
const router = express.Router({mergeParams:true});

router.use('/', post);

export default router