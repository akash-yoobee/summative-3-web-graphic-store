const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
      password: String,
      bio: String,
      photo: String,
      phone: String,
      location: String,
      qualifications: [String],
      memberSince: Number,
      item: [{
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Item' 
      }],
      comment: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
      }]
    },
    {timestamps: true}
)

UserSchema.methods.toJSON = function(){
   return {
      id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      bio: this.bio,
      photo: this.photo,
      phone: this.phone,
      location: this.location,
      qualifications: this.qualifications,
      memberSince: this.memberSince,
      items: this.items,
      comment: this.comment
   } 
}

module.exports = mongoose.model("User", UserSchema)