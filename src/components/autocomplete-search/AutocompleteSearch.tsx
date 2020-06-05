import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";

import RecipesApi from "../../api/RecipesApi";
import { IRecipeSearchResultInfo } from "../../models/IRecipe";
import AutocompleteSearchResults from "./AutocompleteSearchResults";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { RECIPES_PAGE_URL } from "../../constants/routes";
import history from "../../history";
import appStore from "../../store/AppStore";
import searchStore from "../../store/SearchStore";

import "./AutocompleteSearch.scss";
import { ESCAPE_KEY } from "../../constants/common";

@observer
class AutocompleteSearch extends React.Component {
  searchInputRef = React.createRef<HTMLInputElement>();
  searchRef = React.createRef<HTMLDivElement>();
  number = 5;

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  getSearchResults = () => {
    const queryParams = {
      number: this.number,
      query: searchStore.query,
    };

    RecipesApi.getAutocompleteSearchResults(queryParams)
      .then(
        (searchResults) => (searchStore.autocompleteResults = searchResults)
      )
      .catch((error) => appStore.errors.set(uuid(), error.message));
  };

  handleClickOutside = (e: any) => {
    if (searchStore.isSearchFocused) {
      const isOutside = !this.searchRef.current?.contains(e.target);
      if (isOutside) {
        searchStore.removeFocus();
      }
    }
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchStore.query) {
      history.push(`${RECIPES_PAGE_URL}/?search=${searchStore.query}`);
      searchStore.isSearchFocused = false;
      this.searchInputRef.current?.blur();
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchStore.query = e.target.value;

    if (searchStore.query) {
      this.getSearchResults();
    } else {
      searchStore.autocompleteResults = [];
    }
  };

  handleResultClick = (item: IRecipeSearchResultInfo) => {
    searchStore.query = item.title;
    searchStore.autocompleteResults = new Array(item);
    searchStore.isSearchFocused = false;
  };

  handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ESCAPE_KEY) {
      this.searchInputRef.current?.blur();
      searchStore.isSearchFocused = false;
    }
  };

  resetSearchQuery = () => {
    searchStore.resetSearch();
    this.searchInputRef.current?.focus();
  };

  render() {
    return (
      <div
        className="search"
        ref={this.searchRef}
        onKeyDown={this.handleKeyDown}
      >
        <form className="search_form" onSubmit={this.handleSubmit}>
          <button type="submit" value="Search" className="search_button">
            <SearchIcon />
          </button>
          <input
            ref={this.searchInputRef}
            value={searchStore.query}
            onFocus={searchStore.addFocus}
            className="search_input"
            onChange={this.handleInputChange}
          />
          <button
            onClick={this.resetSearchQuery}
            type="button"
            value="Clear search"
            className={classNames(
              "search_button",
              (!searchStore.query || !searchStore.isSearchFocused) &&
                "search_button__hidden"
            )}
          >
            &times;
          </button>
        </form>
        {searchStore.isSearchFocused &&
          !!searchStore.autocompleteResults.length && (
            <AutocompleteSearchResults
              results={searchStore.autocompleteResults}
              onClick={this.handleResultClick}
            />
          )}
      </div>
    );
  }
}

export default AutocompleteSearch;
