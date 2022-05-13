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




// //search bar button
// document.querySelector('button').addEventListener('click', getDrink)
// //search bar enterkey(i know i have done this the long way)
// document.querySelector('input').addEventListener('keypress', function (e) {
//   if (e.key === 'Enter') {
//     getDrink()
//   }
// });

// search bar dynamic type event listener
document.querySelector('input').addEventListener('keyup', getDrink)

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
                  console.log(data.drinks)
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

["rum", "gin", "vodka", "tequila", "whisky"].forEach(choice => document.getElementById(choice).addEventListener('click', () => spiritChoice(choice)))

// function for ingredient selection
function spiritChoice(choice){
  list.innerHTML = ""
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${choice}`)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                  console.log(data.drinks[0])
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
        newLi.classList.add('new-box')
        // event listeners for each results
        newLi.addEventListener('click', () => {

        const createModal = (result) => {

      let newDiv = document.createElement('div')
          newDiv.className = 'modal'
          newDiv.innerHTML = `<span class="modal-name">${ result.strDrink }</span>
                              <img class="modal-img" src="${ result.strDrinkThumb }" alt="${ result.strDrink }">
                              <p class="modal-instructions">${ result.strInstructions }</p>`
  }
        //adds open class to display modal and image
        modal.classList.add('open')
        modalName.classList.add('open')
        modalImage.classList.add('open')
        modalInstructions.classList.add('open')
        //adds data from api into the DOM
        modalImage.src = result.strDrinkThumb
        modalInstructions.innerText = result.strInstructions
        modalName.innerText = result.strDrink
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
      return newLi
  }
  const createModal = (result) => {

      let newDiv = document.createElement('div')
          newDiv.className = 'modal'
          newDiv.innerHTML = `<span class="modal-name">${ result.strDrink }</span>
                              <img class="modal-img" src="${ result.strDrinkThumb }" alt="${ result.strDrink }">
                              <p class="modal-instructions">${ result.strInstructions }</p>`
  }