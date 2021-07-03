import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import "./default.scss";

const initialState = {
  currenUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  authListener = null;
  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currenUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      this.setState({
        ...initialState,
      });
    });
  }
  componentDidUnmount() {
    this.authListener();
  }
  render() {
    const { currenUser } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomepageLayout currenUser={currenUser}>
                <Homepage />
              </HomepageLayout>
            )}
          />
          <Route
            path="/registration"
            render={() =>
              currenUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currenUser={currenUser}>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              currenUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currenUser={currenUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
