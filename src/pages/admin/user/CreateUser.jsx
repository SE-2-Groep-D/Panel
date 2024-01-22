import "@pagestyles/admin/_create-user.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";

import {useEffect, useState} from "react";
import {fetchApi, hasPermission, Role} from "@api";
import {Form, InputField, LoadingData, NoPermission, OptionSelector} from "@components";
import {useNavigate} from "react-router-dom";


export default function CreateUser() {
    const [type, setType] = useState('Medewerker');
    const [user, setUser] = useState();
    const [createdUser, setCreatedUser] = useState('creating');
    const navigate = useNavigate();


    // useEffect(() => {
    //     setUser(
    //         updateUser(user, type)
    //     );
    // }, [type]);



    if (!hasPermission(Role.Beheerder)) {
        return <NoPermission message='U heeft geen toegang tot gebruikersinformatie.' />;
    }

    if(user && !createdUser && !(createdUser instanceof Error)) {
        return <LoadingData data={createdUser}/>
    }

    function handleChange({ element, value, id }) {
        setUser({ ...user, [id ? id : element.id]: value });
    }

    let listInputs = [];
    for (let key in user) {
        const value = user[key];
        if(key === "type" || key === "userType" || key === "googleAccount") continue;

        listInputs.push(
                <InputField
                    key={key}
                    id={key}
                    onChange={handleChange}
                    value={user[key]}
                    size={(value.length >= 50) ? "big" : "small"}
                >
                    {key}
                </InputField>
        );
    }

    return (
        <main className='create-user'>
            <FontAwesomeIcon icon={faCircleUser} className="userIcon" />
            <Form title="Registreer gebruiker" buttonText='Registreer Gebruiker' onSubmit={(e) => {
                createUser(e, setCreatedUser, navigate);
            }}>
                <OptionSelector
                    value={type}
                    onChange={(e) => setType(e.value)}
                    id='type'
                    options={['Medewerker', 'Bedrijf', 'Ervaringsdeskundige', 'Beheerder']}
                    visible
                    required
                >
                    Gebruikers Type
                </OptionSelector>
                {listInputs}
            </Form>
        </main>
    );
}

async function createUser(event, setCreatedUser, navigate) {
    setCreatedUser();

    const user = fixProperties(event.values);
    var endpoint = getEndPoint(user.type);

    try {
        const response = await fetchApi(endpoint, "POST", user);
        navigate(`/admin/gebruiker/list`);
        setCreatedUser(response);
    } catch (err) {
        setCreatedUser(err);
    }
}

function fixProperties(user) {
    user.password = user.wachtwoord;
    user.roles = [user.type];
    user.hulpmiddelen = user.hulpmiddelen.split(',');
    user.benaderingen = user.benaderingen.split(',');
    user.typeBeperkingen = user.typeBeperkingen.split(',');
    return user;
}

function getEndPoint(type) {
    switch (type) {
        case 'Ervaringsdeskundige':
           return "/Auth/RegisterErvaringsdeskundige";
        case 'Bedrijf':
            return "/Auth/RegisterBedrijf";
        case 'Medewerker':
            return "/Auth/RegisterMedewerker";
        default:
            return "/Auth/Register";
    }
}



function updateUser(user, type) {
    var userData = Gebruiker();

    switch (type) {
        case 'Ervaringsdeskundige':
            var ervaringsdeskundigeData = ErvaringsDeskundige(user);
            userData = {...userData, ...ervaringsdeskundigeData}
            break;
        case 'Bedrijf':
            var bedrijfData = Bedrijf(user);
            userData = {...userData, ...bedrijfData}
            break;
        case 'Medewerker':
            userData = {...userData, functie: user.functie || ''}
            break;
    }


    return {type: type, ...userData};
}

function ErvaringsDeskundige(user) {
    return {
        postcode: user && user.postcode || '',
        leeftijdscategorie: user && user.leeftijdscategorie || '',
        benaderingen: user && user.benaderingen.split(" ") || '',
        hulpmiddelen: user && user.hulpmiddelen.split(" ") || '',
    };
}

function Bedrijf(user) {
    return {
        postcode: user && user.postcode || '',
        bedrijfsnaam: user && user.bedrijfsnaam || '',
        plaats: user && user.plaats || '',
        straat: user && user.straat || '',
        nummer: user && user.nummer || '',
        websiteUrl: user && user.websiteUrl || 'https://',
        omschrijving: user && user.omschrijving || '',
    };
}

function Gebruiker(user) {
    return {
        email: user && user.email || '',
        wachtwoord: user && user.wachtwoord || '',
        voornaam: user && user.voornaam || '',
        achternaam: user && user.achternaam || '',
        googleAccount: false,
    };
}