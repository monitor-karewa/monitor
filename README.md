# Monitor Karewa Web

**Repository name**: *monitor-web*

Welcome to Monitor Karewa Web!

This project aims to present public information regarding contracts made by the government to citizens, through an 
accessible open source platform able to be used by local, state and national government levels in Mexico.
 
Our main objectives are as follows:
- Open Source - Extend the platform's reach through an open source & community-oriented codebase.
- Replicable - Allow any interested form or level of government and institution to host their own instance, while offering tools and guides on how to do so.
- Usability - Empower and enable all citizens with a universally-accessible platform, with a focus on accessibility and user experience.

## Application

The application uses the following underlying technologies:

- **Languages**: Javascript, Pug (formerly Jade) and basic web technologies (CSS, HTML)
- **Platform**: NodeJS
- **Request handling**: ExpressJS
- **Database**: MongoDB
- **ODM**: Mongoose

To install the custom yoeman generator for catalogs run 

    npm link ./generators/generator-mkw
    
To create a catalog run the command

    yo generator-mkw:catalog
    
Then input the name of the catalog and the generator will create the models, controllers and routes for the catalog


# Client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
