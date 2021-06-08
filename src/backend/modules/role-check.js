function hasRole(role, req, res) {
    if (!req.session.role) {
        res.sendStatus(401)
        return false
    }

    switch (role) {
        case 'admin':
            if ((new Set(['admin']).has(req.session.role))) return true
            break
        case 'manager':
            if ((new Set(['admin', 'manager']).has(req.session.role))) return true
            break
        case 'employee':
            if ((new Set(['admin', 'manager', 'employee']).has(req.session.role))) return true
            break
    }

    res.sendStatus(403)
    return false
}

module.exports = hasRole
