const mongoose = require('mongoose');
const Schema = mongoose.Schema

const QuoteSchema = new Schema({
    quote: {
        type: String,
        required: [true, "Quote is required"]
    },
    id: {
        type: Number,
        required: true,
        default: 0
      }
})

const QuoteModel = mongoose.model("Quotes", QuoteSchema)
module.exports = QuoteModel