import React from 'react';

class Navbar extends React.Component {
    state = {
        signingOut: false
    }

    constructor(props) {
        super(props)
    }

    signOut() {
        this.setState({signingOut: true})

        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                window.location.reload()
            }
        }

        xhttp.open("GET", "http://localhost:8080/logout", true)
        xhttp.withCredentials = true
        xhttp.send()
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
                                        case 'administrator': {
                                            ret.push(<a className="nav-link" href="#" onClick={() => this.props.app(4)}>Panel administratora</a>)
                                        }
                                        case 'manager': {
                                            ret.push(<a className="nav-link" href="#" onClick={() => this.props.app(5)}>Raporty</a>)
                                            ret.push(<a className="nav-link" href="#" onClick={() => this.props.app(6)}>Zarządzanie zasobami</a>)
                                        }
                                        case 'pracownik': {
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
                    <button onClick={() => this.signOut()} className={"btn btn-outline-light my-2 my-sm-0" + (this.props.userinfo ? "" : " d-none") + (this.state.signingOut ? " disabled" : "")}>
                        <span className={"spinner-border spinner-border-sm mr-2" + (this.state.signingOut ? "" : " d-none")} role="status" aria-hidden="true"></span>
                        Wyloguj {this.props.userinfo?.first_name || 'unknown'}
                    </button>
                </div>
            </nav>
        )
    }
}

export default Navbar;
