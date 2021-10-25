import AdapterLuxon from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth, ProvideAuth } from "./Authentication/ProvideAuth";
import { ProvideUsers } from "./Authentication/ProvideUsers";
import Footer from "./Navigation/Footer";
import Header from "./Navigation/Header";
import Content from "./Pages/Content";
import Article from "./Navigation/Article";
import LogInBox from "./Components/LogIn/PageLogIn";
import SingInBox from "./Components/SignIn/SingInBox";
import PrivateRoute from "./Navigation/PrivateRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { red } from "@mui/material/colors";
// remove ? npm install @mui/styles
import { addCustomer } from "./Utils/accessHooks";
import AllBookList from "./Pages/AllBookList";
import BookSearchPage from "./Pages/BookSearchPage";
import BookSearchPageByAuthor from "./Pages/BookSearchPageByAuthor";
import BookDetailPage from "./Pages/BookDetailPage";
import AddBookPage from "./Components/Books/AddBookPage";
import Welcome from "./Pages/Welcome";

//https://mui.com/customization/default-theme/
//https://bareynol.github.io/mui-theme-creator/
const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: blue[500],
        },
        secondary: {
            // This is green.A700 as hex.
            main: "#11cb5f",
        },
        test11: {
            main: "#ff0000",
        },
        card: {
            main: "#64748B",
            light: blue[100],
            dark: blue[800],
            contrastText: "#fff",
        },
    },
    text: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: red[500],
        },
    },
});

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <ProvideAuth>
                <ThemeProvider theme={theme}>
                    <Content>
                        <Router>
                            <Header />
                            <Article>
                                <Switch>
                                    <Route exact path="/login">
                                        <LogInBox />
                                    </Route>
                                    <Route exact path="/singin">
                                        <ProvideUsers>
                                            <SingInBox />
                                        </ProvideUsers>
                                    </Route>
                                    <PrivateRoute path="/allbooks">
                                        <AllBookList />
                                    </PrivateRoute>
                                    <PrivateRoute path="/search/:q?">
                                        <BookSearchPage />
                                    </PrivateRoute>
                                    <PrivateRoute exact path="/searchauthor">
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
                                        <div>Error 404</div>
                                    </Route>
                                </Switch>
                            </Article>
                            <Footer />
                        </Router>
                    </Content>
                </ThemeProvider>
            </ProvideAuth>
        </LocalizationProvider>
    );
}

export default App;
