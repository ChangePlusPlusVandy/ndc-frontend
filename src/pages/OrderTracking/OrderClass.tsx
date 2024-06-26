class Order {
    id: string;
    partner: string; 
    datePlaced: Date;
    dateCompleted: Date;
    status: string;
    numDiapers: number;
    diaperDist: number[];
    location: string;

    constructor(id = "Unknown", partner = "Unknown", datePlaced = new Date(), dateCompleted = new Date(), status = "", numNewborn = 0, numOne = 0, numTwo = 0, numThree = 0,
        numFour = 0, numFive = 0, numSix = 0, location = "Unknown") {
        this.id = id;
        this.partner = partner; 
        this.datePlaced = datePlaced;
        this.dateCompleted = dateCompleted;
        this.status = status;
        this.diaperDist = [numNewborn, numOne, numTwo, numThree, numFour, numFive, numSix];
        this.numDiapers = numNewborn + numOne + numTwo + numThree + numFour + numFive + numSix;
        this.location = location;
    }
}

export default Order; 
