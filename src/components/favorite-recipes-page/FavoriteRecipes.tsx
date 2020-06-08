import React from "react";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";
import { action, reaction, IReactionDisposer } from "mobx";

import appStore from "../../store/AppStore";
import RecipesStore from "../../store/RecipesStore";
import notificationStore from "../../store/NotificationStore";
import RecipesApi from "../../api/RecipesApi";
import RecipeList from "../recipe-list/RecipeList";

@observer
class FavoriteRecipes extends React.Component {
  store: RecipesStore;
  disposer: undefined | IReactionDisposer;

  constructor(props: {}) {
    super(props);
    this.store = new RecipesStore();
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
    const recipesIdsPerPage = recipesIds.slice(
      this.store.offset,
      this.store.offset + this.store.recipesNumber
    );

    console.log("all: " + recipesIds);
    console.log("loaded: " + recipesIdsPerPage);

    this.store.isLoading = true;
    RecipesApi.getRecipesInfo(recipesIdsPerPage)
      .then((recipes) => {
        this.store.recipes = [...recipes];
        this.store.increaseOffset();
      })
      .catch((error) => notificationStore.notifications.set(uuid(), error))
      .finally(() => (this.store.isLoading = false));
  };

  handleShowMoreClick = () => {
    this.store.increaseOffset();
    this.loadFavoriteRecipes();
  };

  render() {
    const { recipes, isLoading, totalRecipesNumber } = this.store;

    return (
      <div className="favorite-recipes-page">
        <RecipeList
          recipes={recipes}
          isLoading={isLoading}
          totalRecipesNumber={totalRecipesNumber}
          onShowMoreClick={this.handleShowMoreClick}
        />
      </div>
    );
  }
}

export default FavoriteRecipes;
