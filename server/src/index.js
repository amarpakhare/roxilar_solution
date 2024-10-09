// require(dotenv).config({ path: './env' })
import dotenv from "dotenv"
import connectDB from "./db/db.js"
import {app} from "./app.js"
dotenv.config({
	path: "./.env",
})

connectDB()
	.then(() => {
		//   checking if the app is running or not
		app.on("err", (err) => {
			console.log("ERROR: ", err)
		})

		app.listen(process.env.PORT || 8000, () => {
			console.log(`Server is running on port ${process.env.PORT}`)
		})
	})
	.catch((err) => {
		console.log("Mongo Connection Failed : ", err)
	})
