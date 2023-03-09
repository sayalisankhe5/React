import { Outlet } from "react-router-dom";
import Profile from "./ProfileClass";
import ProfileFunc from "./Profile";
const About = () => {
  return (
    <div>
      <h1>This is about us page</h1>
      {/* <Outlet /> */}
      {/* <ProfileFunc name="Sayali" />
      <Profile name="Sayali" /> */}
    </div>
  );
};

export default About;
