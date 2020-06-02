import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { observable } from "mobx";
import DOMPurify from "dompurify";
import { v4 as uuid } from "uuid";

import RecipesApi from "../../api/RecipesApi";
import appStore from "../../store/AppStore";
import { IRecipeFullInfo } from "../../models/IRecipe";
import Label from "../label/Label";
import RecipeIngredients from "./RecipeIngredients";

import { ReactComponent as TimerIcon } from "../../assets/icons/timer.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like.svg";

import "./RecipePage.scss";

interface IMatchParams {
  id: string;
}

@observer
class RecipePage extends React.Component<RouteComponentProps<IMatchParams>> {
  @observable recipe: IRecipeFullInfo | undefined;

  componentDidMount() {
    const { match } = this.props;
    if (match.params.id) {
      appStore.isLoading = true;
      RecipesApi.getRecipeInfo(match.params.id)
        .then((data) => (this.recipe = data))
        .catch((e) => appStore.errors.set(uuid(), e.message))
        .finally(() => (appStore.isLoading = false));
    }
  }

  render() {
    return this.recipe ? (
      <article className="recipe">
        <h2 className="recipe_title">{this.recipe.title}</h2>
        <div className="recipe_image">
          <img src={this.recipe.image} alt={this.recipe.title} />
        </div>
        <section className="recipe_meta-info">
          <Label>
            <LikeIcon />
            <span>{this.recipe.aggregateLikes}</span>
          </Label>
          <Label>
            <TimerIcon />
            <span>{this.recipe.readyInMinutes} min</span>
          </Label>
          {this.recipe.veryHealthy && (
            <Label color={"blue"}>Very healthy</Label>
          )}
          {this.recipe.veryPopular && (
            <Label color={"yellow"}>Very popular</Label>
          )}
          {this.recipe.glutenFree && <Label color={"green"}>Gluten free</Label>}
        </section>
        <div
          className="recipe_summary"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.recipe.summary),
          }}
        />
        {this.recipe.instructions && (
          <section className="recipe_instructions">
            <h3>Instructions</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(this.recipe.instructions),
              }}
            />
          </section>
        )}
        {!!this.recipe.extendedIngredients.length && (
          <RecipeIngredients ingredients={this.recipe.extendedIngredients} />
        )}
      </article>
    ) : (
      <div />
    );
  }
}

export default withRouter(RecipePage);
