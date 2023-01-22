const Shimmer = () => {
  const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    /* {numArray.map((n)=>{ return (<div className="restaurant-list" key={n}>
    <div className="shimmer-card"></div>
  </div>)})} */
    <div className="restaurant-list">
      {Array(10)
        .fill("")
        .map((n) => {
          return <div className="shimmer-card" key={n}></div>;
        })}
      {numArray.map((n) => {
        return <div className="shimmer-card" key={n}></div>;
      })}
    </div>
  );
};

export default Shimmer;
