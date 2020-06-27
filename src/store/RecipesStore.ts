import { action, observable } from "mobx";
import { IRecipeShortInfo } from "../models/IRecipe";

class RecipesStore {
  @observable recipes: IRecipeShortInfo[] = [];
  @observable offset = 0;
  @observable recipesNumberPerPage = 15;
  @observable totalRecipesNumber = 0;
  @observable isLoading = false;
  @observable errorMessage = "";

  @action
  increaseOffset() {
    this.offset += this.recipesNumberPerPage;
  }
}

export default RecipesStore;
