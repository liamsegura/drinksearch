//pop up section
const model = document.querySelector('.model')
//container with results from search
const previews = document.querySelectorAll('.card-container')
//image for popup model
const original = document.querySelector('.full-img')
//instructions for popup model 
const imgText = document.querySelector('.caption')
//results list
const list = document.querySelector('.results')

const drinkName = document.querySelector('.drink-name')
const drinkImg = document.querySelector('.card-img')
const drinkInstr = document.querySelector('.drink-instructions')


//event listener for when clicking on container, to activate and add the popup model
previews.forEach(preview => {
  preview.addEventListener('click', () => {
    //adds open class to display as block when clicked
      model.classList.add('open')
      original.classList.add('open')
  })
})
//event listener for when clicking off of the pop up model
model.addEventListener('click', (e) => {
  //if the element clicked contains model class, remove the open class
  if(e.target.classList.contains('model')){
      model.classList.remove('open')
      original.classList.remove('open')
  }
})
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
    
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkUnderscore}`)
                  .then(res => res.json()) // parse response as JSON
                  .then(data => {
                    list.innerHtml = ""
                    data.drinks.forEach(result => {
                    console.log(data.drinks[0])
                    //adds API search results to the DOM
                    // document.querySelector('.drink-name').innerText = data.drinks[0].strDrink
                    // document.querySelector('.card-img').src = data.drinks[0].strDrinkThumb
                    // document.querySelector('.drink-instructions').innerText = data.drinks[0].strInstructions
                    //add show class to containers for search results - display:flex when drink is searched for(originally display:block)
                       previews.forEach(preview => {
                        preview.classList.add('show')
                      })
                      //event listeners for each results
                      previews.forEach(preview => {
                        preview.addEventListener('click', () => {
                          //adds open class to display model and image
                            model.classList.add('open')
                            original.classList.add('open')
                            //adds data from api into the DOM
                            original.src = data.drinks[0].strDrinkThumb
                            imgText.innerText = data.drinks[0].strInstructions
                        })
                      })
                      
                  })
                  .catch(err => {
                      console.log(`error ${err}`)
                 });
    }
                  )}
   //CODE FOR APENDING TO LIST(ALPHABET)
 
  ['a','b','c','d','e','f','g','h',
  'i','j','k','l','m','n','o','p','q',
  'r','s','t','u','v','w','x','y','z'].forEach(choice => document.getElementById(choice).addEventListener('click', () => letterChoice(choice)))

    function letterChoice(choice){
      list.innerHTML = ""
              fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${choice}`)
                    .then(res => res.json()) // parse response as JSON
                    .then(data => {
                      list.innerHtml = ""
                      data.drinks.forEach(result => {
                        console.log(result.strDrink)
                        list.appendChild(createItem(result))
                        // const item = document.createElement('li')
                        // const name = document.createElement('h2')
                        // const img = document.createElement('img')
                        // // const ingredients = document.createElement('p')
                        // img.style.maxWidth = "140px";
                        // img.style.maxWeight = "140px";
                        // img.style.borderRadius = "50%";
                        // img.style.margin = "0"
                        // img.src = object.strDrinkThumb

                        // item.appendChild(img)

                        // name.style.fontSize = "1.1rem";
                        // name.innerText = object.strDrink

                        // item.appendChild(name)

                        // item.classList.add('card-container')
                        // item.style.display = "flex"
                        // item.style.alignItems = "start";
                        // item.style.justifyContent = "start";
                        // item.style.cursor = "pointer";
                        // item.style.padding = "10px";
                        // item.style.borderRadius = "10px";
                        // item.style.backgroundColor = "rgb(233, 232, 232)";
                        // item.style.marginTop = "5px"
                        
                        
                        // list.appendChild(item)
                      })
                    }) 
                    .catch(err => {
                        console.log(`error ${err}`)
                   });
      }
const createItem = (result) => {
        let newLi = document.createElement('li');
            newLi.className = 'card-container'
            newLi.innerHTML = 
            `
            <img class="card-img" src="${ result.strDrinkThumb }" alt="${ result.strDrink }">
            <div class="name-ingredients">
              <h2 class="drink-name">${ result.strDrink }</h2>
              <h3 class="drink-instructions">${ result.strInstructions }</h3>
            </div>
            `
          // event listeners for each results
                        newLi.addEventListener('click', () => {
                          console.log('test')
                          //adds open class to display model and image
                          console.log(img)
                            model.classList.add('open')
                            original.classList.add('open')
                            //adds data from api into the DOM
                            original.src = result.strDrinkThumb
                            imgText.innerText = result.strDrink
                        })
          return newLi
      }
  //   preview.addEventListener('click', () => {
  //     //adds open class to display model and image
  //       model.classList.add('open')
  //       original.classList.add('open')
  //       //adds data from api into the DOM
  //       original.src = data.drinks[0].strDrinkThumb
  //       imgText.innerText = data.drinks[0].strInstructions
  //   })
  // })

//TEST CODE BELOW


// document.querySelector('.main-container').addEventListener('click', drinkInfo)


// function drinkInfo(){
//   let drink = document.querySelector('input').value 
//   let drinkUnderscore = drink.replace(/ /g,"_")
//           fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkUnderscore}`)
//                 .then(res => res.json()) // parse response as JSON
//                 .then(data => {
//                   console.log(data.drinks[0])
//                   document.querySelector('h2').innerText = data.drinks[0].strDrink
//                   document.querySelector('img').src = data.drinks[0].strDrinkThumb
//                   document.querySelector('h3').innerText = data.drinks[0].strInstructions
//                 })
//                 .catch(err => {
//                     console.log(`error ${err}`)
//                });
// }


