import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";
import { withRouter, RouteComponentProps } from "react-router-dom";

import appStore from "../../store/AppStore";
import RecipesApi from "../../api/RecipesApi";
import { IRecipeShortInfo } from "../../models/IRecipe";
import RecipeList from "../recipe-list/RecipeList";
import IQueryParams from "../../models/IQueryParams";

interface IRecipesProps {
  queryParams?: IQueryParams;
}

@observer
class RecipesPage extends React.Component<IRecipesProps & RouteComponentProps> {
  number = 15;
  @observable recipes: IRecipeShortInfo[] = [];

  @action
  loadRecipes = () => {
    const urlSearchParams = new URLSearchParams(this.props.location.search);
    const searchParam = urlSearchParams.get("search");
    const queryParams: IQueryParams = {
      ...this.props.queryParams,
      number: this.number,
    };

    if (searchParam) {
      queryParams.query = searchParam;
    }

    appStore.isLoading = true;
    this.recipes = [];
    RecipesApi.getRecipes(queryParams)
      .then((recipes) => (this.recipes = [...recipes]))
      .catch((error) => appStore.errors.set(uuid(), error.message))
      .finally(() => (appStore.isLoading = false));
  };

  componentDidMount() {
    this.loadRecipes();
  }

  componentDidUpdate(prevProps: Readonly<RouteComponentProps>) {
    if (
      prevProps.location.pathname !== this.props.location.pathname ||
      prevProps.location.search !== this.props.location.search
    ) {
      this.loadRecipes();
    }
  }

  render() {
    return (
      <section className="recipes-page">
        <RecipeList recipes={this.recipes} />
      </section>
    );
  }
}
export default withRouter(RecipesPage);
