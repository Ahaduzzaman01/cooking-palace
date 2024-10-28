// Get references to elements
const searchButton = document.getElementById("search-button");
const mealIngredientsContainer = document.getElementById("meal-ingredients");
const searchInput = document.getElementById("get-input");

// Event listeners for click and "Enter" keypress
searchButton.addEventListener("click", mealData);
searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission or page reload
        mealData();
    }
});

// meal API
function mealData() {
    mealIngredientsContainer.style.display = "none";
    const getInput = searchInput.value;
    searchInput.value = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getInput}`)
        .then(res => res.json())
        .then(data => {
            const mealBoxContainer = document.getElementById("mealBoxContainer");
            mealBoxContainer.innerHTML = "";

            if (data.meals) {
                data.meals.forEach(meal => {
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
                    `;
                    mealBox.innerHTML = mealInfo;
                    mealBoxContainer.appendChild(mealBox);
                });
            } else {
                mealBoxContainer.innerHTML = "<p>No meals found. Please try another search.</p>";
            }
        });
}

// ingredients API
const displayIngredients = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => renderIngredientsInfo(data.meals[0]));
}

// ingredients section
const renderIngredientsInfo = meals => {
    mealIngredientsContainer.style.display = "block";
    let ingredientsList = "";

    // Loop through the ingredients and measures
    for (let i = 1; i <= 20; i++) {
        const ingredient = meals[`strIngredient${i}`];
        const measure = meals[`strMeasure${i}`];

        // Add only non-empty ingredients and measures
        if (ingredient && ingredient.trim() !== "") {
            ingredientsList += `<li>${measure ? measure : ""} ${ingredient}</li>`;
        }
    }

    // Update the inner HTML with the dynamically created list
    mealIngredientsContainer.innerHTML = `
        <div class="col h-100 meal-item-container">
            <div class="card">
                <img src="${meals.strMealThumb}" class="card-img-top">
                <div class="card-body meal-name">
                    <h4 class="card-title ps-2">${meals.strMeal}</h4>
                    <h6 class="ps-2">Ingredients</h6>
                    <ul>${ingredientsList}</ul>
                </div>
            </div>
        </div>
    `;
};

