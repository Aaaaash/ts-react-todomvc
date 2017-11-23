import * as React from 'react';
import { ReactNode } from 'react';
import TodoMVC from './container/TodoMVC';
import { withRouter, Route } from 'react-router-dom';

class App extends React.PureComponent {
  render(): ReactNode {
    return (
      <div>
        <Route path="/" component={TodoMVC} />
      </div>
    );
  }
}

export default withRouter(App);
