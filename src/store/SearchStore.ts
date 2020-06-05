import { action, computed, observable } from "mobx";
import { IRecipeSearchResultInfo } from "../models/IRecipe";

class SearchStore {
  @observable private _query = "";
  @observable private _autocompleteResults: IRecipeSearchResultInfo[] = [];
  @observable isSearchFocused = false;

  @computed
  get query() {
    return this._query;
  }

  set query(value: string) {
    this._query = value;
  }

  @computed
  get autocompleteResults() {
    return this._autocompleteResults;
  }

  set autocompleteResults(value: IRecipeSearchResultInfo[]) {
    this._autocompleteResults = [...value];
  }

  @action.bound
  addFocus() {
    this.isSearchFocused = true;
  }

  @action.bound
  removeFocus() {
    this.isSearchFocused = false;
  }

  @action.bound
  resetSearch() {
    this._query = "";
    this._autocompleteResults = [];
  }
}

export default new SearchStore();
