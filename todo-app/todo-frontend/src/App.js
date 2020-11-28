import React, {Component} from "react"
import "./App.css"
import Board from "./components/board.component"
import AuthService from "./services/auth.service";
import {Switch, Route, Link} from "react-router-dom";
import Login from "./components/login.component";
import Register from "./components/register.component";

class App extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div align="center">
                {currentUser ? (
                    <div className="button text">
                        <a className="link" href="/" onClick={this.logOut}>
                            Выход
                        </a>
                    </div>
                ) : (
                    <div>
                        <div className="button text">
                            <Link className="link" to={"/login"}>
                                Войти
                            </Link>
                        </div>
                        <div className="button text">
                            <Link className="link" to={"/register"}>
                                Зарегистрироваться
                            </Link>
                        </div>
                    </div>
                )}
                <div>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route path="/user" component={Board}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App