import "@pagestyles/account/_profile.scss";

import {useEffect, useState} from "react";

import { getUserData } from "./components/getUserData";
import {useParams} from "react-router-dom";

import {hasPermission, Role} from "@api";
import {useAuth} from "@hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import {LoadingData, NoPermission} from "@components";
import EditForm from "./components/editForm";

export default function Profile() {
  const { id } = useParams();
  const {userInfo} = useAuth();
  const finalId = id || userInfo.id;

  const [user, setUser] = useState(null);


    useEffect(() => {
        getUserData(finalId, setUser);
    }, [finalId]);

    if(id && !hasPermission(Role.Beheerder)) {
        return <NoPermission message='U heeft geen toegang tot deze informatie.'/>
    }

    if(!user || user instanceof Error) {
        return <LoadingData data={user}/>;
    }

  return (
    <main className='profile'>
        <FontAwesomeIcon icon={faCircleUser} className="userIcon" />
        <EditForm
          user={user}
          setUser={setUser}
        />
    </main>
  );
}
