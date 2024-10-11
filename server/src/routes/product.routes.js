import {Router} from "express"
import {
	barChart,
	combinedData,
	initializeDatabase,
	pieChart,
	statistics,
	transactions,
} from "../controller/product.controller.js"

const router = Router()

router.route("/initialize-database").get(initializeDatabase)
router.route("/transactions").get(transactions)
router.route("/statistics").get(statistics)
router.route("/bar-chart").get(barChart)
router.route("/pie-chart").get(pieChart)
router.route("/combined-data").get(combinedData)

export default router
