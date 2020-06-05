import Api from "./Api";
import IQueryParams from "../models/IQueryParams";
import {
  IRecipeShortInfo,
  IRecipeSearchResultInfo,
  IRecipe,
} from "../models/IRecipe";
import { AxiosResponse } from "axios";

const RANDOM_RECIPES_URL = "/recipes/random";
const SEARCH_RECIPES_URL = "/recipes/search";
const AUTOCOMPLETE_SEARCH_URL = "/recipes/autocomplete";
const SEARCH_RECIPE_INFO_URL_PATTERN = "/recipes/{id}/information";

interface ISearchRecipesResponse {
  baseUri: string;
  expires: number;
  isStale: boolean;
  number: number;
  offset: number;
  processingTimeMs: number;
  results: IRecipeShortInfo[];
  totalResults: number;
}

interface IRandomRecipesResponse {
  recipes: IRecipe[];
}

class RecipesApi {
  getRecipes(params?: IQueryParams): Promise<IRecipeShortInfo[]> {
    return Api.get(SEARCH_RECIPES_URL, { params }).then(
      (response: AxiosResponse<ISearchRecipesResponse>) => {
        const { data } = response;
        return data.results;
      }
    );
  }

  getRandomRecipes(params?: IQueryParams): Promise<IRecipe[]> {
    return Api.get(RANDOM_RECIPES_URL, { params }).then(
      (response: AxiosResponse<IRandomRecipesResponse>) => {
        const { data } = response;
        return data.recipes;
      }
    );
  }

  getRecipeInfo(id: string): Promise<IRecipe> {
    const recipeInfoUrl = SEARCH_RECIPE_INFO_URL_PATTERN.replace("{id}", id);
    return Api.get(recipeInfoUrl).then((response) => response.data);
  }

  getAutocompleteSearchResults(
    params: IQueryParams
  ): Promise<IRecipeSearchResultInfo[]> {
    return Api.get(AUTOCOMPLETE_SEARCH_URL, { params }).then(
      (response) => response.data
    );
  }
}

export default new RecipesApi();
