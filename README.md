## Requirements

* ****node version 20****
* ****npm version 10****

---

## set up 

Copy .env.example file and set up your environment 
 
```
cp .env.example .env
```

Generate auth token using your specified `JWT_SECRET`.
Put this token in the header of the request with key named `mit-ms-token`  

To generate the key un comment key generator code in `server.ts` file inside `server.listen` callback, and run the app.
It will print out the key in the console.

Or use the following js code

```
console.log(jwt.sign({serviceName: 'MIT-FE'}, process.env.JWT_SECRET!, { expiresIn: '1000h' }));
```
---
## Useful commands

```
// for starting the app api
npm run start

// for runing the lint checker
npm run lint

// for runing the lint fixer
npm run lint:fix

// for runing the tests 
npm run test
```