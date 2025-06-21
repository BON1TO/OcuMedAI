const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    imageUrl: {
        type: String, // URL from Cloudinary or other cloud storage
        required: true
    },
    age: Number,
    sex: {
        type: String,
        enum: ['Male', 'Female']
    },
    BMI: Number,
    smokingStatus: {
        type: String,
        enum: ['Yes', 'No', 'Unknown']
    },
    hypertensionHistory: {
        type: String,
        enum: ['Yes', 'No', 'Unknown']
    },
    diabeticRetinopathyLevel: {
        type: String,
        enum: ['No DR', 'Mild', 'Moderate', 'Severe', 'Proliferate'],
        required: true
    },
    hypertensionRisk: {
        type: Number,
        min: 0,
        max: 100
    },
    hba1cLevel: {
        type: Number
    },
    atherosclerosisRisk: {
        type: Number,
        min: 0,
        max: 100
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
