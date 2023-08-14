const mongoose = require('mongoose')

const url = process.env.MONGO_URL

mongoose.set('strictQuery',false)
console.log(url)
console.log("connecting to MONGODB")
mongoose.connect(url).
then(result => console.log("connected to MONGODB"))
.catch(error => console.log("error connecting to MONGODB", error.message))

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Note', noteSchema)
