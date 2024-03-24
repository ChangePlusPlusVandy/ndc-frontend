class Partner {
    id: string;
    firstName: string; 
    lastName: string; 
    type: string; 
    phoneNumber: string; 
    email: string; 
    numOrdersTotal: number; 
    location: string; 
    address: string; 

    constructor(id="NA", firstName="NA", lastName="NA", type="NA", phoneNumber="NA", email="NA", numOrdersTotal=0, location="NA", address="NA") {
        this.id=id;
        this.firstName=firstName; 
        this.lastName=lastName;
        this.type=type;
        this.phoneNumber=phoneNumber;
        this.email=email;
        this.numOrdersTotal=numOrdersTotal;
        this.location=location;
        this.address=address; 
    }
}

export default Partner; 