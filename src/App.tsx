import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AdminRoom } from './pages/AdminRoom';
import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import "./styles/globals.scss"

// -Mf7XmUBqlf28z1uqOT_

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
