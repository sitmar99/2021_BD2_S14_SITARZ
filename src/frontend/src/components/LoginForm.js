import React from 'react';
import md5 from 'md5';

class LoginForm extends React.Component {
    state = {
        login: 'test',
        password: 'pass'
    }

    signIn() {
        var json = JSON.stringify({
            login: this.state.login,
            password: md5(this.state.password)
        })

        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = () => {
            if (this.readyState === 4 && this.status === 200) {

            }
        }

        xhttp.open("POST", "http://localhost:8080/login", true)
        xhttp.setRequestHeader("Content-type", "application/json")
        xhttp.send(json)

        console.log(json)
    }

    render() {
        const changeLogin = (event) => this.setState({login: event.target.value})
        const changePassword = (event) => this.setState({password: event.target.value})

        return (
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
                <button onClick={() => this.signIn()} className="btn btn-primary w-100">Zaloguj</button>
            </div>
        )
    }
}

export default LoginForm;
