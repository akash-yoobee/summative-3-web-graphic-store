const express = require("express")
const router = express.Router()
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	updateUserRating,
	addComment,
	logInUser,
	getUserItems,
	createItemForUser,
} = require("../controllers/users")

router.route("/").get(getUsers).post(createUser)
router.route("/:userId/items/:itemId/comments").post(addComment)
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser)
router.route("/:id/rating").put(updateUserRating)
router.route("/login").post(logInUser)
router.route("/:userId/items").get(getUserItems)
router.route("/:userId/items").post(createItemForUser)

module.exports = router
