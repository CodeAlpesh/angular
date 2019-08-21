
import * as _ from 'lodash';
import { LESSONS, USERS } from "./database-data";
import { DbUser } from './dbuser.model';


class InMemoryDatabase {
    
    userId:number = 0;

    createUser(email: string, passwordDigest: string): DbUser {
        this.userId++
        const id = this.userId;
        var user:DbUser = {
            id,
            email,
            passwordDigest
        };
        USERS[this.userId] = user;
        console.log(user);
        return user;
    }

    findUserBtEmail(email: string): DbUser | undefined {
        const allUsers = _.values(USERS);
        return _.find(allUsers, user => user.email === email);
    }

    readAllLessons() {
        return _.values(LESSONS);
    }


}

export const db = new InMemoryDatabase();