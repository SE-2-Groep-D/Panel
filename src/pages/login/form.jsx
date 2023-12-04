import React, { useState } from 'react'


import DefaultForm from "@pages/setup-account/default-form.jsx";
import InputField from "@components/input/inputfield.jsx";
import Button from "@components/button/button.jsx";


export default function Form({moveOut, stage}) {
    const [type, setType] = useState(null);

    console.log(stage);

    function test(){

        console.log("test123")

    }

    return (
        <DefaultForm
            moveOut={moveOut}
            title='Login'
        >
            <InputField visible>Email</InputField>
            <InputField visible>Wachtwoord</InputField>
            <Button onClick={test}>Inloggen</Button>
        </DefaultForm>
    );

}




