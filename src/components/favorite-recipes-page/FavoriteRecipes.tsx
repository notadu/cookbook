import React from "react";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";
import { action, reaction, IReactionDisposer } from "mobx";

import appStore from "../../store/AppStore";
import RecipesStore from "../../store/RecipesStore";
import notificationStore from "../../store/NotificationStore";
import RecipesApi from "../../api/RecipesApi";
import RecipeList from "../recipe-list/RecipeList";
import { PAYMENT_REQUIRED_ERROR_CODE } from "../../constants/common";

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
      this.store.offset + this.store.recipesNumberPerPage
    );

    console.log("all: " + recipesIds.length);
    console.log("loaded: " + recipesIdsPerPage.length);

    this.store.isLoading = true;
    RecipesApi.getRecipesInfo(recipesIdsPerPage)
      .then((recipes) => {
        this.store.recipes = [...recipes];
        this.store.increaseOffset();
      })
      .catch((error) => {
        notificationStore.notifications.set(uuid(), error.message);
        if (error.code === PAYMENT_REQUIRED_ERROR_CODE) {
          this.store.errorMessage = `
          Sorry, but number of API calls for free developer plan to 
          Spoonacular is reached. Please, use or test the app tomorrow!`;
        }
      })
      .finally(() => (this.store.isLoading = false));
  };

  handleShowMoreClick = () => {
    this.store.increaseOffset();
    this.loadFavoriteRecipes();
  };

  render() {
    const { recipes, isLoading, totalRecipesNumber, errorMessage } = this.store;

    return (
      <div className="favorite-recipes-page">
        <RecipeList
          recipes={recipes}
          isLoading={isLoading}
          totalRecipesNumber={totalRecipesNumber}
          onShowMoreClick={this.handleShowMoreClick}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}

export default FavoriteRecipes;
