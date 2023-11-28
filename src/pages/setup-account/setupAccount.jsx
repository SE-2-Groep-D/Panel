// styles
import '@pagestyles/setup-account.scss';


// functions
import { useState } from 'react';

// components
import Logo from '@components/logo/logo.jsx';
import ProgressBar from '@components/progress-bar.jsx';
import Form from './form.jsx';
import Button from '@components/button/button.jsx';

function SetupAccount() {
    const [stage, setStage] = useState(0);
    const [moveOut, setMove] = useState(false);


    function nextStep() {
        setMove(true);
        setTimeout(() => {
            setStage(stage + 1);
            setMove(false);
        }, 500);
    }



    return (
        <section id="setup-account">
                <Logo id="logo"></Logo>
                <ProgressBar stage={stage} maxStage={3}/>
                <Form moveOut={(moveOut) ? 'move' : ''} id='form' stage={stage}/>
                <Button onClick={nextStep}>Volgende</Button>
        </section>
    );
}

export default SetupAccount;