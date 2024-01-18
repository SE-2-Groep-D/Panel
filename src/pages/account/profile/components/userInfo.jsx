import { Button, LoadingDiv } from "@components";

export default function UserInfo({ user, setIsEditing, loading }) {
  let listItems = [];
  if (user != null) {
    for (let key in user) {
      listItems.push(
        <li key={key}>
          <span>{key}</span>
          {user[key]}
        </li>
      );
    }
  }

  if (loading) return <LoadingDiv loading={true} />;

  return (
    <main className="userInfoMain">
      <ul className="userInfo">
        {listItems}
        <Button onClick={() => setIsEditing(true)}>Aanpassen</Button>
      </ul>
    </main>
  );
}
