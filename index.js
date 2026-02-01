import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    
    res.render("index.ejs");
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {           
        error: error.message,
    });
    }   
}); 
app.get("/drink-details", async (req, res) => {
  const drinkid = req.query.id;
  
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkid}`);
    let drinks = response.data.drinks;
    
    res.render("description.ejs",{drinks});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("description.ejs", {           
        error: error.message,
    });
    } 
}); 
app.get("/drink-glosary", async (req, res) => {
  const letter = req.query.letter;
  console.log(letter)
  
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    let drinks = response.data.drinks;
    
    res.render("index.ejs",{drinks});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {           
        error: error.message,
    });
    } 
}); 
app.get("/drink-random", async (req, res) => {
  
  
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    let drinks = response.data.drinks;
    
    res.render("description.ejs",{drinks});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("description.ejs", {           
        error: error.message,
    });
    } 
}); 
app.get("/drink-random", async (req, res) => {
  
  
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
    let drinks = response.data.drinks;
    
    res.render("description.ejs",{drinks});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("description.ejs", {           
        error: error.message,
    });
    } 
}); 
app.get("/search", async (req, res) => {
  const bebida = req.query.bebida;
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${bebida}`);
    let drinks = response.data.drinks;
    
    res.render("index.ejs", { drinks });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
        error: error.message,
    });
  }
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
