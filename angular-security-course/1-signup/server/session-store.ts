import { Session } from "./session";
import { DbUser } from "./dbuser.model";

//TODO: clear expired sessions from memory.
class SessionStore {
    private sessions: {[key:string]:Session} = {};

    createSession(sessionId: string, user: DbUser) {
        this.sessions[sessionId] = new Session(sessionId, user);
    }

    findUserBySessionId(sessionId: string) : DbUser | undefined {
        let session:Session = this.sessions[sessionId];
        let isValidSession = session && session.isValid();
        return isValidSession ? session.user : undefined;
    }
}

// Only one isntance of SessionStore - singleton
export const sessionStore = new SessionStore();