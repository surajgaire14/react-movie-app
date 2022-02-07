import React, { useEffect, useState } from "react";

const Latest = () => {
  const [lates, setLatest] = useState("");

  useEffect(async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}latest?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const data = await res.json();
    console.log(data);
    setLatest(data.results);
  });

  return <div></div>;
};

export default Latest;
