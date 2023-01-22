import { useEffect, useState } from "react";

const Profile = (props) => {
  const [count, setCount] = useState(0);
  //const [count] = useState(0);
  const [count2, setCount2] = useState(0);
  useEffect(() => {
    setInterval(() => {
      console.log("timer");
    }, 1000);

    return () => {};
  }, []);

  return (
    <div>
      <h2>My profile</h2>
      <h3>Name: {props.name}</h3>
      <h3>count: {count}</h3>
      <button
        onClick={() => {
          setCount(1);
          setCount2(2);
        }}
      >
        click
      </button>
    </div>
  );
};

export default Profile;
