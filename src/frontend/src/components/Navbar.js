import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Studio samochodowe bez nazwy</span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <a className="nav-link" href="#">Panel pracownika</a>
                        <a className="nav-link" href="#">Panel menadżera</a>
                        <a className="nav-link" href="#">Panel administratora</a>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;
