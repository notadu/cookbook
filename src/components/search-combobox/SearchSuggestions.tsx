import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { IRecipeSearchResult } from "../../models/IRecipe";
import { RECIPE_PAGE_URL } from "../../constants/routes";

import "./SearchSuggestions.scss";

interface ISearchSuggestionsProps {
  activeSuggestionIndex?: number;
  suggestions: IRecipeSearchResult[];
  onClick: (item: IRecipeSearchResult) => void;
}

const SearchSuggestions: React.FunctionComponent<ISearchSuggestionsProps> = ({
  suggestions,
  onClick,
  activeSuggestionIndex,
}) => (
  <div className="search_suggestions">
    <ul>
      {suggestions.map((item, index) => (
        <li
          className={classNames(
            activeSuggestionIndex !== undefined &&
              activeSuggestionIndex === index &&
              "search_suggestions__active"
          )}
          onClick={() => onClick(item)}
          key={item.id}
        >
          <NavLink to={`${RECIPE_PAGE_URL}/${item.id}`}>{item.title}</NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default SearchSuggestions;
