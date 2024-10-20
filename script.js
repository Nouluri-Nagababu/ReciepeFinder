const searchBtn = document.getElementById("searchBtn");
const ingredientInput = document.getElementById("ingredient");
const recipeList = document.getElementById("recipeList");

const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

async function fetchRecipes() {
  const ingredient = ingredientInput.value;
  if (!ingredient) {
    alert("Please enter an ingredient.");
    return;
  }

  const response = await fetch(API_URL + ingredient);
  const data = await response.json();

  displayRecipes(data.meals);
}

function displayRecipes(meals) {
  recipeList.innerHTML = "";

  if (!meals) {
    recipeList.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe";
    recipeDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
        `;
    recipeList.appendChild(recipeDiv);
  });
}

searchBtn.addEventListener("click", fetchRecipes);
