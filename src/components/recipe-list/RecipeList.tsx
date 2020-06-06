import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NavLink } from "react-router-dom";

import RecipeCard from "./RecipeCard";
import { IRecipeShortInfo } from "../../models/IRecipe";
import { RECIPE_PAGE_URL } from "../../constants/routes";

import "./RecipeList.scss";

interface IRecipeListProps {
  recipes: IRecipeShortInfo[];
}

const RecipeList: React.FunctionComponent<IRecipeListProps> = ({ recipes }) => (
  <TransitionGroup component="ul" className="recipe-list">
    {recipes.map((recipe) => (
      <CSSTransition key={recipe.id} timeout={500} classNames="fade">
        <li>
          <NavLink to={`${RECIPE_PAGE_URL}/${recipe.id}`}>
            <RecipeCard {...recipe} />
          </NavLink>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default RecipeList;
