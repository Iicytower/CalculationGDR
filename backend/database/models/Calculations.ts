import { model, Schema } from 'mongoose';

const CalculationSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    owner: {
        required: true,
        type: String,
    },
    useMethod: {
        required: true,
        type: String,
        enum: ["perDay", "perMeter",]
    },
    workPerMeter: {
        materials: [{
            name: String,
            quantity: Number,
            pricePerItem: Number,
        }],
        difficults: [{
            name: String,
            converter: Number,
        }],
        numbersOfMeters: Number,
        pricePerMeter: Number,
    },
    workPerDay: {
        works: [{
            name: String,
            materials: [{
                name: String,
                quantity: Number,
                pricePerItem: Number,
            }],
            activities: [{
                name: String,
                numberOfWorkingDays: Number,
            }],
            materialsSumPrice: Number,
            sumOfWorkingDays: Number,
        }],
        totalSumOfWorkingDays: Number,
        moneyOfTheDay: Number,
    },
    totalMaterialsSumPrice: Number,
    totalWorkPrice: Number,
    totalPriceNetto: Number,
    totalPriceBrutto: Number,
}, {
    timestamps: true,
});


export default model('Calculation', CalculationSchema);;