import DietType from "../models/DietType";
import CuisineType from "../models/CuisineType";
import IQueryParams from "../models/IQueryParams";

export const HOME_PAGE_URL = "/";
export const RECIPE_PAGE_URL = "/recipe/:id";
export const RECIPES_PAGE_URL = "/recipes";

export const RECIPES_ITALIAN_CUISINE_PAGE_URL = "/recipes/italian-cuisine";
export const RECIPES_VEGETARIAN_DIET_PAGE_URL = "/recipes/vegetarian-diet";
export const RECIPES_SALADS_PAGE_URL = "/recipes/salads";
export const RECIPES_DESSERTS_PAGE_URL = "/recipes/dessert";

export interface IRoute {
  path: string;
  title?: string;
  queryParams?: IQueryParams;
}

export const RECIPE_ROUTES: IRoute[] = [
  {
    path: RECIPES_PAGE_URL,
  },
  {
    path: RECIPES_SALADS_PAGE_URL,
    title: "Salads",
    queryParams: {
      query: "salad",
    },
  },
  {
    path: RECIPES_DESSERTS_PAGE_URL,
    title: "Desserts",
    queryParams: {
      query: "dessert",
    },
  },
  {
    path: RECIPES_ITALIAN_CUISINE_PAGE_URL,
    title: "Italian cuisine",
    queryParams: {
      cuisine: CuisineType.ITALIAN,
    },
  },
  {
    path: RECIPES_VEGETARIAN_DIET_PAGE_URL,
    title: "Vegetarian diet",
    queryParams: {
      diet: DietType.VEGETARIAN,
    },
  },
];