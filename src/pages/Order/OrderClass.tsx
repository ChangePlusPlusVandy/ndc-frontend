class Order {
    datePlaced: Date;
    status: string; 
    numDiapers: number;
    diaperDist: number[];  

    constructor(datePlaced=new Date(), status="", numNewborn=0, numOne=0, numTwo=0, numThree=0, 
            numFour=0, numFive=0, numSix=0) {
        this.datePlaced = datePlaced; 
        this.status = status; 
        this.diaperDist = [numNewborn, numOne, numTwo, numThree, numFour, numFive, numSix]; 
        this.numDiapers = numNewborn + numOne + numTwo + numThree + numFour + numFive + numSix; 

    }
}

export default Order; 