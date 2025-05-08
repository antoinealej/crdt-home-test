# Install
To install the application, run:
```bash
git clone https://github.com/antoinealej/crdt-home-test.git
cd crdt-home-test
cp .env.defaults .env
yarn install
```

# Run dev
To run the deveolpment environment, run:
```bash
yarn dev
```

# Run production
To run the production environment, run:
```bash
yarn build
yarn start
```

# Tests
To run the tests, run:
```bash
yarn test
```

# API
You can import the postman collection to test the project 
- [LWW Element Dictionary API.postman_collection.json](./LWW%20Element%20Dictionary%20API.postman_collection.json) 

# Improvements
### Data storage
The data could be stored into a persistent storage like a database.
### Dictionary creation
We could add a CRUD system to manage the dictionaries.
- `[POST] /api/dictionary`
- `[GET] /api/dictionary/:id`
- `[PATCH] /api/dictionary/:id` (To update the name of the dictionary if we want to give it a name)
- `[DELETE] /api/dictionary/:id`
Then adapt the endpoints for the items management like `[GET] /api/dictionary/:id/lookup/:key`.
### Frontend application
Create a frontend application using for example ReactJs to visualize the dictionaries and interact with it.

# Time spent
Thursday 8
9:03pm — 10:20pm (1 hour 17 minutes)
10:54am — 1:03pm (2 hours 9 minutes)

Total: 3 hours 26 minutes