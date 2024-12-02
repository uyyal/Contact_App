require('dotenv').config()//This line loads environment variables from a .env file into process.env.
module.exports ={ //This exports the configuration object so it can be used in other parts of the application
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI //Ensure you have a .env file in your project's root directory with variables like PORT and MONGODB_URI.
}