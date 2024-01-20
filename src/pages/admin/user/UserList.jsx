import "@pagestyles/admin/_user-list.scss";

import {fetchApi, hasPermission, Role} from "@api";
import {Button, InputField, LoadingData, NoPermission} from "@components";
import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useIntersectionObserver} from "@hooks";
import {Status} from "@pages/news/data/newsContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";

export default function UserList() {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState();
    const [ref, inView] = useIntersectionObserver();
    const navigate = useNavigate();


    useEffect(() => {
        fetchUsers(setUsers);
    }, [setUsers]);



    if(!hasPermission(Role.Beheerder)) {
        return <NoPermission message='U heeft geen toegang tot gebruikers informatie.'/>
    }

   if(!users || users instanceof Error) {
       return <LoadingData data={users}/>;
   }

    function handleFilterChange(e) {
        setValue(e.value);
    }

    return <main className='gray'>
            <section ref={ref} className={(inView) ? "user-dashboard moveIn bottom": "user-dashboard"}>
                <div className="filter">
                    <h1 className="heading-1">Gebruikers</h1>
                    <InputField onChange={handleFilterChange}>Zoek Gebruiker</InputField>
                </div>
                <UserTable users={users} filter={value}/>

                    <Button label='Klik op deze knop om een nieuwe gebruiker aan te maken' color='secondary' onClick={() => {
                        navigate(`/admin/gebruiker/create`);
                    }}>
                        <FontAwesomeIcon icon={faAdd}/>
                        Nieuwe Gebruiker
                    </Button>
            </section>
        </main>
}

function UserTable({users, filter}) {
    const displayedUsers = useMemo(() => filterUsers(users, filter), [users, filter]);
    const navigate = useNavigate();

    function goToInfoPage(id) {
        navigate(`/profiel/${id}`);
    }

    return (
        <table className='user-list'>
            <thead>
            <tr>
                <th className='heading-3'>Naam</th>
                <th className='heading-3'>Email</th>
                <th className='heading-3'>Rol</th>
            </tr>
            </thead>

            <tbody>
            {displayedUsers.map((user, i) =>{

                return (
                    <tr     key={i}
                            id={user.id}
                            className='clickable'
                            onClick={() => goToInfoPage(user.id)}
                            onKeyDown={(e) => e.key === 'Enter' && goToInfoPage(user.id)}
                            tabIndex={0}
                            role="button"
                    >
                        <td data-label='Naam' className='text'>{`${user.voornaam} ${user.achternaam}`}</td>
                        <td data-label='Email' className='text'>{user.email}</td>
                        <td data-label='Type' className='text'>{user.type}</td>
                    </tr>
                )})
            }

            </tbody>
        </table>
    );
}

function filterUsers(users, filter) {
    if (!filter || !users) return users;

    return users.filter(user =>
        user.voornaam && user.voornaam.toLowerCase().includes(filter.toLowerCase()) ||
        user.achternaam && user.achternaam.toLowerCase().includes(filter.toLowerCase()) ||
        user.email && user.email.toLowerCase().includes(filter.toLowerCase()) ||
        user.type && user.type.toLowerCase().includes(filter.toLowerCase())
    )
}

async function fetchUsers(setUsers) {
    try {
        const users = await fetchApi('/gebruiker/list');
        setUsers(users)
    } catch (err) {
        setUsers(err);
    }
}


