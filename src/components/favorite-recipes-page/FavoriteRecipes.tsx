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
      () => {
        this.store.totalRecipesNumber = appStore.favoriteRecipes.size;
        this.loadFavoriteRecipes();
      }
    );
  }

  componentDidMount() {
    this.store.totalRecipesNumber = appStore.favoriteRecipes.size;
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

    this.store.isLoading = true;
    RecipesApi.getRecipesInfo(recipesIds)
      .then((recipes) => {
        this.store.recipes = [...recipes];
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
  };

  render() {
    const {
      recipes,
      isLoading,
      offset,
      totalRecipesNumber,
      recipesNumberPerPage,
      errorMessage,
    } = this.store;
    const visibleRecipes = recipes.slice(
      0,
      offset * recipesNumberPerPage + recipesNumberPerPage
    );

    return (
      <div className="favorite-recipes-page">
        <RecipeList
          recipes={visibleRecipes}
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
