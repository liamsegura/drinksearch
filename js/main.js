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
                      // console.log(result)
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
'r','s','t','v','w','y','z'].forEach(choice => document.getElementById(choice).addEventListener('click', () => letterChoice(choice)))


// function for alphabet selection
function letterChoice(choice){
  list.innerHTML = ""
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${choice}`)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                  // console.log(data.drinks)
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


//even listener for each spirit
["rum", "gin", "vodka", "tequila", "whisky"].forEach(choice => document.getElementById(choice).addEventListener('click', () => spiritChoice(choice)))

// function for ingredient selection
function spiritChoice(choice){
  list.innerHTML = ""
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${choice}`)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                  
                  //clear DOM
                  list.innerHtml = ""
                  data.drinks.forEach(result => {
                    // console.log(getId(result.idDrink))
                    //appends variable createItem with results from data.drinks to list variable
                    list.appendChild(createItem(result))
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
                  //clear DOM
                  list.innerHtml = ""
                  data.drinks.forEach(result => {
                    
                    list.appendChild(createItem(result))
                    // console.log(result.idDrink)

                   
                    
                    // ingredients.appendChild(
                      // let returnedIngredients = fetchID(result.idDrink)
                      
                      // ingredients.appendChild(returnedIngredients)

                  })
                }) 
                .catch(err => {
                    console.log(`error ${err}`)
               });
  })

  //test function




//variable to create HTML with a param for data
const createItem = (result) => {
  // if(result.strIngredient3 === 'null'){
     if(result.strIngredient3 === null){
      result.strIngredient3 = ""
     }
     if(result.strIngredient4 === null){
      result.strIngredient4 = ""
     }
     if(result.strIngredient5 === null){
      result.strIngredient5 = ""
     }
     if(result.strIngredient2 === null){
      result.strIngredient2 = ""
     }
     

      //variable that returns results from fetching ID's

     const id = []
   
      fetch(` https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ result.idDrink }`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data.drinks[0].strInstructions)
        data.drinks.forEach(result => {
          console.log(result)

            
          id = result
        })
      })
      .catch(err => {
        console.log(`error ${err}`)
    })
  console.log(id)

  //HTML for the DOM with results from the param
    let newLi = document.createElement('li');
        newLi.className = 'card-container'
        newLi.innerHTML =  ` <img class="card-img" src="${ result.strDrinkThumb }" alt="${ result.strDrink }">
                             <div class="name-ingredients">   
                                  <span class="drink-name">${ result.strDrink }</span> 
                                  <span class="drink-ingredient">${ id.strIngredient1 }</p>
                                  <span class="drink-ingredient">${ id.strIngredient2 }</p>
                                  <span class="drink-ingredient">${ id.strIngredient3 }</p>
                                  <span class="drink-ingredient">${ id.strIngredient4 }</p>
                                  <span class="drink-ingredient">${ id.strIngredient5 }</p>
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

      return newLi
  }


  
  // const fetchID = (result) => {

  //   let newSpanBlock = fetch(` https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ result }`)
  //   .then(res => res.json()) // parse response as JSON
  //   .then(data => {
  //     // console.log(data.drinks[0].strInstructions)
  //     data.drinks.forEach(result => {
  //       console.log(result.strIngredient1)
  
  //       let newSpan = document.createElement('div')
  //         newSpan.innerHTML = `<span class="drink-ingredient">${ result.strIngredient1 }</p>
  //         <span class="drink-ingredient">${ result.strIngredient2 }</p>
  //         <span class="drink-ingredient">${ result.strIngredient3 }</p>
  //         <span class="drink-ingredient">${ result.strIngredient4 }</p>
  //         <span class="drink-ingredient">${ result.strIngredient5 }</p>`
  
  //         return newSpan
  
  //     })
  //   })
  //   .catch(err => {
  //     console.log(`error ${err}`)
  // })
  // }
  





  // const createModal = (result) => {

  //     let newDiv = document.createElement('div')
  //         newDiv.className = 'modal'
  //         newDiv.innerHTML = `<span class="modal-name">${ result.strDrink }</span>
  //                             <img class="modal-img" src="${ result.strDrinkThumb }" alt="${ result.strDrink }">
  //                           `
  //         return newDiv
  // }

