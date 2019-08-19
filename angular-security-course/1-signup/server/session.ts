import { DbUser } from "./dbuser.model";
import { Moment } from 'moment';
import moment = require("moment");

export class Session {
    
    public static readonly SESSION_VALIDITY = 2;

    private validUpto: Moment;

    constructor(public sessionId: string, public user: DbUser) {
        this.validUpto = moment().add(Session.SESSION_VALIDITY, 'minutes')
    }

    isValid(): boolean {
        return moment().diff(this.validUpto, 'minutes') <= 0;
    }

}