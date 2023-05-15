const express = require('express');
const fetchAdmin = require('../middleware/fetchAdmin');
const router = express.Router();
const Category = require('../models/Category');

router.post('/create', fetchAdmin, async (req, res) => {

    try {

        const category = Category(req.body)

        await category.save()

        res.send({ success: true, message: "Category Added" })

    } catch (error) {
        console.log(error.message)
        res.send({ error: "Internal Server Error" })
    }

})

router.post('/update/:id', fetchAdmin, async (req, res) => {

    try {

        const { name } = req.body;

        const newData = {}

        if (name) {
            newData.name = name
        }

        let category = await Category.findById(req.params.id)

        if (!category) {
            return res.send({ error: "Category not found" })
        }

        category = await Category.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true })

        res.send({ success: true, message: "Category Updated" })

    } catch (error) {
        console.log(error.message)
        res.send({ error: "Internal Server Error" })
    }

})

router.post('/delete/:id', fetchAdmin, async (req, res) => {

    try {

        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.send({ error: "Category Not Found" })
        }

        await Category.findByIdAndDelete(req.params.id)

        res.send({ success: true, message: "Category Deleted" })

    } catch (error) {
        console.log(error.message)
        res.send({ error: "Internal Server Error" })
    }

})

router.get('/fetch', async (req, res) => {

    try {

        const category = await Category.find().sort({ _id: -1 })
        res.send(category)

    } catch (error) {
        console.log(error.message)
        res.send({ error: "Internal Server Error" })
    }

})

module.exports = router;