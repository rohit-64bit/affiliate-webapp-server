const express = require('express');
const fetchAdmin = require('../middleware/fetchAdmin');
const Product = require('../models/Product');
const router = express.Router();

router.post('/create', fetchAdmin, async (req, res) => {

    try {

        const data = req.body

        const product = Product(data)

        await product.save()

        res.send({ success: true, message: "Product Added" })

    } catch (error) {

        console.log(error.message)
        res.send({ error: "Internal Server Error" })

    }

})

router.post('/update/:productID', fetchAdmin, async (req, res) => {

    try {

        const { name, description, price, image, url, store, categoryName, categoryID, featured } = req.body;

        const newData = {}

        if (name) { newData.name = name }
        if (description) { newData.description = description }
        if (price) { newData.price = price }
        if (image) { newData.image = image }
        if (url) { newData.url = url }
        if (store) { newData.store = store }
        if (categoryName) { newData.categoryName = categoryName }
        if (categoryID) { newData.categoryID = categoryID }
        if (featured) { newData.featured = featured }

        let product = await Product.findById(req.params.productID)

        if (!product) {
            return res.send({ error: "Product not found" })
        }

        product = await Product.findByIdAndUpdate(req.params.productID, { $set: newData }, { new: true })

        res.json({ success: true, message: "Product Updated" })

    } catch (error) {
        console.log(error.message)
        res.send({ error: "Internal Server Error" })
    }

})

router.post('/delete/:id', fetchAdmin, async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.send({ error: "Product not found" })
        }

        const data = await Product.findByIdAndDelete(req.params.id)

        res.send({ success: true, message: "Product Deleted" })

    } catch (error) {
        console.log(error.message)
        res.send({ error: "Internal Server Error" })
    }

})

router.get('/fetch', async (req, res) => {

    try {

        const product = await Product.find().sort({ _id: -1 })
        res.send(product)

    } catch (error) {
        console.log(error.message)
        res.send({ error: "Internal Server Error" })
    }

})

router.get('/featured', async (req, res) => {

    try {

        const data = await Product.find({ featured: true }).sort({ _id: -1 })

        res.send(data.slice(0, 8))

    } catch (error) {
        console.log(error.message)
        res.send({ error: 'Internal Server Error' })
    }

})

router.post('/search', async (req, res) => {

    try {

        const { query, categoryID } = req.body

        const searchRegex = new RegExp(query, "i");

        if (query === null && categoryID != null) {

            const data = await Product.find({ categoryID: categoryID }).sort({ _id: -1 });

            if (!data) {
                return res.send({ error: 'Opps! Search not found' })
            }

            return res.send(data)

        }

        const data = await Product.find({
            $or: [
                { name: searchRegex }
            ],
            categoryID: categoryID
        })

        if (!data) {
            return res.send({ error: 'Opps! Search not found' })
        }

        res.send(data)


    } catch (error) {
        console.log(error.message)
        res.send({ error: 'Internal Server Error' })
    }

})

module.exports = router;