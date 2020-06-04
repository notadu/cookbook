import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NavLink } from "react-router-dom";

import RecipeCard from "./RecipeCard";
import IRecipe from "../../models/IRecipe";

import "./RecipeList.scss";

interface IRecipeListProps {
  recipes: IRecipe[];
}

const RecipeList: React.FunctionComponent<IRecipeListProps> = ({ recipes }) => (
  <TransitionGroup component="ul" className="recipe-list">
    {recipes.map((recipe) => (
      <CSSTransition key={recipe.id} timeout={500} classNames="fade">
        <li>
          <NavLink to={`/recipe/${recipe.id}`}>
            <RecipeCard {...recipe} />
          </NavLink>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default RecipeList;
