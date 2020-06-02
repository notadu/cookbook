import DishType from "./DishType";
import DietType from "./DietType";
import ImageType from "./ImageType";
import CuisineType from "./CuisineType";
import IIngredient from "./IIngredient";

export default interface IRecipe {
  id: number;
  image: string;
  openLicense: number;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  title: string;
}

export interface IRecipeFullInfo extends IRecipe {
  aggregateLikes: number;
  cheap: boolean;
  creditsText: string;
  cuisines: CuisineType[];
  dairyFree: boolean;
  diets: DietType[];
  dishTypes: DishType[];
  extendedIngredients: IIngredient[];
  gaps: string;
  glutenFree: boolean;
  healthScore: number;
  imageType: ImageType;
  instructions: string; // html with tags
  license: string;
  lowFodmap: boolean;
  originalId?: number;
  pricePerServing: number;
  sourceName: string;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  summary: string; // html with tags
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weightWatcherSmartPoints: number;
  winePairing: any; // {}
}
