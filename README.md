# Table of content

- [How to setup](#how-to-setup)
- [Code structure](#code-strucutre)
- [API document](#api-document)
  - [Signup](#signup)
  - [Login](#login)
  - [me](#me)
- [Project review](#project-review)

# how to setup

1. clone the project via one of the following method

```
  ### HTTPS
  git clone https://github.com/lingtzuyu780727/graphql-jwt-server.git

  ### SSH
  git clone git@github.com:lingtzuyu780727/graphql-jwt-server.git

```

2. change to the directory

```
  cd graphql-jwt-server
```

3. Install the necessary library

```
  npm i
```

4. check the `.env.example` in `/src` to create your own `.env` file, for example

```
  SERVER_PORT = 3000
  TOKEN_SECRET = helloworld
```

5. **_(Optional)_** if you have not installed `typescript` library before, please intall it

```
  npm install -g typescript

  ### make sure you have installed Node.js before running the following line
  npm install -g ts-node
```

6. under the `src` folder, run `tsc` to build javascript output, the output files will be located in `dist`, you can change it by modifying the parameter below in `tsconfig.json`

```
   "outDir": "./dist"
```

# code structure

- Please see the diagram below, `orange` color represent folders
  ![image](https://user-images.githubusercontent.com/85784074/217018277-9fa97775-00c5-4d2a-9d83-87f06b0dd8ad.png)

# api document

## signup

- `Type`: Mutation
- `args`:
  - `account`: string (use email as account here)
  - `password`: string (use `bcrypt` to hash it and then stored in data.json)
  - `birth`: string (birthday in `YYYY/MM/DD` format, ex: "1930/04/30")
  - `name`: string (user's name)
- Example

  - Request: the following request will return `jwttoken`

  ```
    mutation Mutation {
      signup(account: "test4@gmail.com", name: "test4", password: "12345678",birth:"1940/11/24"){token}
      }
  ```

  - Response

  ```
    {
      "data": {
        "signup": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoidGVzdDRAZ21haWwuY29tIiwiaWF0IjoxNjc1Njk0NDkzLCJleHAiOjE2NzkyOTQ0OTN9.oknqFmyrznJsBXVexnpYC7S858DXeT14KiuaAybqx0E"
        }
      }
    }
  ```

  ***

  ## login

- `Type`: Mutation

- `args`:
  - `account`: string (use email as account here)
  - `password`: string (use the password you set when signup)
- Example 1: **Successfully login**

  - Request: the following request will return `jwttoken`

  ```
    mutation {
      login(account: "test4@gmail.com", password: "12345678") {
        AuthError {
           msg
        }
      token
    }
  }
  ```

  - Response

  ```
    {
      "data": {
        "login": {
          "AuthError": [],
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoidGVzdDRAZ21haWwuY29tIiwiaWF0IjoxNjc1Njk2NzMxLCJleHAiOjE2NzkyOTY3MzF9.gyv_-7ztxvxVWJl3cLgWkMUpQCAz5d4Sx9f02cDmPIc"
        }
      }
    }
  ```

  - Example 2: **Fail when login**
  - Request: the following request will return `AuthError: msg`, if the **_account not exist_** or **_password incorrect_**

  ```
    mutation {
      login(account: "test4@gmail.com", password: "incorrect password") {
        AuthError {
           msg
        }
      token
    }
  }
  ```

  - Response

  ```
    {
      "data": {
        "login": {
          "AuthError": [
            {
              "msg": "Account or password is incorrect"
            }
          ],
          "token": null
        }
      }
    }
  ```

---

## me

- `Type`: Query

- `context`: `Authorization` in the headers is required with **valid jwttoken**
- Example 1: **valid jwt token**

  - Request: the following request will return name, birth and account

  ```
    query {
      me{
        name
        birth
        account
        }
    }
  ```

  - Response

  ```
    {
      "data": {
        "me": {
          "name": "test4",
          "birth": "1940/11/24",
          "account": "test4@gmail.com"
        }
     }
    }
  ```

- Example 1: **invalid jwt token**

- Response

  ```
    {
      "data": {
        "me": null
      }
    }
  ```

# Project review

1. GraphQL ?????????????????? Restful API?????????????????????????????????????????????????????????????????????????????????

   - ????????? JD ????????????????????????**????????????**????????????????????? PM ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? graphQL ?????????????????????????????????????????? GraphQL ????????????????????????????????????????????????????????????
   - GraphQL ?????????????????????`schema`?????????`resolver`???????????????????????????????????????[take-notes.chat](https://github.com/lingtzuyu780727/o-chat-hub)????????????`redux`?????? react ????????????????????????**???????????????????????????????????????????????????????????????**???
   - ??????????????????????????????????????????????????????(??????????????? MVC ?????????)????????????????????? GraphQL ???????????????????????????????????????????????????`utils`?????????`mutation`???`query`????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

2. TypeScript ????????? Javascript ?????? super set (??????????????????????????????????????????)
   - ?????????????????????????????????????????????????????????????????????????????????.env ?????????????????????????????? Promise<>??????????????????????????????????????????????????????????????????`@types/??????`
   - ???????????????????????? typescript ?????????`ESLint`?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? Bug
