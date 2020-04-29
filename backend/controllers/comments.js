const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')

// @desc      Get all comments made about an item
// @route     GET /api/v1/items/:itemId/comments
exports.getComments = (req, res, next) => {
	Promise.all([
		Comment.find({ item: req.params.itemId })
			.sort({ createdAt: "desc" })
	])
	.then(function (results) {
		return res.status(200).json({
		success: true,
		comments: results
	})
	})
}

// @desc      Update comment
// @route     PUT /api/v1/comments/:id
exports.updateComment = (req, res, next) => {
	// Deleting the comment if the user uploads an empty string
	if(req.body.content == ''){
		Comment.findByIdAndDelete(req.params.id).then(function(){
			return res.status(200).json({
				success: true,
				msg: `Comment deleted.`
			})
		})
	} else {
		// Updating the comment
		Comment.findById(req.params.id)
			.then(function (comment) {
				comment.content = req.body.content
				comment.save()
				.then(function(updated){
					return res.status(200).json({
						success: true,
						updated: updated.toJSON()});
				}).catch(next);
			})
	}
}

// @desc      Delete comment
// @route     DELETE /api/v1/comments/:id
exports.deleteComment = (req, res, next) => {
	Comment.findByIdAndDelete(req.params.id).then(function(){
		return res.status(200).json({
			success: true,
			msg: `Comment deleted.`
		})
	})
}
