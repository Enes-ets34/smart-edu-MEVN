
# [Click for live](https://smartedu-ets.netlify.app/)



# SmartEdu
SmartEdu is a education portal, teachers and admins can add courses and students can enroll those courses.

## Compiles and hot-reloads for development

### Getting Started
- Clone this repo
- Create MongoDb Cluster and Get Connection MongoDb URI
- Set environment variables in `config.env` under `./server/config`
  * Set `DBURL = <YOUR_MONGO_URI>`
  * Set `EMAIL = <YOUR_GMAIL_EMAIL>`
  * Set `PASSWORD=<YOUR_GMAIL_PASSWORD>`

```bash
$ cd server
npm install
npm run start
$ cd client
npm install
npm run serve
```

### Technologies and Dependieces:

- Javascript
- HTML5
- CSS3
- Bootstrap5

## Vue 3

```bash
"dependencies": {
    "axios": "^1.2.2",
    "core-js": "^3.6.5",
    "vue": "^3.0.0",
    "vue-router": "^4.0.0-0",
    "vuex": "^4.0.0-0"
  },
"devDependencies": {
    "@babel/plugin-proposal-optional-chaining": "^7.20.7",
    "@vue/cli-plugin-babel": "~4.5.13",
    "@vue/cli-plugin-router": "~4.5.13",
    "@vue/cli-plugin-vuex": "~4.5.13",
    "@vue/cli-service": "~4.5.13",
    "@vue/compiler-sfc": "^3.0.0"
  },
```

## Nodejs

```bash
"dependencies": {
    "body-parser": "^1.20.1",
    "connect-mongo": "^4.6.0",
    "cors": "^2.8.5",
    "crypto-js": "^4.1.1",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "mongoose": "^6.8.2",
    "nodemailer": "^6.9.0",
    "slugify": "^1.6.5"
}
```

### Features

- Authorization
- Validation
- Routing
- Reactivity
- Alert Messages
- Login/Register
- Encyrpt passwords
- Filter by Categories (multi select)
- Search By Searchkey (with categories or only text)
- Relationship
- Localstorage

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Smart-Edu-MEVN


[click for live](https://smartedu-ets.netlify.app/)

