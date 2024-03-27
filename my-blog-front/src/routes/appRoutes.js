import React,{ lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout  from '../components/shared/Layout/Layout';
const Home = lazy(() => import('../components/pages/Home'));
const Country = lazy(() => import('../components/pages/Country'));
const PageNotFound = lazy(() => import('../components/pages/PageNotFound'));


const AppRoutes = (props) => ( 
    <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Suspense fallback={<>...</>}><Home /></Suspense>}  />
        </Route>
        <Route element={<Layout template="container"/>}>
            <Route path={props.dataCountry} element={<Suspense fallback={<>...</>}><Country /></Suspense>} />
        </Route>
        <Route element={<Layout emplate="container"/>}>
            <Route path='*' element={<Suspense fallback={<>...</>}><PageNotFound /></Suspense>}/>
        </Route>
    </Routes>
);

export default AppRoutes;