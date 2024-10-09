import {Router} from "express"
import {initializeDatabase} from "../controller/product.controller.js"

const router = Router()

router.route("/initialize-database").get(initializeDatabase)

export default router
