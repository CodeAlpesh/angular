import { Session } from "./session";
import { DbUser } from "./dbuser.model";

class SessionStore {
    private sessions: {[key:string]:Session} = {};

    createSession(sessionId: string, user: DbUser) {
        this.sessions[sessionId] = new Session(sessionId, user);
    }
}

export const sessionStore = new SessionStore();