class User {
    firstName: string; 
    lastName: string; 
    phoneNumber: string; 
    email: string; 

    constructor(firstName="NA", lastName="NA", phoneNumber="NA", email="NA") {
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.phoneNumber = phoneNumber; 
        this.email = email; 
    }
}

export default User; 