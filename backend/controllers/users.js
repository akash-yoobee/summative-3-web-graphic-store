const mongoose = require("mongoose")
const User = mongoose.model("User")
const Comment = mongoose.model("Comment")
const Item = mongoose.model("Item")

// @desc      Get all users
// @route     GET /api/v1/users
exports.getUsers = (req, res, next) => {
	console.log("Get all Users")
	User.find()
		//NOTE May need to change for search, but will do for now
		.sort({ createdAt: "desc" })
		.then(function (User) {
			return res.json({
				User: User.map(function (item) {
					return item.toJSON()
				}),
			})
		})
}

// @desc      Get single user
// @route     GET /api/v1/users/:id
exports.getUser = (req, res, next) => {
	User.findById(req.params.id)
		.populate("item")
		.then(function (user) {
			return res.json(user.toJSON())
		})
		.catch(next)
}

// @desc      Create item
// @route     POST /api/v1/users/:id
exports.createItemForUser = async (req, res, next) => {
	console.log("create item")
	let item = new Item(req.body)
	item.user = req.params.userId
	await item.save()
	return res.json({ item: item.toJSON() })
}

// @desc      Get items by user
// @route     GET /api/v1/users/:id/items
exports.getUserItems = (req, res, next) => {
	console.log("Get all items for user")
	Item.find({ user: req.params.userId })
		//NOTE May need to change for search, but will do for now
		.sort({ createdAt: "desc" })
		.then(function (Item) {
			return res.json({
				Item: Item.map(function (item) {
					return item.toJSON()
				}),
			})
		})
}

// @desc      Create user
// @route     POST /api/v1/users
exports.createUser = async (req, res, next) => {
	console.log("create user")
	let user = new User(req.body)
	await user.save()
	return res.json({ user: user.toJSON() })
}

// @desc      Update user
// @route     PUT /api/v1/users/:id
exports.updateUser = async (req, res, next) => {
	console.log("update user-->", req.body)
	let updatedUser = _.extend(req.user, req.body)
	await updatedUser.save()
	return res.json({ user: updatedUser.toJSON() })
}

// @desc      Update user rating
// @route     PUT /api/v1/users/:id/rating
exports.updateUserRating = (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: `The rating for Artist with id ${req.params.id} has been updated`,
	})
}

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
exports.deleteUser = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `User with id ${req.params.id} deleted` })
}

// @desc      Add a comment
// @route     POST /api/v1/users/:userId/items/:itemId/comments
exports.addComment = (req, res, next) => {
	const { userId, itemId } = req.params
	let comment = new Comment(req.body)
	comment.user = userId
	comment.item = itemId
	return comment.save().then(function () {
		// Does the User have any comments already?
		User.findById(userId).then(function (user) {
			if (!user.comment) {
				user.comment = []
			}
			user.comment.push(comment)
			user.save()
		})
		// Does the Item have any comments already?
		Item.findById(itemId).then(function (item) {
			if (!item.comment) {
				item.comment = []
			}
			item.comment.push(comment)
			item.save()
		})
		return res.status(200).json({
<<<<<<< HEAD
				success: true,
				msg: `${comment.content} Added about this item.`
=======
			success: true,
			msg: `User with ID ${comment.user} successfully added this comment to the database ${comment.content}. The comment was about the item with ID ${comment.item}`,
>>>>>>> f3c8403a37f29752c00c6d0a9a3c0f56a5bacd14
		})
	})
}

/**
 * AUTH
 */

// @desc      Log in a user
// @route     POST /api/v1/users/login
exports.logInUser = async (req, res, next) => {
	console.log("login user")
	if (!req.body.email) {
		return res.status(422).json({
			succsess: false,
			message: "Email can't be blank",
		})
	}
	let user = await User.findOne({ email: req.body.email })
	if (!user) {
		return res.status(422).json({
			succsess: false,
			message: "user not found",
		})
	}
	return res.json({ user: user.toJSON() })
}
