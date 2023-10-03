import express from 'express';
import post from "./post.mjs";
import get from "./get.mjs";
import patch from "./patch.mjs";

const router = express.Router({mergeParams:true});

console.log(router)

router.use('/', (req, res) => {
    switch (req.method.toLowerCase()) {
        case "post":
            post(req,res);
            break;
        case "get":
            get(req,res);
            break;
        case "patch":
            patch(req,res);
            break;
        default:
            get(req,res)
    }
});

export default router