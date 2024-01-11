import "@pagestyles/account/home/_user-home.scss";

import { useState, lazy } from 'react'


import {LoadingDiv} from '@components';
import {useAuth} from "@hooks";
const DashboardData = lazy(() => import('./DashboardData.jsx'));

export default function UserHome() {
    const {voornaam, type} = useAuth().userInfo;
    const message = `${getMessage()} ${voornaam}!`;

  return (
    <main className='dashboard gray'>
        <DashboardData userType={type} message={message}/>
    </main>
  )
}

function getMessage() {
    const huidigeUur = new Date().getHours();

    if (huidigeUur >= 5 && huidigeUur < 12) {
        return "Goedemorgen";
    } else if (huidigeUur >= 12 && huidigeUur < 18) {
        return "Goedenmiddag";
    } else {
        return "Goedenavond";
    }
}
