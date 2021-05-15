import React, { useState } from 'react'

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
    "admin": 4, // strona administratora do zarządzania użytkownikami
    "reports": 5, // strona z raportami
    "resources": 6 // lista z zasobami
})

function App() {
    const [page, setPage] = useState(PageEnum.landing);

    return (
        <div id="app">
            <Navbar app={setPage} />
            <div className="container">
                {
                    (() => {
                        switch (page) {
                            case PageEnum.landing:
                                return <LoginForm />
                            case PageEnum.service:
                                return <ServicesList />
                            case PageEnum.registry:
                                return <RegistryList />
                            case PageEnum.admin:
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
