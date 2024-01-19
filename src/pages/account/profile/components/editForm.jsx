import {Button, Checkbox, Form, InputField, MultiInputSelector} from "@components";
import { useAuth } from "@hooks";
import { fetchApi, isRole, Role } from "@api";
import {Link, useNavigate} from "react-router-dom";
import news from "@pages/news/News.jsx";

function EditForm({user, setUser }) {
  const auth = useAuth();
  const navigate = useNavigate()

  function handleSubmit() {
    updateUserInfo(user, setUser)
  }

  function handleChange({ element, value, id }) {
    setUser({ ...user, [id ? id : element.id]: value });
  }

  let listInputs = [];
  const skipList = ['id', 'type', 'beschikbaarheden', 'voogdid', 'voogd', 'typebeperkingen']
    for (let key in user) {
      if(skipList.includes(key.toLowerCase())) continue;
      listInputs.push(getInputType(key, user, handleChange));
    }

  return (
      <>
        <Form buttonText="Opslaan" onSubmit={handleSubmit} title={"Profiel"}>
          {listInputs}
        </Form>
        <Button label='Klik op de knop om het account te verwijderen.' color="tertiary" varient="text" onClick={() => deleteUser(user, setUser, auth, navigate)}>Verwijder Account</Button>
      </>
  );
}

async function updateUserInfo(user, setUser) {
  const finalUser = fixProperties(user);
  setUser(undefined);


  console.log(finalUser)

  try {
    await fetchApi(`/Gebruiker/${user.id}/update`, "PUT", finalUser);
    setUser(finalUser);
  } catch (error) {
    console.log(error);
    setUser(error);
  }
}

async function deleteUser(user, setUser, auth, navigate) {
  const finalUser = user;
  const {logoutUser, userInfo} = auth;
  setUser(undefined);

  try {
    await fetchApi(`/Gebruiker/${finalUser.id}/delete`, "DELETE");
    setUser(user);

    if(user.id === userInfo.id) {
      logoutUser();
      navigate('/');
      return;
    }

    navigate("/admin/gebruiker/list");
  } catch (error) {
    console.log(error);
    setUser(error);
  }
}

function fixProperties(user) {
  console.log(user);
  return user;
}

function getInputType(key, user, handleChange) {
  const value = (!user[key])? '' : user[key];

  if(typeof value === 'boolean' || key === 'toestemmingBenadering') {
    const text = (key === 'toestemmingBenadering') ? 'Ik mag benaderd worden door bedrijven.' : key;

    return  <Checkbox
        key={key}
        id={key} visible
        onChange={handleChange}
        value={user[key]}
    >

      {text}
    </Checkbox>
  }

  if (value instanceof Array) {
    let finalValue = value;

    if (value.length > 0 && value[0] instanceof Object) {
      finalValue = value.map((item) => {
        let propertyNames = Object.keys(item);
        return item[propertyNames[1]];
      });
    }

    return (
        <MultiInputSelector
            key={key}
            id={key}
            onChange={handleChange}
            value={finalValue}
        >
          {key}
        </MultiInputSelector>
    );
  }

      return (
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

export default EditForm;
