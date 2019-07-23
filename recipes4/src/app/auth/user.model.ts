export class User {
    constructor(public email: string, public userId, private _authToken: string, private _tokenExpiryDate: Date) {}

    //define property on which you can execute code.
    //usage: user.token
    get token() {
        if(!this._tokenExpiryDate || new Date() > this._tokenExpiryDate ) {
            return null;
        }
        return this._authToken;
    }

}