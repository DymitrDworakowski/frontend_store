import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";

const AppRouter = () => {
    const isAuth = false; // Поточний стан автентифікації

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) => (
                
                   <Route key={path} path={path} element={<Component />} />
                
            ))}

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {/* Якщо URL не відповідає жодному з визначених маршрутів, виконається перенаправлення */}
            <Route path="/*" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>

        
    );
};

export default AppRouter;
