// styles
import '@pagestyles/setup-account.scss';


// functions
import {createContext, useState} from 'react';

// components
import Logo from '@components/logo/logo.jsx';
import ProgressBar from '@components/progress-bar.jsx';
import Form from './form.jsx';

const AccountContext = createContext();

function SetupAccount() {
    const [stage, setStage] = useState(0);
    const [moveOut, setMove] = useState(false);
    const [formData, setFormData] = useState({
        name: null,
        telefoonNummer: null,
        gebruikersType: null,
    });


    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function nextStage() {
        setMove(true);
        setTimeout(() => {
            setStage(stage + 1);
            setMove(false);
        }, 500);
    }



    return (
        <AccountContext.Provider id="setup-account" value={{
            handleInputChange,
            nextStage,
            stage,
            formData,
        }}>
                <Logo id="logo"></Logo>
                <ProgressBar stage={stage} maxStage={3}/>
                <Form moveOut={(moveOut) ? 'move' : ''} id='form' stage={stage}/>
        </AccountContext.Provider>
    );
}

export default SetupAccount;