<img width="849" alt="screen shot 2018-12-24 at 7 55 12 pm" src="https://user-images.githubusercontent.com/21237266/50408282-f86ed980-07b5-11e9-825c-f1d41118c503.png">

Welcome to Bobalish 🎉! - A web app made to help you manage the drinks you order at boba places. If catch yourself saying "what did I order from \_\_\_ again?" Or if you're adventurous and like trying every drink on the menu, this app can help make sure you don't get the same thing again. Want to explore new places around? This app lets you do that!

This app was made to expose me to more Angular development (because alot of my work is in React 😅)

## Tech Stack

- Angular
- GraphQL
- PostgreSQL
- Docker
- Node.js
- [Yelp api](https://www.yelp.com/developers) (For local recommendations)

### Running the app locally

Save yourself some time and download docker [here](https://www.docker.com/get-started)!

You'll also need to have PostgreSQL installed locally.

Next create the folloowing directory structure at the root level of the project
`root/config/dev/api.env`

You can then enter the following in the api.env file 
```
PRISMA_ENDPOINT=http://prisma:4466
PRISMA_SECRET=notsosecret
JWT_SECRET=notsosecret
YELP_KEY=your_api_key
```

**note: you'll need to create a developer account to get an api key from yelp**

Once everything is set up, simply go into the root directory of the project and run: `docker-compose up --build`

This will build everything and the app should start up!
