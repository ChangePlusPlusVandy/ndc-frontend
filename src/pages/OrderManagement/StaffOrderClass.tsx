class StaffOrder {
    orderID: string; 
    partnerName: string; 
    orderDate: Date;
    numDiapers: number;
    diaperDist: number[]; 
    status: string;

    constructor(orderID = "", partnerName = "", datePlaced = new Date(), numDiapers = 0, numNewborn = 0, numOne = 0, numTwo = 0, numThree = 0, numFour = 0, numFive = 0, numSix = 0, status = "Unreviewed") {
        this.orderID = orderID; 
        this.partnerName = partnerName; 
        this.orderDate = datePlaced; 
        this.status = status;
        this.numDiapers = numDiapers;
        this.diaperDist = [numNewborn, numOne, numTwo, numThree, numFour, numFive, numSix]; 
    }
}

export default StaffOrder; 
