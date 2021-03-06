import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { observable } from "mobx";
import DOMPurify from "dompurify";
import { v4 as uuid } from "uuid";

import RecipesApi from "../../api/RecipesApi";
import appStore from "../../store/AppStore";
import notificationStore from "../../store/NotificationStore";
import { IRecipe } from "../../models/IRecipe";
import Label from "../label/Label";
import RecipeIngredients from "./RecipeIngredients";
import Image from "../image/Image";

import { ReactComponent as TimerIcon } from "../../assets/icons/timer.svg";

import "./RecipePage.scss";

interface IMatchParams {
  id: string;
}

@observer
class RecipePage extends React.Component<RouteComponentProps<IMatchParams>> {
  @observable recipe: IRecipe | undefined;
  @observable errorMessage = "";

  componentDidMount() {
    const { match } = this.props;
    if (match.params.id) {
      this.getRecipeInfo(match.params.id);
    }
  }

  componentDidUpdate(prevProps: Readonly<RouteComponentProps<IMatchParams>>) {
    const { match } = this.props;
    const { match: prevMatch } = prevProps;
    if (match.params.id !== prevMatch.params.id) {
      this.errorMessage = "";
      this.getRecipeInfo(match.params.id);
    }
  }

  getRecipeInfo = (recipeId: string) => {
    appStore.isLoading = true;
    RecipesApi.getRecipeInfo(recipeId)
      .then((data) => (this.recipe = data))
      .catch((e) => {
        this.errorMessage = "No recipe data";
        notificationStore.notifications.set(uuid(), e.message);
      })
      .finally(() => (appStore.isLoading = false));
  };

  render() {
    return this.recipe ? (
      <article className="recipe">
        {/* Disable favorite recipe functionality */}

        {/*<FavoriteBadge*/}
        {/*  isChecked={appStore.favoriteRecipes.has(this.recipe.id)}*/}
        {/*  onToggle={() => appStore.toggleFavoriteRecipe(this.recipe!.id)}*/}
        {/*/>*/}

        <h2 className="recipe_title">{this.recipe.title}</h2>
        <div className="recipe_image">
          <Image src={this.recipe.image} alt={this.recipe.title} />
        </div>
        <div className="recipe_meta-info">
          <Label className="recipe_cook-time">
            <TimerIcon />
            <span>{this.recipe.readyInMinutes} min</span>
          </Label>
          {this.recipe.veryHealthy && <Label color="blue">Very healthy</Label>}
          {this.recipe.veryPopular && <Label color="red">Very popular</Label>}
          {this.recipe.glutenFree && <Label color="green">Gluten free</Label>}
        </div>
        <div
          className="recipe_summary"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.recipe.summary),
          }}
        />
        {this.recipe.instructions && (
          <div className="recipe_instructions">
            <h3>Instructions</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(this.recipe.instructions),
              }}
            />
          </div>
        )}
        {!!this.recipe.extendedIngredients.length && (
          <RecipeIngredients ingredients={this.recipe.extendedIngredients} />
        )}
      </article>
    ) : (
      <div>{this.errorMessage}</div>
    );
  }
}

export default withRouter(RecipePage);
