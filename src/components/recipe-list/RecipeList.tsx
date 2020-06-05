import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NavLink } from "react-router-dom";

import RecipeCard from "./RecipeCard";
import { IRecipeShortInfo } from "../../models/IRecipe";
import { getRecipePageUrl } from "../../constants/routes";

import "./RecipeList.scss";

interface IRecipeListProps {
  recipes: IRecipeShortInfo[];
}

const RecipeList: React.FunctionComponent<IRecipeListProps> = ({ recipes }) => (
  <TransitionGroup component="ul" className="recipe-list">
    {recipes.map((recipe) => (
      <CSSTransition key={recipe.id} timeout={500} classNames="fade">
        <li>
          <NavLink to={getRecipePageUrl(recipe.id.toString())}>
            <RecipeCard {...recipe} />
          </NavLink>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

export default RecipeList;
