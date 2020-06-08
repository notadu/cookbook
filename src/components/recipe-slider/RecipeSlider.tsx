import React from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { RECIPE_PAGE_URL } from "../../constants/routes";
import { IRecipe } from "../../models/IRecipe";
import Image from "../image/Image";

import "./RecipeSlider.scss";

interface IRecipeSliderProps {
  recipes: IRecipe[];
}

@observer
class RecipeSlider extends React.Component<IRecipeSliderProps> {
  renderSliderTile = (recipe: IRecipe) => {
    return (
      <div className="slider-tile">
        <div className="slider-tile_image">
          <Image src={recipe.image} alt={recipe.title} />
          <div className="slider-tile_image-overlay" />
        </div>
        <h3 className="slider-tile_title">{recipe.title}</h3>
      </div>
    );
  };
  render() {
    const { recipes } = this.props;

    // TODO
    return (
      <div className="recipe-slider">
        <TransitionGroup component="ul" className="slider-tile-list">
          {recipes.map((recipe) => (
            <CSSTransition classNames="fade" timeout={500}>
              <li key={recipe.id}>
                <NavLink to={`${RECIPE_PAGE_URL}/${recipe.id}`}>
                  {this.renderSliderTile(recipe)}
                </NavLink>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default RecipeSlider;
