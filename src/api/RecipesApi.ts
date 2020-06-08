import Api from "./Api";
import IQueryParams from "../models/IQueryParams";
import {
  IRecipeShortInfo,
  IRecipeSearchResult,
  IRecipe,
} from "../models/IRecipe";
import { AxiosResponse } from "axios";

const RANDOM_RECIPES_URL = "/recipes/random";
const SEARCH_RECIPES_URL = "/recipes/search";
const AUTOCOMPLETE_SEARCH_URL = "/recipes/autocomplete";
const SEARCH_RECIPE_INFO_URL_PATTERN = "/recipes/{id}/information";
const RECIPES_IFO_BULK_URL = "/recipes/informationBulk?ids=";

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

class RecipesApi {
  getRecipes(params?: IQueryParams): Promise<ISearchRecipesResponse> {
    return Api.get(SEARCH_RECIPES_URL, { params }).then(
      (response) => response.data
    );
  }

  getRandomRecipes(params?: IQueryParams): Promise<IRecipe[]> {
    return Api.get(RANDOM_RECIPES_URL, { params }).then(
      (response: AxiosResponse<{ recipes: IRecipe[] }>) => {
        const { data } = response;
        return data.recipes;
      }
    );
  }

  getRecipeInfo(id: string): Promise<IRecipe> {
    const recipeInfoUrl = SEARCH_RECIPE_INFO_URL_PATTERN.replace("{id}", id);
    return Api.get(recipeInfoUrl).then((response) => response.data);
  }

  getRecipesInfo(ids: number[]): Promise<IRecipe[]> {
    const recipeInfoBulkUrl = `${RECIPES_IFO_BULK_URL}${ids}`;
    return Api.get(recipeInfoBulkUrl).then((response) => response.data);
  }

  getAutocompleteSearchResults(
    params: IQueryParams
  ): Promise<IRecipeSearchResult[]> {
    return Api.get(AUTOCOMPLETE_SEARCH_URL, { params }).then(
      (response) => response.data
    );
  }
}

export default new RecipesApi();
