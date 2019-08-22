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
        * Can be used to identify usesrs and manage expiration.
        * 
    * Online converters do not match it: Explained at : 
        * https://stackoverflow.com/questions/50121763/how-to-manually-validate-a-jwt-signature-using-online-tools
        * https://blog.angular-university.io/angular-jwt/
