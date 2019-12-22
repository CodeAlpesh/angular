### What is an API?
* Application needs data from other apps.
* Retrieve using APIs ... UI changes will have no impact.
* Application Programming Interface
    * Retrive data in form of XML/JSON
    * You need to track courier/package from another vendor
    * Retrive data from another vendor - Seat Availability - Movie Ticket
* Alternative is Screen Scrapig - Error prone
* Contract - Request & Response
* XML-RPC - Remote Procedure Call
* SOAP
* TODO - XML/RPC vs SOAP
* JSON
* Roy Fielding - Restful API
    * Walmart Open API
    * Facebook APIs
    * Twitter APIs

### When is an api RESTful?
* When follows RESTful architectural styles and principles
* 

### REST architectural constraints (6 of them)
* What is it? Is your architecture RESTful
* is HTTP + JSON  = RESTful?
* Follow 6 rules.
    * Client Server principle
        * Server
            * Seperation of Concern
            * Performance
            * Authentication and Authorization
            * Scaling
            * Persistance
            * Data Security
        * Client
            * UX
            * UI
            * Multiple form factor support
        * Decoupled and accessible over RCP/HTTP
        * Can evolve independently as long as Contract is untouched
    * Uniform interface
        * Share common **technical** interface
        * HTTP methods and media types
        * 4 guiding principles
        * Identity of resource - URL
            * HTTP GET http://api.travels.com/vacations
            * HTTP GET http://api.travels.com/vacations/21/reviews
        * Representation of resource
            * XML / JSON / TXT
        * Sel descriptive message - Enough metadata
            * HTTP Headers
                * **Server**
                * Content-Type
                * Status Code - 200, 404
                * Host
                * **Client**
                * Accept - application/json
        * Hypermedia
            * Possible actions that client can take
            * HATEOS- Hypermedia As The Engine Of Application State
            * i.e. Response = Data + Actions
            * Spring HAL
    * Statelessness
        * Even session is not allowed.
        * **Negatives**
        * Chattiness
        * Performance degrade
        * Higher traffic
    * Caching - Use HTTP headers for cachin
        * Couter balance effects of statelessness
        * Performance
        * Scalability
        * Server informs client - cacheable or non-cacheable
        * Cache-Control header - 
            * private;max-age=60 (onlly for individual client for 60 seconds max)
        * HTTP header
            * Expires
            * Last-Modified header
            * ETag - Uniq ID associated with response for same URL
    * Layered System
        * Architecture consist of multiple layers
        * Hides complexity from client
        * Scale bottlenecks individually
        * Evolve with minimal disruption
    * Code on Demand (optional) - Can send Data + Code(Executed on clinet)

 * Measure RESTfulness of enterprise.
    * Richardson Maturity Model (Score 0 to 3)

* REST API Design
* base URL
    * Avoid name www.acme.com in base URL
    * if possible use subdomain - https://api.twitter.com
    * https://api.walmartlabs.com - seperate domain
* Resource
    * collection  /items      /people      /programs
    * Individual  /items/{id} /people/{id} /programs/{id}
    * Use NOUNS to identify resource - Object, Person, thing etc.
    * Do not use VERBS (actions - GetSomething etc)
    * Use Plurals
    * NO /GetVacationPackagee - YES /vacations
* What about API operations that is not CRUD. But an Action.
    * Example calculateTax
    * GenerateReport
    * Uber: /estimate/price - Its not a crud operation
    * Twitter: /friendship/lookup
    * Walmart: /search?query
    * Its OK to use action as resource hierarchy / query param.
    * Book a vacation:
        * POST /vacations/{id}/book
    * Search by Destination & nights:
        * GET /vacations/destination/{dest}/nights/{nights}
        * GET /vacations/search?destination=goa&nights=4
* Associations - relatedresources 
    * facebook - /me/photos - me is assumed to be logged in user
    * walmart - GET /items/{id}/reviews
    * Twitter - mutes/users/list
    * avoid deep nesting
    * Use sub queries
    * Check 4-2.PNG
* Use standard HTTP response codes 

* What to cache?
    * Dynamic Data:
        * Speed of change
        * Time sensitivity
        * Security 
    * Stock Market 
    * News
    * Customer Data
    * New Deals .... Plans ...
    * Who controls the cachinh - API LAYEE
    * Use HTTP Cache Control Directives for client side caching.
* Partial Responses
    * What is it?
        * Consumer specifies - what response fields are required
    * It puts API consumer in control of what response makes sense to them.
    * Browser client would like all data for a package
    * Mobile client would ike to show lesser data.
        * I can ignore full response
        * Not optimal usage of resources
            * CPU, Memory, Bandwidth
    *  Consumer controls granularity
    * Common API version for all consumers
* Pagination
    * optimal usage of resources
        * CPU, Memory, Bandwidth

* Security
    * Authentication
        * Basic Auth
            * Credentials are sent in HTTP header
            * Authorization: [val is Base64 encoded User:Password]
            * Need HTTPS 
            * Issues:

* API Security
    * Reffer OWASP for security threats and solutions
    * Functional Attack
        * SQL Injection
        * Fuzzing - Try random data as input for forms/apis
        * CSF - Using scripts make form submissions / API calls to target app.
        * Session / Token hijacking

* API Management
    * Developer Portal
        * Build vs Buy
            * Apigee, mulesoft
            * Swagger
        * Documentation - Docs, SampleCode, SDK, Try It feature for API,  etc. 
            * Sample Data (Example movies database for Neo4J)
            * Uber documentation - SDK
        * Provisioning of access
                * Manual
                * Self Service - Automatted
        * Support - FAQs, Best Practices, Community
    * Security
        * Mange Key/secter, OAuth
        * Exa: apigee
        * Invalid key for misbehaving client
        * Based on key find
            * Traffic / usage
            * Analytics
        * User/App Developer/Client manages key/secret (Account)
            * Create / Renew / Delete
        * Key storage management solutions (Build vs Buy)
    * Traffic Management for Public APIs
        * Response Time Consistency
            * Database profiling
                * 100 calls/sec in 1 sec
                * > 105 calls/sec in 5 sec
            * Volume:
                * App#1 - 30 calls / sec 
                * App#2 - 30 calls / sec
                * ... what is calls spike to 80calls/sec for app1 ... app2 also suffrers
                * As an API provider limit the APP1 so that others will not suffer.
        * Service Level Agreement
            * Number of calls
            * Concurrenct
            * Response time
            * Enforcement of SLA is important 
        * Protecting the Backend
            * DOS ... 
                * Must be managed at the Edge of server ...
                * Should not reach the API
                * Trafic Mgmnt Policy TA the edge
                    * Quota - Max # of calls per unit time. (per client)
                    * Rate limiting - Concurrent connections to API (across all clients)
                    * Spike Arrest - Protects from DOS / spike
    * API Analytics
        * Service Improvements
        * Analyse errorrs
        * understand threats/attacks
        * Business Support
        * Metrics
            * Performance
                * Response Time
                * Throughput
                Peak/Valleys
            * Errors
                * API errorr rate
                * Backend error rate
                * Policy error rate - Tune it
            * SLA metric
                * 
        * Visibility
            * Usage
                * Which app is using to max
                * API usage
                * Regionwise usage
                * Device types
        * Transactions
            * Specific to business
                * Exa: Origin of Sales
* API product and monetization
    * Treat API as product
        * SLA monitoring and enforcment
        * Subscription Management
        * Reporting
        * Automated Access 

### Tools
* mlab for mongo db data



