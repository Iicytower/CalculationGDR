import { model, Schema } from 'mongoose';

const QuotationSchema = new Schema({
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
            personsQuantity: Number,
        }],
        totalSumOfWorkingDays: Number,
        moneyOfTheDay: Number,
        personsQuantity: Number,
    },
    totalMaterialsSumPrice: Number,
    totalWorkPrice: Number,
    totalPriceNetto: Number,
    totalPriceBrutto: Number,
}, {
    timestamps: true,
});

export default model('Quotation', QuotationSchema);;