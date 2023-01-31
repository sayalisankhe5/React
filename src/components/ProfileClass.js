import React from "react";
import UserContext from "../utils/UserContext";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      count2: 0,
      userInfo: {
        name: "SS",
        public_repos: 10,
        avatar_url: "",
      },
    };
    console.log("constructor");
  }

  async componentDidMount() {
    console.log("component did mount");
    const resData = await fetch("https://api.github.com/users/sayalisankhe5");
    const jsonData = await resData.json();
    console.log(jsonData);
    this.setState({
      userInfo: jsonData,
    });
    console.log("check");
  }

  render() {
    const { count } = this.state;
    console.log("render");
    return (
      <div>
        <h2> profile class component</h2>
        <UserContext.Consumer>
          {(value) => {
            return <h4 className="font-bold">{value.user.name}</h4>;
          }}
        </UserContext.Consumer>
        <h3>Name: {this.props.name}</h3>
        {/* <h3>count : {this.state.count}</h3> */}
        <h3>count1 : {count}</h3>
        <button
          onClick={() => {
            this.setState({
              count: 1,
              count2: 2,
            });
          }}
        >
          click
        </button>
        <img src={this.state.userInfo.avatar_url}></img>
        <h2>{this.state.userInfo.name}</h2>
        <h3>Public repos: {this.state.userInfo.public_repos}</h3>
      </div>
    );
  }
}

export default Profile;
