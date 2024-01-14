import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "@pagestyles/account/_profile.scss";
import { useAuth } from "@hooks";
import { useEffect, useState } from "react";
import { LoadingDiv, Button } from "@components";
import EditForm from "./components/editForm";
import UserInfo from "./components/userInfo";
import { getUserData } from "./components/getUserData";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(true);

  getUserData(setUser, setLoading);

  return (
    <>
      <header>
        <FontAwesomeIcon icon={faCircleUser} className="userIcon" />
      </header>
      {isEditing && (
        <EditForm
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          user={user}
          setUser={setUser}
        />
      )}
      {!isEditing && (
        <UserInfo user={user} setIsEditing={setIsEditing} loading={loading} />
      )}
    </>
  );
}
