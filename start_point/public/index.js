var app = function(){
  var url = "https://api.punkapi.com/v2/beers"
  makeRequest(url);
}

var makeRequest = function (url) {
  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.addEventListener("load", function(){
    var beers = JSON.parse(this.responseText)
    // handleBeers(beers)
    handleBeerDrop(beers)
  })
  request.send()
}

// var handleBeers = function (beers) {
//   var ulElement = document.getElementById('list')
//   beers.forEach(function(beer){
//     var listItem = document.createElement('li')
//     listItem.innerText = beer.name
//     list.appendChild(listItem)
//     var image = document.createElement('img')
//     image.src = beer.image_url
//     image.classList.add('img');
//     listItem.appendChild(image)
//   })
// }

var handleBeerDrop = function (beers) {
  addToDrop(beers)
}

var addToDrop = function (beers) {
  var beerDrop = document.getElementById('beer-drop')
  handleBeerDropChange(beerDrop, beers)
  beers.forEach (function (beer) {
    var option = document.createElement('option')
    option.innerText = beer.name
    option.value = beer
    beerDrop.appendChild(option)
  })
}

var handleBeerDropChange = function (beerDrop, beers) {
  beerDrop.addEventListener("change", function(event) {
    var beerObj = beers[event.target.selectedIndex]
    clearBeer()
    renderbeer(beerObj)
  })
}

var renderbeer = function (beerObj) {
  var name = renderName(beerObj.name)
  var image = renderImage(beerObj.image_url)
  var ingredients = renderIngredients(getIngredients(beerObj))
  var startChain = document.getElementById('attach-to-me')
  startChain.appendChild(image)
  startChain.appendChild(name)
  ingredients.forEach( function (ingredient) {
    name.appendChild(ingredient)
  })
}

var getIngredients = function (beerObj) {
  var ingredientArray = []
  var ingredientMalt = []
  var ingredientYeast = []
  var ingredientHops = []
  beerObj.ingredients.malt.forEach(function (malt) {
    ingredientMalt.push(malt.name)
  })
  beerObj.ingredients.hops.forEach (function (hops) {
    ingredientHops.push(hops.name)
  })
  ingredientArray.push(ingredientMalt)
  ingredientArray.push(ingredientHops)
  ingredientArray.push(beerObj.ingredients.yeast)
  return ingredientArray
}

var renderName = function (name) {
  pTag = document.createElement('p')
  pTag.innerText = name
  return pTag
}

var renderImage = function (image_url) {
  img = document.createElement('img')
  img.src = image_url
  return img
}

var renderIngredients = function (ingredientArray) {
  var malt = renderMalt (ingredientArray[0])
  var hops = renderHops (ingredientArray[1])
  var yeast = renderYeast (ingredientArray[2])
  maltUl = document.createElement('ul')
  maltUl.innerText = "MALTS"
  malt.forEach( function (maltLi) {
    maltUl.appendChild(maltLi)
  })
  hopsUl = document.createElement('ul')
  hopsUl.innerText = "HOPS"
  hops.forEach(function (hopsLi) {
    hopsUl.appendChild(hopsLi)
  })
  yeastUl = document.createElement('ul')
  yeastUl.innerText = "YEAST"
  yeastUl.appendChild(yeast)
  var returnArray = []
  returnArray.push(maltUl)
  returnArray.push(hopsUl)
  returnArray.push(yeastUl)
  return returnArray
}
//problem is here
var renderMalt = function (malt){
  var maltArray = []
  // console.log(maltArray)
  malt.forEach(function (maltObj) {
    maltname = document.createElement('li')
    maltname.innerText = maltObj
    maltArray.push(maltname)
  })
  return maltArray
}

var renderHops = function (hops) {
  var hopsArray = []
  hops.forEach(function (hopsObj) {
    hopsName = document.createElement('li')
    hopsName.innerText = hopsObj
    hopsArray.push(hopsName)
  })
  return hopsArray
}

var renderYeast = function (yeast) {
  yeastName = document.createElement('li')
  yeastName.innerText = yeast
  return yeastName
}

var clearBeer = function () {
  var chainStart = document.getElementById('attach-to-me')
  while(chainStart.firstChild){
    chainStart.removeChild(chainStart.firstChild)
  }
}

app()
