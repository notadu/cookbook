import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import debounce from "lodash.debounce";
import { action, observable } from "mobx";

import RecipesApi from "../../api/RecipesApi";
import { IRecipeSearchResult } from "../../models/IRecipe";
import SearchSuggestions from "./SearchSuggestions";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { RECIPE_PAGE_URL, RECIPES_PAGE_URL } from "../../constants/routes";
import history from "../../history";
import notificationStore from "../../store/NotificationStore";

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

  @observable private query = "";
  @observable private suggestions: IRecipeSearchResult[] = [];
  @observable showSuggestions = false;
  @observable activeSuggestionIndex: number | undefined;

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

  @action
  clearSearchInput = () => {
    this.query = "";
    this.suggestions = [];
    this.activeSuggestionIndex = undefined;
    this.searchInputRef.current?.focus();
  };

  @action
  loadSearchResults = () => {
    const queryParams = {
      number: this.number,
      query: this.query,
    };

    RecipesApi.getAutocompleteSearchResults(queryParams)
      .then((searchResults) => (this.suggestions = searchResults))
      .catch((error) =>
        notificationStore.notifications.set(uuid(), error.message)
      );
  };

  @action
  handleClickOutside = (e: any) => {
    if (this.showSuggestions) {
      const isOutside = !this.searchRef.current?.contains(e.target);
      if (isOutside) {
        this.showSuggestions = false;
        this.activeSuggestionIndex = undefined;
      }
    }
  };

  @action
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();

    this.query = e.target.value;

    if (this.query.trim()) {
      this.loadSearchResults();
    }
  };

  @action
  handleSuggestionClick = (item: IRecipeSearchResult) => {
    this.query = item.title;
    this.suggestions = new Array(item);
    this.showSuggestions = false;
  };

  @action
  handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ESCAPE_KEY:
        this.query = this.query.trim();
        this.showSuggestions = false;
        this.searchInputRef.current?.blur();
        break;
      case ARROW_UP_KEY:
        if (this.activeSuggestionIndex !== undefined) {
          this.activeSuggestionIndex =
            this.activeSuggestionIndex === 0
              ? this.suggestions.length - 1
              : this.activeSuggestionIndex - 1;
        } else {
          this.activeSuggestionIndex = this.suggestions.length - 1;
        }
        break;
      case ARROW_DOWN_KEY:
        if (this.activeSuggestionIndex !== undefined) {
          this.activeSuggestionIndex =
            this.activeSuggestionIndex === this.suggestions.length - 1
              ? 0
              : this.activeSuggestionIndex + 1;
        } else {
          this.activeSuggestionIndex = 0;
        }
    }
  };

  @action
  handleInputFocus = () => {
    this.showSuggestions = true;
  };

  @action
  handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    this.query = this.query.trim();

    if (this.query) {
      if (this.activeSuggestionIndex !== undefined) {
        const selectedRecipe = this.suggestions[this.activeSuggestionIndex];
        this.activeSuggestionIndex = undefined;
        this.query = selectedRecipe.title;
        this.suggestions = new Array(selectedRecipe);
        history.push(`${RECIPE_PAGE_URL}/${selectedRecipe.id}`);
      } else {
        history.push(`${RECIPES_PAGE_URL}/?search=${this.query}`);
      }
      this.searchInputRef.current?.blur();
      this.showSuggestions = false;
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
            ref={this.searchInputRef}
            value={this.query}
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
              !this.query && "search_button__hidden"
            )}
          >
            &times;
          </button>
        </form>
        {this.showSuggestions && !!this.suggestions.length && (
          <SearchSuggestions
            suggestions={this.suggestions}
            activeSuggestionIndex={this.activeSuggestionIndex}
            onClick={this.handleSuggestionClick}
          />
        )}
      </div>
    );
  }
}

export default SearchCombobox;
