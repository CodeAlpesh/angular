## Angular Security MasterClass - Web Security Fundamentals Course

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
                * [2048 bit for prod.]
                * If possible do not use from online services ... generate locally
        * Can be used to identify usesrs and manage expiration.
    * Online converters do not match it: Explained at : 
        * https://stackoverflow.com/questions/50121763/how-to-manually-validate-a-jwt-signature-using-online-tools
        * https://blog.angular-university.io/angular-jwt/
    * cookie is a storage mechanism. Use cookie to store JWT token. Http only, secure only.
        * Cookies are sent by broswe with each request
        * Verify json and extract user from JWT.
        * Create a middleware / filter for the same.
    * TODO:
        * create JWT token generator.
    * Refactoring:
    ```
    export async function createSessionToken(user: DbUser) {
        let token = undefined;
        try {
            token = await signJWT({
                email: user.email
            }, 
            RSA_PRIVATE_KEY, { 
                algorithm: 'RS256',
                issuer: 'ORG1',
                subject: user.id.toString(),
                expiresIn: SESSION_DURATION 
            });
        }catch(err) {
            console.log(err.message);
            throw new Error(err.message);
        }
        return token;
    }

    // Dont need try catch here ... invoker will handle it.
    // Dont add await ... since you are returning promise ... invoker will await the resolution.
    export async function createSessionToken(user: DbUser) {
        return signJWT(
            {
                email: user.email
            }, 
            RSA_PRIVATE_KEY, 
            { 
                algorithm: 'RS256',
                issuer: 'ORG1',
                subject: user.id.toString(),
                expiresIn: SESSION_DURATION 
            }
        );
    }
    ```
#### XSS
##### What attacker can do?
The attacker can perform following from attack-page to target application. 
* Can submit plain POST request on its own page to any domain using FORM. (Need an attack page).
    ```
    <h1>GOTCHA!!!</h1>
    <form id="csrf-form" method='POST' action='https://localhost:4200/api/logout' >
    </form>
    <script>
        setTimeout(function() {
            document.getElementById("csrf-form").submit();
        },2000);
    </script>
    ```
* Can submit get request (Email link)
> GET api's should not make any change. Restrict it to read only. 
    * So that attacker can not perform unauthorized GET activities.

##### What are the limitations?
* Can not make ajax request to another domain - Same Origin Policy - Browser prevents it.
    * Enable CORS on server to allow it.
* Even after sending POST request, attacker can not access response. 
* Can not send JSOn data through POST. The form encoding header (content-type) values are:
    * application/x-www-form-urlencoded (default)
    * multipart/form-data
    * text/plain
    * none of them are json ... So design endpoints that accept JSON only.
* Can not access resposne data. Therefor its called BlindAttack.
* Cannot send custom headers
* Any deviation from allowed restricted request will warrant an HHTP OPTIONS request - preflight to confirm whether its allowed or not. UnAuthorised senders will be denied.
    * What triggers pre-flight: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests
    * Headers ... 
    ```
    Access-Control-Allow-Origin
    Access-Control-Allow-Credentials
    Access-Control-Allow-Headers
    Access-Control-Allow-Methods
    ...
    ```

##### What sis the defence?
> Double Submit Cookie Defense (stateles defense)
* Validate that request is coming from trusted header.
    * Server sends cryptographic random value - non guesable as CSRF cookie.
    * Send that value as CSRF header to request.
    * The header should not be autoforwarded like cookie
    * Compare cookievalue and header value of CSRF token to validate access.
