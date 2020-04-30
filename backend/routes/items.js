const express = require("express")
const router = express.Router()
const {
	getItems,
	getItem,
	updateItem,
	deleteItem,
	getItemsMoreExpensiveThan,
	getItemsLessExpensiveThan,
} = require("../controllers/items")

router.route("/").get(getItems)
router.route("/:id").get(getItem).put(updateItem).delete(deleteItem)
router.route("/minprice/:price").get(getItemsMoreExpensiveThan)
router.route("/maxprice/:price").get(getItemsLessExpensiveThan)

module.exports = router