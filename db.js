const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/recruitment', {
    useNewUrlParser: true
})

const PositionSchema = mongoose.Schema({
    name    : String,
    company : String,
    location: String,
    salary  : String,
    time    : String,
})
const Position       = mongoose.model('Position', PositionSchema)

module.exports = {
    Position,
    mongoose
}
