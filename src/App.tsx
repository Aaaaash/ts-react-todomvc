import * as React from 'react';
import { ReactNode } from 'react';
import TodoMVC from './container/TodoMVC';
import { withRouter, Route, Switch } from 'react-router-dom';

class App extends React.PureComponent {
  render(): ReactNode {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={TodoMVC} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
