const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const fs = require('fs');
var trie = require('trie');


let db = JSON.parse(fs.readFileSync('./Assets/movie.json','utf8'));
var actorsNames = new trie.createTrieFromArray([].concat.apply([],db.map(num => {
    return num.actors
}))).getWords();


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/database/actors', (req,res) => {

    console.log(req.headers);
    var actors = "";
    var page = 0;
    var itemsperpage = 50;
    if(req.headers.actors){
        actors = req.headers.actors;
    }

    if(req.headers.page){
        page = req.headers.page;
    }

    if(req.headers.itemsperpage){
        itemsperpage = req.headers.itemsperpage;
    }

    console.log(itemsperpage)

    
    
    var temp = [];
    if(actors == ""){
        temp = actorsNames
    } else {
        temp = actorsNames.filter(a => a.toLowerCase().replace(/\s/g, '').includes(actors.toLowerCase().replace(/\s/g, '')));
    }
    temp.sort();
    console.log(temp.length);
    res.send(temp.slice(parseFloat(page) * parseFloat(itemsperpage),((parseFloat(page)+1) * parseFloat(itemsperpage))));
    
})

app.get('/database/movies', (req,res) => {

    console.log(req.headers);
    var title = "";
    var page = 0;
    var itemsperpage = 50;
    var imdb = "";
    var actor = "";
    var director = "";
    var year = "";

    if(req.headers.title){
        title = req.headers.title;
    }

    if(req.headers.page){
        page = req.headers.page;
    }

    if(req.headers.itemsperpage){
        itemsperpage = req.headers.itemsperpage;
    }

    if(req.headers.imdb){
        imdb = req.headers.imdb;
    }

    if(req.headers.actor){
        actor = req.headers.actor;
    }

    if(req.headers.director){
        director = req.headers.director;
    }

    if(req.headers.year){
        year = req.headers.year;
    }


    

    var temp = [];
    if(title == "" && imdb == "" && actor == "" && year == "" && director == ""){
        temp = db;
    } else {
        temp = db.filter(a => (a.year == year || year == "") && has(a.directors,director) &&
         has(a.actors,actor) &&  a.imdb_url.includes(imdb) 
         && a.title.toLowerCase().replace(/\s/g, '').includes(title.toLowerCase().replace(/\s/g, '')));
    }
    temp.sort((a,b)=> {
        return a.year- b.year;
    });
    console.log(temp.length);
    res.send(temp.slice(parseFloat(page) * parseFloat(itemsperpage),((parseFloat(page)+1) * parseFloat(itemsperpage))));
    
})

app.get('/database/genres', (req,res) => {
    var page = 0;
    var itemsperpage = 50;

    if(req.headers.page){
        page = req.headers.page;
    }

    if(req.headers.itemsperpage){
        itemsperpage = req.headers.itemsperpage;
    }

    var actor = "";
    var director = "";
    var year = "";

    if(req.headers.actor){
        actor = req.headers.actor;
    }

    if(req.headers.director){
        director = req.headers.director;
    }

    if(req.headers.year){
        year = req.headers.year;
    }

    if(actor == "" && director == ""){
        res.status(400).send({
            message: "You must send a actor or a director!"
        });
        return;
    }

    console.log("searching" + actor + director + year)
    var temp = []; //list of genres
    t = new trie.Trie();
    for(var movie in db){
        if((db[movie].year == year || year =="") && (actor == "" || has(db[movie].actors,actor) && (director == "" || has(db[movie].director,director)))){
            for(var genre in db[movie].genre){
                t.addWord(db[movie].genre[genre]);
            }
        }
    }

    temp = t.getWords().sort();
    console.log(temp.length);
    res.send(temp.slice(parseFloat(page) * parseFloat(itemsperpage),((parseFloat(page)+1) * parseFloat(itemsperpage))));




    
})

app.get('/database/popular', (req,res) => {
    var page = 0;
    var itemsperpage = 50;
    var year;
    if(req.headers.year){
        year = req.headers.year;
    }

    if(req.headers.page){
        page = req.headers.page;
    }

    if(req.headers.itemsperpage){
        itemsperpage = req.headers.itemsperpage;
    }
    var temp = db.filter(a => (year == "" || year == a.year)).sort((a,b) => {
        return - parseFloat(a.users_rating) + parseFloat(b.users_rating);
    });

    console.log(temp.length);
    res.send(temp.slice(parseFloat(page) * parseFloat(itemsperpage),((parseFloat(page)+1) * parseFloat(itemsperpage))));

})

app.get('/database/artiststats', (req,res) => {

    var year = "";
    var artist;
    if(req.headers.year){
        year = req.headers.year;
    }

    if(!req.headers.artist || req.headers.artist == ""){
        res.send("You must provide an artist");
        return;
    } else {
        artist = req.headers.artist
    }

    console.log('searching for: ' +artist + " in year: " + year)
    var temp = db.filter(a => (year == "" || year == a.year) && has(a.actors,artist)).sort((a,b) => {
        return - parseFloat(a.users_rating) + parseFloat(b.users_rating);
    });
    var mean = 0;
    var total = temp.length;
    var counter = 0;
    var median = 0;
    for(var k in temp){
        if(total % 2 == 0 && total / 2 == counter + 1 || total / 2 == counter){
            median += parseFloat(temp[k].users_rating);
        }

        if(total %2 != 0 && (total + 1)/2 == counter){
            median += parseFloat(temp[k].users_rating);
        } 
        mean += parseFloat(temp[k].users_rating);
        counter++;
    }

    mean = mean/total;

    var squaredDifferences = 0;
    for(var k in temp){
        squaredDifferences +=  Math.pow(parseFloat(temp[k].users_rating) - mean,2)  
    }
    ratingArray = new Array(10);
    ratingArray.fill(0);
    for(var i in temp){
        var val = Math.round(temp[i].users_rating);
        ratingArray[val] += 1;
        console.log("User Rating: " + temp[i].users_rating + " Adding to index: " + val )
    }
    squaredDifferences = squaredDifferences/total;
    median = total % 2 == 0 ? median/2 : median;
    console.log("mean: " + mean + ", median: " + median + ", sd: " + squaredDifferences);
    if(mean == null) { res.json({'error': "No Results"}); }
    res.json([{'mean':mean,'median':median,'sd':squaredDifferences,'movies':temp, 'ratingArray':ratingArray}]);
   

})

function has(list,item){
    
    for(var k in list){
        if(list[k].toLowerCase().replace(/\s/g, '').includes(item.toLowerCase().replace(/\s/g, ''))){
            console.log("looking for:" + item + " in list: " + list)
            return true;
        }
    }
    return false;
}

//DONE - get actors, opt filtered on first or last name
//DONE - Search movie on title
//DONE - search by imdb url
//DONE - search specific actor/director via year/name
//DONE - All genres for a specific actor/director
//DONE - getPopular -> more to less (possible subset)
//DONE - moveis in a year ranked and subsetted by popularity
//DONE - descriptive statistics (mean, median and sd) for the popularity of all movies for an artist/director with optional year filter 

app.listen(port, () => console.log('Database Api running on port: ' + port));