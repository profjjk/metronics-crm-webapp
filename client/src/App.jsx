import "./App.css";
import { Home, Jobs, Customers, Inventory } from "./pages";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/service" component={Jobs} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/inventory" component={Inventory} />
        </Switch>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
