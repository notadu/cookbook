import React, { ReactNode } from "react";
import { screen, render } from "@testing-library/react";
import App from "./App";
import RecipesApi from "../api/RecipesApi";
import { Router } from "react-router-dom";
import history from "../history";

jest.mock("./recipe-slider/RecipeSlider", () => () => (
  <div data-testid="mock-slider" />
));
jest.mock("../api/RecipesApi", () => ({
  getRandomRecipes: jest.fn(),
}));

test("renders title, hero text and no data", async () => {
  (RecipesApi.getRandomRecipes as jest.Mock).mockResolvedValue([]);

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const title = screen.getByText(/My Cookbook/i);
  expect(title).toBeVisible();

  const hero = await screen.findByText(
    /First we eat, then we do everything else/i
  );
  expect(hero).toBeVisible();

  expect(screen.getByText("No recipies found")).toBeVisible();
});
