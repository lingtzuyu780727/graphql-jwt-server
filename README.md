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

1. GraphQL 相較於一般的 Restful API，設計上更為彈性，可以自行定義欲搜尋欄位再將資料撈回來

   - 聯想到 JD 上萬達寵物有在做**資料中台**，因為過去在當 PM 時也規畫過資料中台相關的專案，了解其目的是透過資料的打穿及聚合來加速前端許多小前台應用或是商業需求的落地，猜測若採用 graphQL 來實作中台類產品也是因為看中 GraphQL 在彈性特點，可以在不同的資料節點上穿梭。
   - GraphQL 明確定義資料的`schema`以及在`resolver`間取用很類似自己在個人專案[take-notes.chat](https://github.com/lingtzuyu780727/o-chat-hub)上面應用`redux`來做 react 的狀態管理，都是**透過明確的資料流來讓整個專案易於管理及維護**。
   - 過程中嘗試將功能拆分成較好維護的框架(想做出類似 MVC 的架構)，但是因為對於 GraphQL 是第一次實作，所以只能拆分成簡單的`utils`以及將`mutation`和`query`依照目的拆分，未來幾天會想研究這部分如何將整個專案架構調整到易於維護的資料架構。

2. TypeScript 是基於 Javascript 上的 super set (原先一直認為是完全不同的語法)
   - 型別的強制判斷，專案過程中有採到許多型別定義的坑，例如.env 檔讀取出來的變數以及 Promise<>型別的使用，在不同的套件中也需要安裝相對應的`@types/套件`
   - 有了解到如果要讓 typescript 可以在`ESLint`或是一些定義檔中下功夫，讓自己的開發環境更能符合實際需求及順暢，並降低未來因為型別混亂產生的 Bug
