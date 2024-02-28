class Partner {
    numOrdersMonth: number;
    numOrdersYTD: number;
    status: string;

    /*constructor(datePlaced = new Date(), dateCompleted = new Date(), status = "", numNewborn = 0, numOne = 0, numTwo = 0, numThree = 0,
        numFour = 0, numFive = 0, numSix = 0) {
        this.datePlaced = datePlaced;
        this.dateCompleted = dateCompleted;
        this.status = status;
        this.diaperDist = [numNewborn, numOne, numTwo, numThree, numFour, numFive, numSix];
        this.numDiapers = numNewborn + numOne + numTwo + numThree + numFour + numFive + numSix;
    }*/

    constructor(numOrdersMonth = 0, numOrdersYTD = 0, status = "") {
        this.numOrdersMonth = numOrdersMonth;
        this.numOrdersYTD = numOrdersYTD;
        this.status = status;

    }
    
}

export default Partner; 
