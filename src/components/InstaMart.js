import { useState } from "react";

const Section = ({ title, description, isVisible, setIsVisible }) => {
  return (
    <div className="border border-black p-2 m-2">
      <h3 className="font-semibold">{title}</h3>{" "}
      {isVisible ? (
        <button className="underline" onClick={() => setIsVisible(false)}>
          Hide
        </button>
      ) : (
        <button className="underline" onClick={() => setIsVisible(true)}>
          Show
        </button>
      )}
      {isVisible && <h4>{description}</h4>}
    </div>
  );
};

const InstaMart = () => {
  /* const [sectionConfig, setSectionConfig] = useState({
    showAbout: false,
    showTeam: false,
    showThird: false,
  }); */

  const [visibleSection, setVisibleSection] = useState("about");

  return (
    <div>
      {/*   <h1>This is instamart</h1>
      <h2>10000s of component</h2> */}
      {/*  <AboutInstaMart />
      <InstaMartDetails />
      <Team />
      <Products /> */}
      <h1 className="font-bold text-4xl m-2">InstaMart</h1>
      <Section
        title={"About InstaMart"}
        description="This is about us"
        /* isVisible={sectionConfig.showAbout}
        setIsVisible={() =>
          setSectionConfig({
            showAbout: true,
            showTeam: false,
            showThird: false,
          })
        } */
        isVisible={visibleSection === "about" ? true : false}
        setIsVisible={(show) => setVisibleSection(show ? "about" : "")}
      />
      <Section
        title={"Team InstaMart"}
        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        /* isVisible={sectionConfig.showTeam}
        setIsVisible={() =>
          setSectionConfig({
            showAbout: false,
            showTeam: true,
            showThird: false,
          })
        } */
        isVisible={visibleSection === "team" ? true : false}
        setIsVisible={(show) => setVisibleSection(show ? "team" : "")}
      />
      <Section
        title={"What is Lorem Ipsum?"}
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        /* isVisible={sectionConfig.showThird}
        setIsVisible={() =>
          setSectionConfig({
            showAbout: false,
            showTeam: false,
            showThird: true,
          })
        } */
        isVisible={visibleSection === "third" ? true : false}
        setIsVisible={(sure) => setVisibleSection(sure ? "third" : "")}
      />
    </div>
  );
};

export default InstaMart;
