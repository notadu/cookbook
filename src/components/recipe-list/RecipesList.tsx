import React from "react";

import { NavLink } from "react-router-dom";

import RecipeCard from "./RecipeCard";
import IRecipe from "../../models/IRecipe";

import "./RecipeList.scss";

interface IRecipeListProps {
  title?: string;
  recipes: IRecipe[];
}

const RecipeList: React.FunctionComponent<IRecipeListProps> = ({
  recipes,
  title,
}) => (
  <section>
    {title && <h2>{title}</h2>}
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <NavLink to={`/recipe/${recipe.id}`}>
            <RecipeCard {...recipe} />
          </NavLink>
        </li>
      ))}
    </ul>
  </section>
);

export default RecipeList;
