import React from "react";
import "./App.css";
import { Layout, Button, Avatar, Tag } from "antd";
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
        <Footer style={{ backgroundColor: "#c3edea" }}>
          <Avatar
            width="20"
            height="20"
            src="https://avatars0.githubusercontent.com/u/31334024?s=60&amp;v=4"
          />
          <b> {"   "}Ramazan Arslan </b>
          <Tag color="warning">
            <a href="https://github.com/ramazanarslan">
              <b>Github</b>
            </a>
          </Tag>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
