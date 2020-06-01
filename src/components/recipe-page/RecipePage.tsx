import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { observable } from "mobx";
import DOMPurify from "dompurify";
import { v4 as uuid } from "uuid";

import RecipesApi from "../../api/RecipesApi";
import appStore from "../../store/AppStore";
import { IRecipeFullInfo } from "../../models/IRecipe";
import NotFoundPage from "../not-found-page/NotFoundPage";

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
      <article>
        <h2>{this.recipe.title}</h2>
        <img src={this.recipe.image} alt={this.recipe.title} />

        <div
          className="recipe-card_summary"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.recipe.summary),
          }}
        />
        <h3>Instructions</h3>
        <div
          className="recipe-card_summary"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.recipe.instructions),
          }}
        />
      </article>
    ) : (
      <div />
    );
  }
}

export default withRouter(RecipePage);
