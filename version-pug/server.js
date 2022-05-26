//jshint esversion:10


const express = require('express');
const { engine } = require('express-handlebars');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));



class Product{
  constructor(title, price, url){
    this.title = title;
    this.price = price;
    this.url = url;

    this.id = undefined;
  }
}

class Api{
  constructor(){
    this.item_list = [];
    this.current_index = 0;
  }

  addItem(item){
    this.current_index++;
    item.id = this.current_index;
    this.item_list.push(item);
  }

  getAll(){
    return this.item_list;
  }
}


app.set('view engine', 'pug');
app.set('views', './views');

const api = new Api();
app.get('/productos', (req, res) =>{
  res.render('main.pug', {'products': api.item_list});
});


app.post('/productos', (req, res) =>{
  const title = req.body.title;
  const price = String(req.body.price);
  const url = req.body.url;

  if(title.length > 0 && price.length > 0 && url.length > 0){
    const newProduct = new Product(title, price, url);
    api.addItem(newProduct);
    res.redirect('/');
  }
  console.log('Se ha agregado un producto.');
});







app.use(express.static('public'));

const port = 8080;

app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
