import { action, observable } from "mobx";
import { IRecipeShortInfo } from "../models/IRecipe";

class RecipesStore {
  @observable recipes: IRecipeShortInfo[] = [];
  @observable offset = 0;
  @observable recipesNumber = 15;
  @observable totalRecipesNumber = 0;
  @observable isLoading = false;

  @action.bound
  increaseOffset() {
    this.offset += this.recipesNumber;
  }
}

export default RecipesStore;
