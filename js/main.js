//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', getDrink)
document.querySelector('input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getDrink()
  }
});
// document.querySelector('.main-container').addEventListener('click', drinkInfo)

function getDrink(){
    let drink = document.querySelector('input').value 
    let drinkUnderscore = drink.replace(/ /g,"_")
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkUnderscore}`)
                  .then(res => res.json()) // parse response as JSON
                  .then(data => {
                    console.log(data.drinks[0])
                    document.querySelector('h2').innerText = data.drinks[0].strDrink
                    document.querySelector('img').src = data.drinks[0].strDrinkThumb
                    document.querySelector('h3').innerText = data.drinks[0].strInstructions
                  })
                  .catch(err => {
                      console.log(`error ${err}`)
                 });
    }

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

const model = document.querySelector('.model')
const previews = document.querySelectorAll('.main-container')
const original = document.querySelector('.full-img')
const imgText = document.querySelector('.caption')

previews.forEach(preview => {
    preview.addEventListener('click', () => {
        model.classList.add('open')
        original.classList.add('open')
        original.src = 'https://via.placeholder.com/650'
    })
})

model.addEventListener('click', (e) => {
    if(e.target.classList.contains('model')){
        model.classList.remove('open')
        original.classList.remove('open')
    }
  })