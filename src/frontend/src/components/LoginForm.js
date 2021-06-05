import React from 'react';
import md5 from 'md5';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        login: 'test',
        password: 'pass',
        alert_type: 'info',
        alert_msg: 'Nieznany błąd',
        alert_visible: false,
        loading: false
    }

    signIn() {
        var json = JSON.stringify({
            login: this.state.login,
            password: md5(this.state.password)
        })

        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const res = JSON.parse(xhttp.responseText)
                switch (res.role) {
                    case 'admin':
                        this.props.app(4)
                        break
                    case 'manager':
                        this.props.app(5)
                        break
                    case 'employee':
                        this.props.app(3)
                        break
                }
            }
            else if (xhttp.readyState === 4 && xhttp.status === 401) {
                this.setState({
                    alert_type: 'danger',
                    alert_msg: "Użytkownik nie istnieje lub podane hasło jest nieprawidłowe",
                    alert_visible: true,
                    loading: false
                })
            }
            else if (xhttp.readyState === 4) {
                this.setState({
                    alert_type: 'warning',
                    alert_msg: "Nieznany status, spróbuj ponownie później",
                    alert_visible: true,
                    loading: false
                })
            }
            else {
                this.setState({loading: true})
            }
        }

        xhttp.open("POST", "http://localhost:8080/login", true)
        xhttp.setRequestHeader("Content-type", "application/json")
        xhttp.send(json)
    }

    render() {
        const changeLogin = (event) => this.setState({login: event.target.value})
        const changePassword = (event) => this.setState({password: event.target.value})

        return (
            <div className="loginPage pt-3 pb-3">
                <div className={"alert alert-" + this.state.alert_type + (this.state.alert_visible ? "" : " d-none")} role="alert">
                    {this.state.alert_msg}
                </div>
                <div id="loginForm" className="col-lg-4 mt-3 p-3 ml-auto mr-auto bg-light">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Nazwa użytkownika</label>
                        <input value={this.state.login} onChange={changeLogin} type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Hasło</label>
                        <input value={this.state.password} onChange={changePassword} type="password" className="form-control" />
                        <small id="emailHelp" className="form-text text-muted">Logując się wyrażasz zgodę na przechowywanie ciasteczek Cookies w przeglądarce.</small>
                    </div>
                    <button onClick={() => this.signIn()} className={"btn btn-primary w-100" + (this.state.loading ? " disabled" : "")}>
                        <span class={"spinner-border spinner-border-sm mr-2" + (this.state.loading ? "" : " d-none")} role="status" aria-hidden="true"></span>
                        Zaloguj
                    </button>
                </div>
            </div>
        )
    }
}

export default LoginForm;
