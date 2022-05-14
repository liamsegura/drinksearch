//results list
const list = document.querySelector('.results')

//pop up section
const modalSection = document.querySelector('.model-section')

//empty variable for tracking timeouts
let fetchHandle




// dynamic search bar eventlistener
document.querySelector('input').addEventListener('keyup', () => {
  //check if theres already a timeout, if there is then cancel it
  if(fetchHandle) clearTimeout(fetchHandle)
  // setup a new timeout to run runSearch after 300 milliseconds
  fetchHandle = setTimeout(runSearch, 300)
})

//function to fetch data for input
const runSearch = () => {
    //takes value from the search bar
    let drink = document.querySelector('input').value 
  //replaces spaces with underscores for https
    let drinkUnderscore = drink.replace(/ /g,"_")
    
    if(drink !== ""){
            fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkUnderscore}`)
    }
}
   

 
// event listener for each letter
['a','b','c','d','e','f','g','h',
'i','j','k','l','m','n','o','p','q',
'r','s','t','v','w','y','z'].forEach(choice => document.getElementById(choice).addEventListener('click', () => letterChoice(choice)))


// function for alphabet selection
function letterChoice(choice){

  fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${choice}`)
        
}

//even listener for each spirit
["rum", "gin", "vodka", "tequila", "whisky"].forEach(choice => document.getElementById(choice).addEventListener('click', () => spiritChoice(choice)))


// function for ingredient selection
function spiritChoice(choice){
  
  fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${choice}`)
  
}

  //None alchoholic section
document.getElementById('non-alcoholic').addEventListener('click', () => { 
  
  fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)

})
        

//random drink
document.getElementById('random-drink').addEventListener('click', () => {

  fetchData(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)

})

//clears html, fetches data to grab ID and runs createItem with ID as param
const fetchData = (data) => { 
  
  list.innerHTML = ""

  fetch(data)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    // console.log(data.drinks)
    data.drinks.forEach(result => {
     
      //return random drink to variable 
      createItem(result)

    })
  }) 

  .catch(err => {
      console.log(`error ${err}`)
 });

}


//variable to create HTML with a param for data
const createItem = (result) => {

      fetch(` https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ result.idDrink }`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        // console.log(data.drinks)
        returned = data.drinks[0]

        if(returned.strIngredient3 === null){
          returned.strIngredient3 = ""
         }
         if(returned.strIngredient4 === null){
          returned.strIngredient4 = ""
         }
         if(returned.strIngredient5 === null){
          returned.strIngredient5 = ""
         }
         if(returned.strIngredient2 === null){
          returned.strIngredient2 = ""
         }
         

        let newLi = document.createElement('li');
        newLi.className = 'card-container'
        newLi.innerHTML =  ` <img class="card-img" src="${ returned.strDrinkThumb }" alt="${ result.strDrink }">
                             <div class="name-ingredients">   
                                  <span class="drink-name">${ returned.strDrink }</span> 
                                  <span class="drink-ingredient">${ returned.strIngredient1 }</p>
                                  <span class="drink-ingredient">${ returned.strIngredient2 }</p>
                                  <span class="drink-ingredient">${ returned.strIngredient3 }</p>
                                  <span class="drink-ingredient">${ returned.strIngredient4 }</p>
                                  <span class="drink-ingredient">${ returned.strIngredient5 }</p>
                             </div> `
        newLi.classList.add('new-box')

        let newDiv = document.createElement('div')
              newDiv.className = 'modal'
              newDiv.innerHTML = `<span class="modal-name">${ returned.strDrink }</span>
                                  <img class="modal-img" src="${ returned.strDrinkThumb }" alt="${ returned.strDrink }">
                                `            
                console.log('test')
                  //adds open class to display modal and image

                  newLi.addEventListener('click', () => {

              newDiv.classList.add('open')
              newDiv.classList.add('new-box')
              
              //event listener for when clicking off of the pop up modal
              newDiv.addEventListener('click', (e) => {
              //if the element clicked contains modal class, remove the open class
              if(e.target.classList.contains('modal')){
                  newDiv.classList.remove('open')
                  newDiv.classList.remove('new-box')
              
              }
            })
            modalSection.appendChild(newDiv)
          })
          list.appendChild(newLi)
        })
      .catch(err => {
        console.log(`error ${err}`)
    })
  }

