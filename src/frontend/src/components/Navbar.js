import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Ride It - detailing studio</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <a className="nav-link" href="#" onClick={() => this.props.app(2)}>Lista usług</a>
                        <a className="nav-link" href="#" onClick={() => this.props.app(3)}>Lista realizacji</a>
                        <a className="nav-link" href="#" onClick={() => this.props.app(4)}>Panel administratora</a> {/* TODO: do usunięcia później */ }
                        <a className="nav-link" href="#" onClick={() => this.props.app(5)}>Raporty</a>
                        <a className="nav-link" href="#" onClick={() => this.props.app(6)}>Zarządzanie zasobami</a>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;
