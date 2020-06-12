import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";

import appStore from "../../store/AppStore";
import notificationStore from "../../store/NotificationStore";
import RecipesApi from "../../api/RecipesApi";
import { IRecipe } from "../../models/IRecipe";
import heroImage from "../../assets/hero.jpg";
import Image from "../image/Image";
import RecipeSlider from "../recipe-slider/RecipeSlider";

import "./HomePage.scss";

@observer
class HomePage extends React.Component {
  @observable recipes: IRecipe[] = [];
  number = 10;

  @action
  loadRandomRecipes = () => {
    appStore.isLoading = true;
    RecipesApi.getRandomRecipes({ number: this.number })
      .then((recipes) => (this.recipes = [...recipes]))
      .catch((error) =>
        notificationStore.notifications.set(uuid(), error.message)
      )
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
        {!!this.recipes.length && (
          <section className="popular-recipes">
            <h2>Popular recipes</h2>
            <RecipeSlider recipes={this.recipes} />
          </section>
        )}
      </section>
    );
  }
}

export default HomePage;
