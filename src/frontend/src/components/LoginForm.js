import React from 'react';

class LoginForm extends React.Component {
    render() {
        return (
            <div id="loginForm" className="col-lg-4 mt-3 p-3 ml-auto mr-auto bg-light">
                <div class="form-group">
                    <label for="exampleInputEmail1">Nazwa użytkownika</label>
                    <input type="text" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Hasło</label>
                    <input type="password" class="form-control" />
                    <small id="emailHelp" class="form-text text-muted">Logując się wyrażasz zgodę na przechowywanie ciasteczek Cookies w przeglądarce.</small>
                </div>
                <button type="submit" class="btn btn-primary w-100">Zaloguj</button>
            </div>
        )
    }
}

export default LoginForm;
