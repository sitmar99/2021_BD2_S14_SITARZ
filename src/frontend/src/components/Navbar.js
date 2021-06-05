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
                        {
                            (() => {
                                if (this.props.userinfo) {
                                    let ret = []
                                    switch (this.props.userinfo.role) {
                                        case 'admin': {
                                            ret.push(<a className="nav-link" href="#" onClick={() => this.props.app(4)}>Panel administratora</a>)
                                        }
                                        case 'manager': {
                                            ret.push(<a className="nav-link" href="#" onClick={() => this.props.app(5)}>Raporty</a>)
                                            ret.push(<a className="nav-link" href="#" onClick={() => this.props.app(6)}>Zarządzanie zasobami</a>)
                                        }
                                        case 'employee': {
                                            ret.push(<a className="nav-link" href="#" onClick={() => this.props.app(2)}>Lista usług</a>)
                                            ret.push(<a className="nav-link" href="#" onClick={() => this.props.app(3)}>Lista realizacji</a>)
                                            break
                                        }
                                        case 'unlogged':
                                            break
                                    }
                                    return ret
                                }
                                else {
                                    return
                                }
                            })()
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;
