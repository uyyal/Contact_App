const {Router} =require('express')//Importing the Router class from Express to create a modular, mountable route handler.
const router =Router() //Creating a new router instance to define routes specific to the application
const Cnt_Schema=require('../Schema/schema')//Importing the contact schema from a schema file to interact with the MongoDB database.
const fs=require('fs') //Importing the Node.js fs module to handle file system operations, such as reading CSS files.


//Purpose: Adds a new contact.
router.post('/form',async(req,res)=>{
    await Cnt_Schema.create(req.body)//Creates a new document in MongoDB using Cnt_Schema.create with req.body.
    res.redirect('/',302,{})//Redirects to the root path (/). ,//HTTP Status Codes: Status codes like 302 for redirection are explicit and correct.
})

//Purpose: Handles GET requests to render the contact form.
router.get('/form',(req,res)=>{
    res.render('contact_App/addContact',{title:'Add_Contact'})//Action: Renders the addContact form view with the title Add_Contact.
})  


//Purpose: Serve specific CSS files
router.get('/style',(req,res)=>{
    fs.readFile('./public/contactform.css',(err,data)=>{ //Action: Each route reads its respective CSS file and sends the data as the response.
        if(err) throw err
        res.end(data)
    })
})
router.get('/style1',(req,res)=>{
    fs.readFile('./public/nav.css',(err,data)=>{//Action: Each route reads its respective CSS file and sends the data as the response.
        if(err) throw err
        res.end(data)
    })
})

router.get('/style2',(req,res)=>{
    fs.readFile('./public/edit.css',(err,data)=>{//Action: Each route reads its respective CSS file and sends the data as the response.
        if(err) throw err
        res.end(data)
    })
})

router.get('/style3',(req,res)=>{
    fs.readFile('./public/cnt_list.css',(err,data)=>{ //Action: Each route reads its respective CSS file and sends the data as the response.
        if(err) throw err
        res.end(data)
    })
})

router.get('/style4',(req,res)=>{
    fs.readFile('./public/cnt_info.css',(err,data)=>{ //Action: Each route reads its respective CSS file and sends the data as the response.
        if(err) throw err
        res.end(data)
    })
})




//Purpose: Fetches and displays contact details by ID.
router.get('/contact/:id',async(req,res)=>{
    let id =req.params.id;//Extracts the id from the URL parameter.
    let payload=await Cnt_Schema.findById(id).lean()//Fetches the contact data using Cnt_Schema.findById. //Uses .lean() to convert the MongoDB document into a plain JavaScript object.
    res.render('contact_App/cntinfo',{title:'contact-info',payload}) //Renders the cntinfo view with the contact's data.
})

//Purpose: Displays all saved contacts.
router.get('/allcontacts',async(req,res)=>{
    let payload=await Cnt_Schema.find({}).lean()//Fetches all contacts from MongoDB using Cnt_Schema.find({}).
    res.render('contact_App/cnt_list',{title:'All-Contacts',payload})//Renders the cnt_list view with the list of contacts.
})


//Purpose: Fetches contact details for editing.
router.get('/edit/:id',async(req,res)=>{
    let editData=await Cnt_Schema.findOne({_id:req.params.id}).lean();//Fetches the document by _id from MongoDB using Cnt_Schema.findOne.
    res.render('contact_App/edit',{title:'edit-data',editData})//Renders the edit view with the contact's editable data.
})

// Purpose: Updates an existing contact's details.
router.post('/edit/:id',async(req,res)=>{ //Fetches the contact by _id.
    let editData=await Cnt_Schema.findOne({_id:req.params.id})
    editData.fname=req.body.fname;//Updates the fields (fname, lname, nmbr, loc) with form data (req.body).
    editData.lname=req.body.lname;
    editData.nmbr=req.body.nmbr;
    editData.loc=req.body.loc;
   editData.save() //Saves the updated document back to MongoDB.
   res.redirect('/api/allcontacts',302,{})
})
//Purpose: Deletes a contact by ID.
router.get('/delete/:id',async(req,res)=>{
    await Cnt_Schema.deleteOne({_id:req.params.id}) //Deletes the document with the specified _id using Cnt_Schema.deleteOne.
   res.redirect('/api/allcontacts',302,{})

})




module.exports =router;//Exports the router instance to be used in other parts of the application.

// Additional Notes
// Error Handling: Minimal error handling (throws error directly). Consider adding try-catch blocks for robust handling.
// Static Files: The routes serving CSS files (style, style1, etc.) could use express.static instead for efficiency.
// HTTP Status Codes: Status codes like 302 for redirection are explicit and correct.
// Rendering Views: Uses res.render to serve dynamic views with templates and data.
// This structure ensures modular and organized handling of a contact management system with CRUD operations.