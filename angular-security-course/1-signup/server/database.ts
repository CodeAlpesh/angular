
import * as _ from 'lodash';
import { LESSONS, USERS } from "./database-data";
import { DbUser } from './dbuser.model';


class InMemoryDatabase {
    
    userId:number = 0;

    createUser(email: string, password: string): DbUser {
        this.userId++
        const id = this.userId;
        var user:DbUser = {
            id,
            email,
            password
        };
        USERS[this.userId] = user;
        return user;
    }

    readAllLessons() {
        return _.values(LESSONS);
    }


}

export const db = new InMemoryDatabase();