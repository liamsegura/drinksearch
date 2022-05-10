//pop up section
const model = document.querySelector('.model')
//container with results from search
const previews = document.querySelectorAll('.card-container')
//image for popup model
const original = document.querySelector('.full-img')
//instructions for popup model 
const imgText = document.querySelector('.caption')

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
                    console.log(data.drinks[0])
                    //adds API search results to the DOM
                    document.querySelector('.drink-name').innerText = data.drinks[0].strDrink
                    document.querySelector('.card-img').src = data.drinks[0].strDrinkThumb
                    document.querySelector('.drink-instructions').innerText = data.drinks[0].strInstructions

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


