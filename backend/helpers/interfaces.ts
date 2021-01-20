
interface Materials {
    name: String,
    quantity: Number,
    pricePerItem: Number,
}

interface Difficults {
    name: String,
    converter: Number,
}

interface Activities {
    name: String,
    numberOfWorkingDays: Number,
}

interface Works {
    name: String,
    materials: Materials[],
    activities: Activities[],
    materialsSumPrice: Number,
    sumOfWorkingDays: Number,
}

interface WorkPerMeter {
    materials: Materials[],
    difficults: Difficults[],
    numbersOfMeters: Number,
    pricePerMeter: Number,
}

interface WorkPerDay {
    works: Works[],
    totalSumOfWorkingDays: Number,
    moneyOfTheDay: Number,
}

export interface CalculationInterface {
    name: String,
    owner?: String,
    useMethod: "perDay" | "perMeter",
    workPerMeter?: WorkPerMeter,
    workPerDay?: WorkPerDay,
    totalMaterialsSumPrice?: Number,
    totalWorkPrice?: Number,
    totalPriceNetto?: Number,
    totalPriceBrutto?: Number,
}