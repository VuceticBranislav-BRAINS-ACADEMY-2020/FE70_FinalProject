import AdapterLuxon from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth, ProvideAuth } from "./Authentication/ProvideAuth";
import { ProvideUsers } from "./Authentication/ProvideUsers";
import Footer from "./Navigation/Footer";
import Header from "./Navigation/Header";
import PageMain from "./Pages/PageMain";
import Article from "./Navigation/Article";
import LogInBox from "./Components/LogIn/LogInBox";
import SingInBox from "./Components/SignIn/SingInBox";
import ButtonLogIn from "./Components/LogIn/ButtonLogIn";
import ButtonSignIn from "./Components/LogIn/ButtonSignIn";
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
import BookDetail from "./Components/Books/BookDetail";

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

const AddBookPage = () => {
    const [login] = useAuth();
    return (
        <BookDetail
            startingMode="create"
            action={(customer) => addCustomer(customer, login)}
        />
    );
};

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <ProvideAuth>
                <ThemeProvider theme={theme}>
                    <PageMain>
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
                                        <ButtonLogIn />
                                        <ButtonSignIn />
                                    </Route>
                                    <Route path="*">
                                        <div>Error 404</div>
                                    </Route>
                                </Switch>
                            </Article>
                            <Footer />
                        </Router>
                    </PageMain>
                </ThemeProvider>
            </ProvideAuth>
        </LocalizationProvider>
    );
}

export default App;
