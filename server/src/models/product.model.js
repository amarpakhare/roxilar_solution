const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
	productId: String,
	title: String,
	description: String,
	price: Number,
	dateOfSale: Date,
	sold: Boolean,
	category: String,
})

const Product = mongoose.model("Product", ProductSchema)
