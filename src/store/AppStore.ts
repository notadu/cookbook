import { action, observable } from "mobx";
import { FAVORITE_RECIPES_KEY, TABLET_WIDTH } from "../constants/common";

class AppStore {
  @observable isLoading = false;
  @observable isTouchDevice = false;
  @observable isMobileWidth = false;
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

    this.initIsTouchDevice();
    this.initIsMobileWidth();
  }

  @action
  initIsMobileWidth() {
    this.isMobileWidth = window.innerWidth < TABLET_WIDTH;
  }

  @action
  initIsTouchDevice() {
    this.isTouchDevice = "ontouchstart" in window;
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
