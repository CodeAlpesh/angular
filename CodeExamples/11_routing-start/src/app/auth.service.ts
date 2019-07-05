export class AuthService {
    private loggedIn: boolean;

    public isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 800)
            }
        );
        return promise;
    }

    public signin() {
        this.loggedIn = true;
    }

    public signout() {
        this.loggedIn = false;
    }
}