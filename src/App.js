import React from "react";
import "./App.css";
import { Layout, Button } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateSession from "./pages/CreateSession";
import ScrumView from "./pages/ScrumView";
import DeveloperView from "./pages/DeveloperView";
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <Button
            onClick={() => (window.location.href = "/")}
            size={"large"}
            value={"default"}
          >
            SCRUM POCKER
          </Button>
        </Header>
        <Content>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={CreateSession} />

              <Route
                exact
                path="/view-planning-as-scrum-master/:id"
                component={ScrumView}
              />
              <Route
                exact
                path="/view-planning-as-developer/:id"
                component={DeveloperView}
              />
            </Switch>
          </BrowserRouter>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
