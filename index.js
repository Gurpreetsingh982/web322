const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
require('dotenv').config();

var port = process.env.PORT || 8080;
var posts=[];

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/public', express.static('public'));


app.get('/', (req, res) => {
    res.render("home.ejs", {
        posts: posts,
        
    });
});
app.get('/posts/:activepost',(req,res)=>{
    posts.forEach((post)=>{
        if(_.lowerCase(post.title)==_.lowerCase(req.params.activepost)){
            res.render('post.ejs',{
                title:post.title,
                content:post.content
            });
        }
    });
});

app.get('/compose',(req,res)=>{
    res.render('compose.ejs');
});


app.get('/about',(req,res)=>{
    res.render('about.ejs');
});


app.get('/contact',(req,res)=>{
    res.render('contact.ejs');
});

app.post('/compose',(req,res)=>{
    const post={
        content:req.body.post,
        title:req.body.title,
    }
    posts.push(post);
    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server Up At " + port);
});