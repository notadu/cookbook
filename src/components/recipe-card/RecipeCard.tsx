import React from "react";
import { observer } from "mobx-react";

import { IRecipeShortInfo } from "../../models/IRecipe";
import Image from "../image/Image";
import FavoriteBadge from "../favorite-badge/FavoriteBadge";
import appStore from "../../store/AppStore";
import { ReactComponent as ViewIcon } from "../../assets/icons/view.svg";
import { ReactComponent as TimerIcon } from "../../assets/icons/timer.svg";

import "./RecipeCard.scss";

const BASE_IMAGE_URL = "https://spoonacular.com/recipeImages/";

interface IRecipeItemProps extends IRecipeShortInfo {
  summary?: string;
}

const RecipeCard: React.FunctionComponent<IRecipeItemProps> = observer(
  ({ id, image, title, readyInMinutes, summary }) => {
    const isFullRecipeInfo = !!summary;
    const imageSrc = isFullRecipeInfo ? image : `${BASE_IMAGE_URL}/${image}`;

    return (
      <div className={"recipe-card"}>
        <div className="recipe-card_image">
          <Image src={imageSrc} alt={title} />
          <div className="recipe-card_image-overlay">
            <ViewIcon />
          </div>
        </div>
        <div className="recipe-card_body">
          <h3 className="recipe-card_title">{title}</h3>
        </div>
        <div className="recipe-card_footer">
          <div className="recipe-card_time">
            <TimerIcon />
            <span>{readyInMinutes} min</span>
          </div>
          <FavoriteBadge
            isChecked={appStore.favoriteRecipes.has(id)}
            onToggle={() => appStore.toggleFavoriteRecipe(id)}
          />
        </div>
      </div>
    );
  }
);

export default RecipeCard;
