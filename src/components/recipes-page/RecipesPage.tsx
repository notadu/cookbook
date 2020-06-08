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
import { PAYMENT_REQUIRED_ERROR_CODE } from "../../constants/common";

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
      number: this.store.recipesNumberPerPage,
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
      .catch((error) => {
        notificationStore.notifications.set(uuid(), error.message);
        if (error.code === PAYMENT_REQUIRED_ERROR_CODE) {
          this.store.errorMessage = `
          Sorry, but number of API calls for free developer plan to 
          Spoonacular is reached. Please, use or test the app tomorrow!`;
        }
      })
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
    const { recipes, isLoading, totalRecipesNumber, errorMessage } = this.store;
    return (
      <section className="recipes-page">
        <RecipeList
          recipes={recipes}
          isLoading={isLoading}
          totalRecipesNumber={totalRecipesNumber}
          onShowMoreClick={this.handleShowMoreClick}
          errorMessage={errorMessage}
        />
      </section>
    );
  }
}
export default withRouter(RecipesPage);
