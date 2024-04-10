import User from "./UserClass";

class Partner extends User {
    type: string; 
    numOrdersTotal: number; 
    location: string; 
    address: string; 
    deliveryInstructions: string;

    constructor(firstName="NA", lastName="NA", type="NA", phoneNumber="NA", email="NA", numOrdersTotal=0, location="NA", address="NA", deliveryInstructions="NA") {
        super(firstName, lastName, phoneNumber, email); 
        this.type=type;
        this.numOrdersTotal=numOrdersTotal;
        this.location=location;
        this.address=address; 
        this.deliveryInstructions=deliveryInstructions;
    }
}

export default Partner; 