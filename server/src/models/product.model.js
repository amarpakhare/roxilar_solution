import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
	productId: Number,
	title: String,
	price: Number,
	description: String,
	category: String,
	image: String,
	sold: Boolean,
	dateOfSale: Date,
})

export const Product = mongoose.model("Product", ProductSchema)
