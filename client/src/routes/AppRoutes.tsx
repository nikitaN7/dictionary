import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dictionary from '../components/dictionary/dictionary';
import WordsTrainer from '../components/words-trainer/WordsTrainer';
import Layout from '../components/layout/Layout';

const NotFoundPage: React.FC = () => <div>not found 404</div>;

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/dictionary" exact component={Dictionary} />
        <Route path="/trainer" exact component={WordsTrainer} />

        <Route path="/" exact render={() => <Redirect to="/dictionary" />} />
        <Route path="*" exact={true} component={NotFoundPage} />
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
