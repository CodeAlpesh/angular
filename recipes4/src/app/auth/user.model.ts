export class User {
    constructor(public email: string, public userId, private authToken: string, private tokenExpiryDate: Date) {}

    //define property on which you can execute code.
    //usage: user.token
    get token() {
        if(!this.tokenExpiryDate || new Date() > this.tokenExpiryDate ) {
            return null;
        }
        return this.authToken;
    }

}