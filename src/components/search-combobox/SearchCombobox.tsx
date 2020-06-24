import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import debounce from "lodash.debounce";

import RecipesApi from "../../api/RecipesApi";
import { IRecipeSearchResult } from "../../models/IRecipe";
import SearchSuggestions from "./SearchSuggestions";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { RECIPE_PAGE_URL, RECIPES_PAGE_URL } from "../../constants/routes";
import history from "../../history";
import notificationStore from "../../store/NotificationStore";
import searchStore from "../../store/SearchStore";

import {
  ARROW_DOWN_KEY,
  ARROW_UP_KEY,
  ESCAPE_KEY,
} from "../../constants/common";

import "./SearchCombobox.scss";

@observer
class SearchCombobox extends React.Component {
  searchInputRef = React.createRef<HTMLInputElement>();
  searchRef = React.createRef<HTMLDivElement>();
  number = 5;

  constructor(props: {}) {
    super(props);
    this.loadSearchResults = debounce(this.loadSearchResults.bind(this), 1000);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  clearSearchInput = () => {
    searchStore.clearSearchInput();
    this.searchInputRef.current?.focus();
  };

  loadSearchResults = () => {
    const queryParams = {
      number: this.number,
      query: searchStore.query,
    };

    RecipesApi.getAutocompleteSearchResults(queryParams)
      .then((searchResults) => (searchStore.suggestions = searchResults))
      .catch((error) =>
        notificationStore.notifications.set(uuid(), error.message)
      );
  };

  handleClickOutside = (e: any) => {
    if (searchStore.showSuggestions) {
      const isOutside = !this.searchRef.current?.contains(e.target);
      if (isOutside) {
        searchStore.showSuggestions = false;
        searchStore.activeSuggestionIndex = undefined;
      }
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();

    searchStore.query = e.target.value;

    if (searchStore.query.trim()) {
      this.loadSearchResults();
    }
  };

  handleSuggestionClick = (item: IRecipeSearchResult) => {
    searchStore.query = item.title;
    searchStore.suggestions = new Array(item);
    searchStore.showSuggestions = false;
  };

  handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ESCAPE_KEY:
        searchStore.query = searchStore.query.trim();
        searchStore.showSuggestions = false;
        this.searchInputRef.current?.blur();
        break;
      case ARROW_UP_KEY:
        if (searchStore.activeSuggestionIndex !== undefined) {
          searchStore.activeSuggestionIndex =
            searchStore.activeSuggestionIndex === 0
              ? searchStore.suggestions.length - 1
              : searchStore.activeSuggestionIndex - 1;
        } else {
          searchStore.activeSuggestionIndex =
            searchStore.suggestions.length - 1;
        }
        break;
      case ARROW_DOWN_KEY:
        if (searchStore.activeSuggestionIndex !== undefined) {
          searchStore.activeSuggestionIndex =
            searchStore.activeSuggestionIndex ===
            searchStore.suggestions.length - 1
              ? 0
              : searchStore.activeSuggestionIndex + 1;
        } else {
          searchStore.activeSuggestionIndex = 0;
        }
    }
  };

  handleInputFocus = () => {
    searchStore.showSuggestions = true;
  };

  handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    searchStore.query = searchStore.query.trim();

    if (searchStore.query) {
      if (searchStore.activeSuggestionIndex !== undefined) {
        const selectedRecipe =
          searchStore.suggestions[searchStore.activeSuggestionIndex];
        searchStore.activeSuggestionIndex = undefined;
        searchStore.query = selectedRecipe.title;
        searchStore.suggestions = new Array(selectedRecipe);
        history.push(`${RECIPE_PAGE_URL}/${selectedRecipe.id}`);
      } else {
        history.push(`${RECIPES_PAGE_URL}/?search=${searchStore.query}`);
      }
      this.searchInputRef.current?.blur();
      searchStore.showSuggestions = false;
    }
  };

  render() {
    return (
      <div className="search" ref={this.searchRef}>
        <form className="search_form" onSubmit={this.handleFormSubmit}>
          <button type="submit" value="Search" className="search_button">
            <SearchIcon />
          </button>
          <input
            type="search"
            ref={this.searchInputRef}
            value={searchStore.query}
            className="search_input"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleInputFocus}
          />
          <button
            onClick={this.clearSearchInput}
            type="button"
            value="Clear search"
            className={classNames(
              "search_button",
              !searchStore.query && "search_button__hidden"
            )}
          >
            &times;
          </button>
        </form>
        {searchStore.showSuggestions && !!searchStore.suggestions.length && (
          <SearchSuggestions
            suggestions={searchStore.suggestions}
            activeSuggestionIndex={searchStore.activeSuggestionIndex}
            onClick={this.handleSuggestionClick}
          />
        )}
      </div>
    );
  }
}

export default SearchCombobox;
