import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import { computed } from "mobx";

import RecipeCard from "../recipe-card/RecipeCard";
import { IRecipeShortInfo } from "../../models/IRecipe";
import { RECIPE_PAGE_URL } from "../../constants/routes";
import { ReactComponent as LoaderIcon } from "../../assets/icons/refresh.svg";

import "./RecipeList.scss";

interface IRecipeListProps {
  recipes: IRecipeShortInfo[];
  isLoading: boolean;
  totalRecipesNumber: number;
  onShowMoreClick?: () => void;
  errorMessage?: string;
}

@observer
class RecipeList extends React.Component<IRecipeListProps> {
  @computed
  get showMoreButton() {
    const {
      totalRecipesNumber,
      recipes,
      isLoading,
      onShowMoreClick,
      errorMessage,
    } = this.props;
    const isButtonVisible =
      totalRecipesNumber > recipes.length && !isLoading && !errorMessage;

    return (
      isButtonVisible && (
        <button className="recipe-list_button" onClick={onShowMoreClick}>
          Show more recipes
        </button>
      )
    );
  }

  @computed
  get preloader() {
    const { isLoading } = this.props;

    return (
      isLoading && (
        <div className="recipe-list_preloader">
          <LoaderIcon />
          <span>Loading recipes...</span>
        </div>
      )
    );
  }

  render() {
    const { recipes, errorMessage } = this.props;
    return (
      <>
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
        {this.preloader}
        {this.showMoreButton}
        {!!errorMessage && !recipes.length && <div>{errorMessage}</div>}
      </>
    );
  }
}

export default RecipeList;
