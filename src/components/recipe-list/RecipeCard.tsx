import React from "react";
import DOMPurify from "dompurify";
import classNames from "classnames";
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
const SANITIZER_CONFIG = {
  ALLOWED_TAGS: ["b", "i", "strong", "em", "u"],
};
const MAX_WORDS_NUMBER = 30;

const RecipeCard: React.FunctionComponent<IRecipeItemProps> = observer(
  ({ id, image, title, readyInMinutes, summary = "" }) => {
    const isFullRecipeInfo = !!summary;
    const imageSrc = isFullRecipeInfo ? image : `${BASE_IMAGE_URL}/${image}`;
    const shortSummary = summary
      .split(" ")
      .slice(0, MAX_WORDS_NUMBER)
      .join(" ")
      .concat("...");

    return (
      <div className={classNames("recipe-card", summary && "recipe-card__big")}>
        <div className="recipe-card_image">
          <Image src={imageSrc} alt={title} />
          <div className="recipe-card_image-overlay">
            <ViewIcon />
          </div>
        </div>
        <div className="recipe-card_body">
          <h3 className="recipe-card_title">{title}</h3>
          {summary && (
            <div
              className="recipe-card_summary"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortSummary, SANITIZER_CONFIG),
              }}
            />
          )}
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
