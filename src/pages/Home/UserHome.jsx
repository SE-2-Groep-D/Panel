import "@pagestyles/home/user-home.scss";

import React, { useState, lazy, Suspense } from 'react'


import {LoadingDiv} from '@components';
const DashboardData = lazy(() => import('./Default.jsx'));

export default function UserHome() {
    const [userName, setUsername] = useState('David');
    const [userType, setUserType] = useState('Ervaringsdeskundige');

    

  return (
    <section className='dashboard'>
        <DashboardData userType={userType} message={getMessage() + " " + userName}/>
    </section>
  )
}

function getMessage() {
    const huidigeUur = new Date().getHours();

    if (huidigeUur >= 5 && huidigeUur < 12) {
        return "Goedemorgen!";
    } else if (huidigeUur >= 12 && huidigeUur < 18) {
        return "Goedenmiddag!";
    } else {
        return "Goedenavond!";
    }
}
