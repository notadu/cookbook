import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";
import { withRouter, RouteComponentProps } from "react-router-dom";
import appStore from "../../store/AppStore";
import RecipesApi from "../../api/RecipesApi";
import IRecipe from "../../models/IRecipe";
import RecipeList from "../recipe-list/RecipesList";
import IQueryParams from "../../models/IQueryParams";

interface IRecipesProps {
  queryParams?: IQueryParams;
  title?: string;
}

@observer
class RecipesPage extends React.Component<IRecipesProps & RouteComponentProps> {
  @observable filterParams = {
    number: 15,
  };
  @observable recipes: IRecipe[] = [];

  @action
  loadRecipes = () => {
    appStore.isLoading = true;
    this.recipes = [];
    RecipesApi.getRecipes({ ...this.filterParams, ...this.props.queryParams })
      .then((recipes) => (this.recipes = [...recipes]))
      .catch((error) => appStore.errors.set(uuid(), error.message))
      .finally(() => (appStore.isLoading = false));
  };

  componentDidMount() {
    this.loadRecipes();
  }

  componentDidUpdate(prevProps: Readonly<RouteComponentProps>) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.loadRecipes();
    }
  }

  render() {
    const { title } = this.props;

    return (
      <section className="recipes-page">
        <RecipeList title={title} recipes={this.recipes} />
      </section>
    );
  }
}
export default withRouter(RecipesPage);