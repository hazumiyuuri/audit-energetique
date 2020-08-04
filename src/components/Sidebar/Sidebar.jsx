import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = function() {
    return (
        <div className="app__sidebar hidden lg:block">
            <div className="app_brand">Audit energétique</div>
            <NavLink to="/">
                <div className="text-leading menu__items">Tableau de bord</div>
            </NavLink>
            <NavLink to="/audit/create">
                <div className="text-leading menu__items">Création d'un nouveau audit</div>
            </NavLink>
            <NavLink to="/audit/list">
                <div className="text-leading menu__items">Liste des audits</div>
            </NavLink>
        </div>
    )
}

export default Sidebar;
