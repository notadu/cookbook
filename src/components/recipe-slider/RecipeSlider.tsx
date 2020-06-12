import React from "react";
import Slider, { Settings } from "react-slick";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import { RECIPE_PAGE_URL } from "../../constants/routes";
import { IRecipe } from "../../models/IRecipe";
import Image from "../image/Image";
import {
  LARGE_DESKTOP_WIDTH,
  MEDIUM_DESKTOP_WIDTH,
  MOBILE_WIDTH,
  TABLET_WIDTH,
} from "../../constants/common";

import "./RecipeSlider.scss";

interface IRecipeSliderProps {
  recipes: IRecipe[];
}

const SLIDER_SETTINGS: Settings = {
  infinite: true,
  autoplaySpeed: 4000,
  autoplay: true,
  slidesToShow: 5,
  arrows: true,
  slidesToScroll: 1,
  className: "recipe-slider",
  responsive: [
    {
      breakpoint: LARGE_DESKTOP_WIDTH,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: MEDIUM_DESKTOP_WIDTH,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: TABLET_WIDTH,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: MOBILE_WIDTH,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

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

    return (
      <Slider {...SLIDER_SETTINGS}>
        {recipes.map((recipe) => (
          <NavLink key={recipe.id} to={`${RECIPE_PAGE_URL}/${recipe.id}`}>
            {this.renderSliderTile(recipe)}
          </NavLink>
        ))}
      </Slider>
    );
  }
}

export default RecipeSlider;
