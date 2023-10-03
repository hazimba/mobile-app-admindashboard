import express from 'express';
import get from "./get.mjs";
const router = express.Router({mergeParams:true});

console.log(router)

router.use('/', (req, res) => {
    switch (req.method.toLowerCase()) {
        case "post":
            break;
        case "get":
            get(req,res);
            break;
        default:
            get(req,res)
    }
});

export default router