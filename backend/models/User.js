const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        bio: String,
        photo: String,
        phone: String,
        location: String,
        qualifications: [String],
        // A user can have minimum 0 & maximum many Items
        item: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Item' 
        }],
        // A user can have minimum 0 & maximum many Comments
        comment: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment' 
        }]
    },
    {
        timestamps: true
    }
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
       item: this.item,
       comment: this.comment
   } 
}

module.exports = mongoose.model("User", UserSchema)