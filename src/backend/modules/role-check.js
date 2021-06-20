function hasRole(role, req, res) {
    if (!req.session.role) {
        res.sendStatus(401)
        return false
    }

    switch (role) {
        case 'administrator':
            if ((new Set(['administrator']).has(req.session.role))) return true
            break
        case 'manager':
            if ((new Set(['administrator', 'manager']).has(req.session.role))) return true
            break
        case 'pracownik':
            if ((new Set(['administrator', 'manager', 'pracownik']).has(req.session.role))) return true
            break
    }

    res.sendStatus(403)
    return false
}

module.exports = hasRole
