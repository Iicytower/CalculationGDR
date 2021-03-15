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
            activities: [{
                name: String,
                personsQuantity: Number,
                numberOfWorkingDays: Number,
                moneyOfTheDay: Number,
                materials: [{
                    name: String,
                    quantity: Number,
                    pricePerItem: Number,
                }],
                staffCosts: Number,
                materialsSumPrice: Number,

            }],
            totalMaterialsSumPrice: Number,
            sumOfWorkingDays: Number,
            sum: Number,
        }],
        totalSumOfWorkingDays: Number,
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