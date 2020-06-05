import React from "react";
import { NavLink } from "react-router-dom";

import { IRecipeSearchResultInfo } from "../../models/IRecipe";
import { getRecipePageUrl } from "../../constants/routes";

import "./AutocompleteSearchResults.scss";

interface ISearchResultsProps {
  results: IRecipeSearchResultInfo[];
  onClick: (item: IRecipeSearchResultInfo) => void;
}

const AutocompleteSearchResults: React.FunctionComponent<ISearchResultsProps> = ({
  results,
  onClick,
}) => (
  <div className="search_results">
    <ul>
      {results.map((item) => (
        <li key={item.id} onClick={() => onClick(item)}>
          <NavLink to={getRecipePageUrl(item.id.toString())}>
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default AutocompleteSearchResults;
