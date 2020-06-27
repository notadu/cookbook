import { action, observable } from "mobx";
import { IRecipeSearchResult } from "../models/IRecipe";

class SearchStore {
  @observable query = "";
  @observable suggestions: IRecipeSearchResult[] = [];
  @observable showSuggestions = false;
  @observable activeSuggestionIndex: number | undefined;

  @action
  clearSearchInput() {
    this.query = "";
    this.suggestions = [];
    this.activeSuggestionIndex = undefined;
  }
}

export default new SearchStore();
