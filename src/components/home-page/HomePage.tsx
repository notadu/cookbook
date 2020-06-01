import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";

import appStore from "../../store/AppStore";
import RecipesApi from "../../api/RecipesApi";
import { IRecipeFullInfo } from "../../models/IRecipe";
import RecipeList from "../recipe-list/RecipesList";

import "./HomePage.scss";

@observer
class HomePage extends React.Component {
  @observable recipes: IRecipeFullInfo[] = [];
  @observable filterParams = {
    number: 5,
  };
  @action
  loadRandomRecipes = () => {
    appStore.isLoading = true;
    RecipesApi.getRandomRecipes(this.filterParams)
      .then((recipes) => (this.recipes = [...recipes]))
      .catch((error) => appStore.errors.set(uuid(), error.message))
      .finally(() => (appStore.isLoading = false));
  };

  componentDidMount() {
    this.loadRandomRecipes();
  }

  render() {
    return (
      <section className="home-page">
        <section className="home-page_hero">
          <figure>
            <blockquote>First we eat, then we do everything else.</blockquote>
            <figcaption>&mdash; M.F.K. Fisher</figcaption>
          </figure>
        </section>
        <RecipeList title="Popular recipes" recipes={this.recipes} />
      </section>
    );
  }
}

export default HomePage;
