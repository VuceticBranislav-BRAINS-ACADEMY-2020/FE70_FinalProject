/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-21                                                          ║
║                                                                             ║
║  Main application component                                                 ║ 
║                                                                             ║ 
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React from "react";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "./Authentication/ProvideAuth";
import { ProvideRegister } from "./Authentication/ProvideRegister";
import Footer from "./Navigation/Footer";
import Header from "./Navigation/Header";
import Content from "./Pages/Content";
import Article from "./Navigation/Article";
import LogInBox from "./Components/LogIn/LogInBox";
import SingInBox from "./Components/SignIn/SingInBox";
import PrivateRoute from "./Navigation/PrivateRoute";
import BookListPage from "./Pages/BookListPage";
import BookSearchPage from "./Pages/BookSearchPage";
import BookSearchPageByAuthor from "./Pages/BookSearchPageByAuthor";
import BookDetailPage from "./Pages/BookDetailPage";
import AddBookPage from "./Components/Books/AddBookPage";
import Welcome from "./Pages/Welcome";
import ToggleColorMode from "./Pages/ToggleColorMode";
import NavBar from "./Navigation/NavBar";
import Error404 from "./Components/Error404";

export function App() {
    return (
        <ToggleColorMode>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
                <ProvideAuth>
                    <Content>
                        <Router>
                            <Header />
                            <NavBar />
                            <Article>
                                <Switch>
                                    <Route exact path="/login">
                                        <LogInBox />
                                    </Route>
                                    <Route exact path="/singin">
                                        <ProvideRegister>
                                            <SingInBox />
                                        </ProvideRegister>
                                    </Route>
                                    <PrivateRoute path="/allbooks">
                                        <BookListPage />
                                    </PrivateRoute>
                                    <PrivateRoute path="/search/:query?">
                                        <BookSearchPage />
                                    </PrivateRoute>
                                    <PrivateRoute path="/searchauthor/:query?">
                                        <BookSearchPageByAuthor />
                                    </PrivateRoute>
                                    <PrivateRoute path="/books/new">
                                        <AddBookPage />
                                    </PrivateRoute>
                                    <PrivateRoute path="/books/:cid/:operation">
                                        <BookDetailPage />
                                    </PrivateRoute>
                                    <Route exact path="/">
                                        <Welcome />
                                    </Route>
                                    <Route path="*">
                                        <Error404 />
                                    </Route>
                                </Switch>
                            </Article>
                            <Footer />
                        </Router>
                    </Content>
                </ProvideAuth>
            </LocalizationProvider>
        </ToggleColorMode>
    );
}

export default App;
