import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";
import { withRouter, RouteComponentProps } from "react-router-dom";

import notificationStore from "../../store/NotificationStore";
import RecipesStore from "../../store/RecipesStore";
import RecipesApi from "../../api/RecipesApi";
import RecipeList from "../recipe-list/RecipeList";
import IQueryParams from "../../models/IQueryParams";

interface IRecipesProps {
  queryParams?: IQueryParams;
}

@observer
class RecipesPage extends React.Component<IRecipesProps & RouteComponentProps> {
  store: RecipesStore;

  constructor(props: IRecipesProps & RouteComponentProps) {
    super(props);
    this.store = new RecipesStore();
  }

  @action
  loadRecipes = () => {
    const urlSearchParams = new URLSearchParams(this.props.location.search);
    const searchParam = urlSearchParams.get("search");
    const queryParams: IQueryParams = {
      ...this.props.queryParams,
      number: this.store.recipesNumber,
      offset: this.store.offset,
    };

    if (searchParam) {
      queryParams.query = searchParam;
    }

    this.store.isLoading = true;
    RecipesApi.getRecipes(queryParams)
      .then((data) => {
        const { results, offset, totalResults } = data;
        this.store.recipes = [...this.store.recipes, ...results];
        this.store.offset = offset;
        this.store.totalRecipesNumber = totalResults;
      })
      .catch((error) =>
        notificationStore.notifications.set(uuid(), error.message)
      )
      .finally(() => (this.store.isLoading = false));
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

  handleShowMoreClick = () => {
    this.store.increaseOffset();
    this.loadRecipes();
  };

  render() {
    const { recipes, isLoading, totalRecipesNumber } = this.store;
    return (
      <section className="recipes-page">
        <RecipeList
          recipes={recipes}
          isLoading={isLoading}
          totalRecipesNumber={totalRecipesNumber}
          onShowMoreClick={this.handleShowMoreClick}
        />
      </section>
    );
  }
}
export default withRouter(RecipesPage);
