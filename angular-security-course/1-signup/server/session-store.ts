import { Session } from "./session";
import { DbUser } from "./dbuser.model";

//TODO: clear expired sessions from memory.
class SessionStore {
    
    private sessions: {[key:string]:Session} = {};

    createSession(sessionId: string, user: DbUser) {
        this.sessions[sessionId] = new Session(sessionId, user);
    }

    findUserBySessionId(sessionId: string) : DbUser | undefined {
        const session:Session = this.sessions[sessionId];
        return this.isValidSession(sessionId) ? session.user : undefined;
    }

    isValidSession(sessionId: string): boolean {
        const session:Session = this.sessions[sessionId];
        const isValid = session && session.isValid();
        if(!isValid) {
            this.destroySession(sessionId);
        }
        return isValid;
    }

    destroySession(sessionId: string): void {
        delete this.sessions[sessionId];
    }
}

// Only one isntance of SessionStore - singleton
export const sessionStore = new SessionStore();