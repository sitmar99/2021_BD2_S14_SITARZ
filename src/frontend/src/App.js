import React, { useState } from 'react'
import Cookies from 'js-cookie'

import EmploeeList from './components/EmploeeList'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import RegistryList from './components/RegistryList'
import ReportsPanel from './panels/ReportsPanel'
import ResourceList from './components/ResourceList'
import ServicesList from './components/ServicesList'

const PageEnum = Object.freeze({
    "landing": 1, // strona główna, formularz logowania
    "service": 2, // lista usług (cennik)
    "registry": 3, // lista realizacji (zrealizowanych usług)
    "administrator": 4, // strona administratora do zarządzania użytkownikami
    "reports": 5, // strona z raportami
    "resources": 6 // lista z zasobami
})

function App() {
    const [page, setPage] = useState(PageEnum.landing)
    const [userinfo, setUserinfo] = useState(null)

    if (userinfo === null) {
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                setUserinfo(JSON.parse(xhttp.responseText))

                switch (JSON.parse(xhttp.responseText).role) {
                    case 'administrator':
                        setPage(4)
                        break
                    case 'manager':
                        setPage(5)
                        break
                    case 'pracownik':
                        setPage(6)
                        break
                }
            }
        }

        xhttp.open("GET", "http://localhost:8080/login", true)
        xhttp.withCredentials = true;
        xhttp.send()
    }

    return (
        <div id="app">
            <Navbar app={setPage} userinfo={userinfo} />
            <div className="container">
                {
                    (() => {
                        switch (page) {
                            case PageEnum.landing:
                                return <LoginForm app={setPage} userinfo={setUserinfo} />
                            case PageEnum.service:
                                return <ServicesList />
                            case PageEnum.registry:
                                return <RegistryList />
                            case PageEnum.administrator:
                                return <EmploeeList />
                            case PageEnum.reports:
                                return <ReportsPanel />
                            case PageEnum.resources:
                                return <ResourceList />
                        }
                    })()
                }
            </div>
        </div>
    )
}

export default App;
