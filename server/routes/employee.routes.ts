import express from "express";

const router = express.Router();

router.get('/employee/:id', (req, res) => {
    const id:number = Number(req.params.id);
    console.log(id);
    res.json({id: id});
})

export default router;