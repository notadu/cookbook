import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";

import appStore from "../../store/AppStore";
import RecipesApi from "../../api/RecipesApi";
import { IRecipeFullInfo } from "../../models/IRecipe";
import heroImage from "../../assets/hero.jpg";
import RecipeList from "../recipe-list/RecipeList";
import Image from "../image/Image";

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
          <Image src={heroImage} alt="Blueberries on the plate" />
          <figure>
            <blockquote>First we eat, then we do everything else.</blockquote>
            <figcaption>&mdash; M.F.K. Fisher</figcaption>
          </figure>
        </section>
        <section className="popular-recipes">
          <h2>Popular recipes</h2>
          <RecipeList recipes={this.recipes} />
        </section>
      </section>
    );
  }
}

export default HomePage;
