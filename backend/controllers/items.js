const mongoose = require("mongoose")
const Item = mongoose.model("Item")

// @desc      Get all items
// @route     GET /api/v1/items
exports.getItems = (req, res, next) => {
	console.log("Get all Items")
	Item.find()
		//NOTE May need to change for search, but will do for now
		.sort({ createdAt: "desc" })
		.then(function (items) {
			return res.json({
				items: items.map(function (item) {
					return item.toJSON()
				}),
			})
		})
}

// @desc      Get single item
// @route     GET /api/v1/items/:id
exports.getItem = (req, res, next) => {
	Item.findById(req.params.id)
		.populate("comment")
		.then(function (item) {
			return res.json({ item: item.toJSON() })
		})
		.catch(next)
}

// @desc      Update item
// @route     PUT /api/v1/items/:id
exports.updateItem = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: `Information in the database has been updated for item with id ${req.params.id}`,
	})
}

// @desc      Delete item
// @route     DELETE /api/v1/items/:id
exports.deleteItem = async (req, res, next) => {
	console.log("deleting item with id " + req.params)
	await Item.findByIdAndRemove(req.params.id)
	return res.sendStatus(204)
	// .json({ success: true, msg: `Item with id ${req.params.id} deleted` })
}