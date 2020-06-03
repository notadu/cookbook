import React from "react";
import { Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";

import {
  HOME_PAGE_URL,
  RECIPE_PAGE_URL,
  RECIPE_ROUTES,
} from "../../constants/routes";

import NotFoundPage from "../not-found-page/NotFoundPage";
import HomePage from "../home-page/HomePage";
import RecipePage from "../recipe-page/RecipePage";
import RecipesPage from "../recipes-page/RecipesPage";

import "./Main.scss";

@observer
class Main extends React.Component {
  renderRecipeRoutes = () => (
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
  );

  render() {
    return (
      <main className="cook-content">
        <Switch>
          <Route exact={true} path={HOME_PAGE_URL} component={HomePage} />
          <Route exact={true} path={RECIPE_PAGE_URL} component={RecipePage} />
          {this.renderRecipeRoutes()}
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    );
  }
}

export default Main;
