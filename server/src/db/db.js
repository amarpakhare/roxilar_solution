// Importing required modules
import mongoose, {connect} from "mongoose"
import {DB_NAME} from "../constants.js" // Importing database name from constants file

const connectDB = async () => {
	try {
		// Connecting to MongoDB using mongoose with URI and database name
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGODB_URI}/${DB_NAME}`
		)
		// Logging success message with connection host
		console.log(
			`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`
		)
		// Uncomment the following line to see more details about the connection object
		// console.log(connectionInstance)
	} catch (error) {
		// Logging error message and exiting the process with error code 1
		console.error("MONGODB connection error", error)
		process.exit(1)
	}
}

// Exporting the connectDB function for use in other modules
export default connectDB
