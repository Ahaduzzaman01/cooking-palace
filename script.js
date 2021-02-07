// search bar event listener
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", mealData);

// meal API
function mealData(){
    let getInput = document.getElementById("get-input").value;
    document.getElementById('get-input').value = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getInput}`)
    .then(res => res.json())
    .then(data => displayMeal(data));
}

// meal section
const displayMeal = meals =>{
    const mealBoxContainer = document.getElementById("mealBoxContainer");
    mealBoxContainer.innerHTML = "";
    
    meals.meals.forEach(meal => {
        const mealBox = document.createElement("div");
        const mealInfo = `
        <div class="col h-100 meal-item-container">
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top">
            <div class="card-body meal-name">
                <h5 class="card-title text-center">${meal.strMeal}</h5>
                <button class="btn btn-warning align-center view-button" onclick="displayIngredients(${meal.idMeal})">View Details</button>
            </div>
        </div>
    </div>
        `
        mealBox.innerHTML = mealInfo;
        mealBoxContainer.appendChild(mealBox);
    });  
} 

// ingredients API
const displayIngredients = id =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => renderIngredientsInfo(data.meals[0]));
}

// ingredients section
const renderIngredientsInfo = meals => {
    const mealIngredients = document.getElementById("meal-ingredients");
    mealIngredients.innerHTML = `
    <div class="col h-100 meal-item-container">
            <div class="card">
                <img src="${meals.strMealThumb}" class="card-img-top">
            <div class="card-body meal-name">
                <h4 class="card-title ps-2">${meals.strMeal}</h4>
                <h6 class="ps-2">Ingredients</h6>
                <ul>
                    <li>${meals.strMeasure1} ${meals.strIngredient1}</li>
                    <li>${meals.strMeasure2} ${meals.strIngredient2}</li>
                    <li>${meals.strMeasure3} ${meals.strIngredient3}</li>
                    <li>${meals.strMeasure4} ${meals.strIngredient4}</li>
                    <li>${meals.strMeasure5} ${meals.strIngredient5}</li>
                    <li>${meals.strMeasure6} ${meals.strIngredient6}</li>
                    <li>${meals.strMeasure7} ${meals.strIngredient7}</li>
                    <li>${meals.strMeasure8} ${meals.strIngredient8}</li>
                    <li>${meals.strMeasure9} ${meals.strIngredient9}</li>
                    <li>${meals.strMeasure10} ${meals.strIngredient10}</li>
                </ul>
            </div>
         </div>
    </div>
    `
}
