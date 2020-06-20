import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";

import {
  HOME_PAGE_URL,
  RECIPE_PAGE_URL,
  RECIPE_ROUTES,
} from "../../constants/routes";

import NotFoundPage from "../not-found-page/NotFoundPage";
import Loader from "../loader/Loader";

import "./Main.scss";

const HomePage = lazy(() => import("../home-page/HomePage"));
const RecipePage = lazy(() => import("../recipe-page/RecipePage"));
const RecipesPage = lazy(() => import("../recipes-page/RecipesPage"));

@observer
class Main extends React.Component {
  renderRecipeRoutes = () => (
    <Suspense fallback={<Loader />}>
      <Switch>
        {RECIPE_ROUTES.map((route) => (
          <Route
            key={route.path}
            exact={true}
            path={route.path}
            render={(props) => (
              <RecipesPage {...props} queryParams={route.queryParams} />
            )}
          />
        ))}
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );

  render() {
    return (
      <main className="cook-content">
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact={true} path={HOME_PAGE_URL} component={HomePage} />

            {/*Disable favorite recipe functionality*/}

            {/*<Route*/}
            {/*  exact={true}*/}
            {/*  path={FAVORITE_RECIPES_PAGE_URL}*/}
            {/*  component={FavoriteRecipes}*/}
            {/*/>*/}

            <Route
              exact={true}
              path={`${RECIPE_PAGE_URL}/:id`}
              component={RecipePage}
            />
            {this.renderRecipeRoutes()}
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </main>
    );
  }
}

export default Main;
