const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const notes = require('../../db/db.json');

router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err,data)=> {
                if(err){
                    throw err  
                }else{
                    res.json(data)
                }; 
            });
});
router.post('/api/notes', (req, res) => {
    const newNote = req.body;   
    fs.readFile('./db/db.json', "utf-8", (err,data) =>{
        if(err){
            throw err
        }else{
        const notes = JSON.parse(data);
        notes.push(newNote);
            console.log(notes);  
            notes.forEach((obj, i) => {
            obj.id = i + 1;
        });
        
            fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf-8', (err) => {
                if(err) {
                    throw err;
                }
                console.log("Note has been saved!");
            })
        };      
    }) 
});
router.delete("/api/notes/:id", (req,res) => {
    var id = req.params.id;
    notes.splice(id - 1, 1);
    notes.forEach(obj, i => {
        obj.id = i + 1;
    });
    fs.writeFile("./db/db.json", JSON.stringify(notes), 'utf-8', (err) => {
        if(err){
            throw err;
        }
        console.log("You have deleted a note!");
    });
});
    
    
    
    
    module.exports = router;