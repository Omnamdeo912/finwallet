# finwallet
Simple wallet to receive and transfer money with secure routes 


### encrypting password

- passwords are kept in encrypted format (hash) , now when we hash password , the password with same string will have same hash ...to avoid this and make hashs unique we add a 'salt' with password , salt is like an added string to make hash unique.

- in db you put hashed password and salt state.
- brfore putting the password into the db you need to hash it.
