# Introduction
Conflict Free Replicated Data Types (CRDTs) are data structures that power real time collaborative applications in distributed systems. CRDTs can be replicated across systems, they can be updated independently and concurrently without coordination between the replicas, and it is always mathematically possible to resolve inconsistencies which might result.

# Instructions
Study LWW-Element-Set [Last-Write-Wins-Element-Set](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#LWW-Element-Set_(Last-Write-Wins-Element-Set)) and implement a state-based LWW-Element-Dictionary with test cases.

Similar to LWW-Element-Set, the dictionary variant you are going to implement will store a timestamp for each key-value pair. In addition to the lookup, add and remove operations, the dictionary variant will also allow updating the value of a key. There should be a function to merge two dictionaries. Test cases should be clearly written and document what aspect of CRDT they test. We recommend you to spend no more than 4 hours on this challenge. The provided readings should be sufficient to understand LWW-Element-Set and CRDT on a high level. You are welcome to dig deeper on those but we expect you to come up with the implementation yourself without any help from other open sourced implementations.

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
Thursday 8 May 2025
- 9:03pm — 10:20pm (1 hour 17 minutes)
- 10:54am — 1:03pm (2 hours 9 minutes)

Total: 3 hours 26 minutes