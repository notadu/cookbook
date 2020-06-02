import React from "react";
import IIngredient from "../../models/IIngredient";

import "./RecipeIngredients.scss";

interface IIngredientsProps {
  ingredients: IIngredient[];
}

const INGREDIENTS_IMAGE_URL = "https://spoonacular.com/cdn/ingredients_100x100";

const RecipeIngredients: React.FunctionComponent<IIngredientsProps> = ({
  ingredients,
}) => (
  <section className="recipe_ingredients">
    <h3>Ingredients</h3>
    <ul className="recipe_ingredients-list">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id} className="recipe_ingredients-item">
          <img
            src={`${INGREDIENTS_IMAGE_URL}/${ingredient.image}`}
            alt={ingredient.name}
          />
          <span>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default RecipeIngredients;
