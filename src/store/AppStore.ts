import { action, observable } from "mobx";
import { FAVORITE_RECIPES_KEY } from "../constants/common";

class AppStore {
  @observable isLoading = false;
  @observable isTouchDevice = false;
  @observable favoriteRecipes: Set<number> = new Set<number>();

  constructor() {
    /* Disable favorite recipe functionality

    const favoriteRecipes = localStorage.getItem(FAVORITE_RECIPES_KEY);
    if (favoriteRecipes) {
      const favoriteRecipesArr: number[] = favoriteRecipes
        .split(",")
        .map((id) => parseInt(id));
      this.favoriteRecipes = new Set<number>(favoriteRecipesArr);
    } */

    if ("ontouchstart" in window) {
      this.isTouchDevice = true;
    }
  }

  @action
  toggleFavoriteRecipe(id: number) {
    if (this.favoriteRecipes.has(id)) {
      this.favoriteRecipes.delete(id);
    } else {
      this.favoriteRecipes.add(id);
    }
    const favoriteRecipesArr = Array.from(this.favoriteRecipes);
    localStorage.setItem(FAVORITE_RECIPES_KEY, favoriteRecipesArr.join(","));
  }
}

export default new AppStore();
