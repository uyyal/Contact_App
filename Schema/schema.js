// const mongoose=require("mongoose")
 //or
 const {model,Schema}= require("mongoose") //The combination of Schema and model restricts the data by enforcing rules defined in the schema, ensuring your database has consistent and valid data.

 //const cnt_schema = new Schema({...}, {Timestamp: true})
 //Defines a schema for the cnt_schema collection.
const cnt_schema=new Schema({
    fname:{
        type: String, //Dont provide in double quotes
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    nmbr:{
        type: Number,
        required: true
    },
    loc:{
        type: String,
        required: true,
        enum:['mobile','sim','email']//enum is a validation rule that restricts the values a field can accept. It is short for "enumeration," which defines a set of allowed values for a field. //your location must be saved in mobile,sim,email
    },

},{Timestamp:true}) //Automatically adds createdAt and updatedAt fields to each document.


module.exports =model('cnt_schema',cnt_schema,'cnt_schema') //To restrict plural form we need to write 2 times
//Exports the model for use in other parts of the application.

// Parameters in model:
// First Parameter: 'cnt_schema'
// The name of the model, used internally in Mongoose.
// Second Parameter: cnt_schema
// The schema associated with this model.
// Third Parameter: 'cnt_schema'
// Explicitly specifies the name of the collection in MongoDB.
// Prevents Mongoose from pluralizing the collection name (default behavior).

// Additional Notes
// Why Use enum for loc?

// Ensures that loc only takes predefined values ('mobile', 'sim', 'email').
// Prevents invalid data from being saved in the database.
// Why Use Timestamp: true?

// Automatically tracks the creation and modification times of each document, making it easier to manage and audit data.
// Why Specify the Collection Name Twice?

// By default, Mongoose pluralizes model names (e.g., cnt_schema → cnt_schemas in MongoDB).
// Specifying the collection name explicitly avoids this behavior and ensures the collection is used as defined.