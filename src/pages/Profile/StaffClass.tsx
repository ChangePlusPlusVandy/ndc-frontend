import User from "./UserClass";

class Staff extends User {
    constructor(firstName="NA", lastName="NA", phoneNumber="NA", email="NA") {
        super(firstName, lastName, phoneNumber, email); 
    }
}

export default Staff; 