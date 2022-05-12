//results list
const list = document.querySelector('.results')
//container with results from search
const previews = document.querySelectorAll('.card-container')
//pop up section
const model = document.querySelector('.model')
//bane for popup model
const modelName = document.querySelector('.model-name')
//image for popup model
const modelImage = document.querySelector('.model-img')
//instructions for popup model 
const modelInstructions = document.querySelector('.model-instructions')




//search bar button
document.querySelector('button').addEventListener('click', getDrink)
//search bar enterkey(i know i have done this the long way)
document.querySelector('input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getDrink()
  }
});

//fetch function
function getDrink(){
  //takes value from the search bar
    let drink = document.querySelector('input').value 
  //replaces spaces with underscores for https
    let drinkUnderscore = drink.replace(/ /g,"_")
    
    if(drink !== ""){
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkUnderscore}`)
                  .then(res => res.json()) // parse response as JSON
                  .then(data => {
                    list.innerHTML = ""
                    data.drinks.forEach(result => {
                      console.log(result.strDrink)
                      list.appendChild(createItem(result))
                    })
                  }) 
                      .catch(err => {
                        console.log(`error ${err}`)
                   });
      }
    }
   
   
//CODE FOR APENDING TO LIST(ALPHABET)
 
// event listener for each letter
['a','b','c','d','e','f','g','h',
'i','j','k','l','m','n','o','p','q',
'r','s','t','u','v','w','x','y','z'].forEach(choice => document.getElementById(choice).addEventListener('click', () => letterChoice(choice)))


// function for alphabet selection
function letterChoice(choice){
  list.innerHTML = ""
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${choice}`)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                  //clear DOM
                  list.innerHtml = ""
                  data.drinks.forEach(result => {
                    //appends variable createItem with results from data.drinks to list variable
                    list.appendChild(createItem(result))
                  })
                }) 
                .catch(err => {
                    console.log(`error ${err}`)
               });
  }

//variable to create HTML with a param for data
const createItem = (result) => {
  //HTML for the DOM with results from the param
    let newLi = document.createElement('li');
        newLi.className = 'card-container'
        newLi.innerHTML =  ` <img class="card-img" src="${ result.strDrinkThumb }" alt="${ result.strDrink }">
                             <div class="name-ingredients">   
                                  <span class="drink-name">${ result.strDrink }</span>   
                                  <p class="drink-instructions">${ result.strInstructions }</p> 
                             </div> `

        // event listeners for each results
        newLi.addEventListener('click', () => {
        //adds open class to display model and image
        model.classList.add('open')
        modelName.classList.add('open')
        modelImage.classList.add('open')
        modelInstructions.classList.add('open')
        //adds data from api into the DOM
        modelImage.src = result.strDrinkThumb
        modelInstructions.innerText = result.strInstructions
        modelName.innerText = result.strDrink
      })
        //event listener for when clicking off of the pop up model
        model.addEventListener('click', (e) => {
        //if the element clicked contains model class, remove the open class
        if(e.target.classList.contains('model')){
            model.classList.remove('open')
            modelName.classList.remove('open')
            modelImage.classList.remove('open')
            modelInstructions.classList.remove('open')
        }
      })
      return newLi
  }