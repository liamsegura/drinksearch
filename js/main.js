//results list
const list = document.querySelector('.results')
//container with results from search
const previews = document.querySelectorAll('.card-container')
//pop up section
const modal = document.querySelector('.modal')
//bane for popup modal
const modalName = document.querySelector('.modal-name')
//image for popup modal
const modalImage = document.querySelector('.modal-img')
//instructions for popup modal 
const modalInstructions = document.querySelector('.modal-instructions')
//model section
const modelSection = document.querySelector('.model-section')
//
const ingredients = document.querySelector('.name-ingredients')



//empty variable for tracking timeouts
let fetchHandle


// dynamic search bar eventlistner
document.querySelector('input').addEventListener('keyup', () => {
  //check if theres already a timeout, if there is then cancel it
  if(fetchHandle) clearTimeout(fetchHandle)
  // setup a new timeout to run runSearch after 300 milliseconds
  fetchHandle = setTimeout(runSearch, 300)
})


//function to fetch data for input
const runSearch = () => {
  list.innerHTML = ""
    //takes value from the search bar
    let drink = document.querySelector('input').value 
  //replaces spaces with underscores for https
    let drinkUnderscore = drink.replace(/ /g,"_")
    
    if(drink !== ""){
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkUnderscore}`)
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
}
   
//CODE FOR APENDING TO LIST(ALPHABET)
 
// event listener for each letter
['a','b','c','d','e','f','g','h',
'i','j','k','l','m','n','o','p','q',
'r','s','t','v','w','y','z'].forEach(choice => document.getElementById(choice).addEventListener('click', () => letterChoice(choice)))


// function for alphabet selection
function letterChoice(choice){
  list.innerHTML = ""
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${choice}`)
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

//even listener for each spirit
["rum", "gin", "vodka", "tequila", "whisky"].forEach(choice => document.getElementById(choice).addEventListener('click', () => spiritChoice(choice)))

// function for ingredient selection
function spiritChoice(choice){
  list.innerHTML = ""
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${choice}`)
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

  //None alchoholic section
document.getElementById('non-alcoholic').addEventListener('click', () => {
  list.innerHTML = ""
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
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
        })
        

//random drink
document.getElementById('random-drink').addEventListener('click', () => {
  list.innerHTML = ""
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
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
})



//variable to create HTML with a param for data
const createItem = (result) => {

      fetch(` https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ result.idDrink }`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {

        console.log(data.drinks)
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

        
        // event listeners for each results
        newLi.addEventListener('click', () => {

          modelSection.innerHTML = ""

          newLi.addEventListener('click', () => {
          
          
          console.log('test')
            //adds open class to display modal and image
        modal.classList.add('open')
        modalName.classList.add('open')
        modalImage.classList.add('open')
        modalInstructions.classList.add('open')
      })
        //event listener for when clicking off of the pop up modal
        modal.addEventListener('click', (e) => {
        //if the element clicked contains modal class, remove the open class
        if(e.target.classList.contains('modal')){
            modal.classList.remove('open')
            modalName.classList.remove('open')
            modalImage.classList.remove('open')
            modalInstructions.classList.remove('open')
        }
      })

          modelSection.appendChild(createModal(result))
         

          })
          list.appendChild(newLi)
        })
  
      .catch(err => {
        console.log(`error ${err}`)
    })

  }



  const createModal = (result) => {

      let newDiv = document.createElement('div')
          newDiv.className = 'modal'
          newDiv.innerHTML = `<span class="modal-name">${ result.strDrink }</span>
                              <img class="modal-img" src="${ result.strDrinkThumb }" alt="${ result.strDrink }">
                            `
          return newDiv
  }

