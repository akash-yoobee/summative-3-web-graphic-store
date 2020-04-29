const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
	{
		content: String,
		rating: {
			type: Number,
			required: [true, 'Please add a tuition cost'],
			min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must can not be more than 5']
		},
		// Comment can be made by minimum 1 & maximum 1 User
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		// Comment can belong to minimum 1 & maximum 1 Item
		item: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Item",
			required: true
		}
	},
	{
		timestamps: true
	}
)

CommentSchema.methods.toJSON = function () {
	return {
		id: this._id,
		content: this.content,
		rating: this.rating,
		user: this.user,
		item: this.item,
		createdAt: this.createdAt,
    updatedAt: this.updatedAt
	}
}

// Static method to get the averge rating of an Item
CommentSchema.statics.getAverageRating = async function(itemId) {
  const calculator = await this.aggregate([
    {
      $match: { item: itemId }
    },
    {
      $group: {
        _id: '$item',
        averageRating: { $avg: '$rating' }
      }
    }
  ])

  try {
    await this.model("Item"). findByIdAndUpdate(itemId, {
      averageRating: Math.ceil(calculator[0].averageRating)
    });
  } catch (err) {
    console.error(err)
  }
}

// Call getAverageRating after save
CommentSchema.post('save', function() {
  this.constructor.getAverageRating(this.item)
})

// Call getAverageRating before remove
CommentSchema.pre('remove', function() {
  this.constructor.getAverageRating(this.item)
})

module.exports = mongoose.model("Comment", CommentSchema)