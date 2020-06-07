import React from "react";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";
import { action, observable, reaction, IReactionDisposer } from "mobx";

import appStore from "../../store/AppStore";
import notificationStore from "../../store/NotificationStore";
import { IRecipe } from "../../models/IRecipe";
import RecipesApi from "../../api/RecipesApi";
import RecipeList from "../recipe-list/RecipeList";

@observer
class FavoriteRecipes extends React.Component {
  @observable recipes: IRecipe[] = [];
  disposer: undefined | IReactionDisposer;

  constructor(props: {}) {
    super(props);
    this.disposer = reaction(
      () => Array.from(appStore.favoriteRecipes).map((id) => id),
      () => this.loadFavoriteRecipes()
    );
  }

  componentDidMount() {
    this.loadFavoriteRecipes();
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer();
    }
  }

  @action
  loadFavoriteRecipes = () => {
    const recipesIds = Array.from(appStore.favoriteRecipes.keys());
    let requests = recipesIds.map((id) =>
      RecipesApi.getRecipeInfo(id.toString())
    );

    appStore.isLoading = true;
    Promise.all(requests)
      .then((recipes) => (this.recipes = recipes))
      .catch((error) => notificationStore.notifications.set(uuid(), error))
      .finally(() => (appStore.isLoading = false));
  };

  render() {
    return (
      <div className="favorite-recipes-page">
        <RecipeList recipes={this.recipes} />
      </div>
    );
  }
}

export default FavoriteRecipes;
