import { useEffect, useState } from "react";
import ClozeQuestion from "../components/ClozeQuestion";
import ClozeAnswer from "../components/ClozeAnswer";

function Home() {
  const [sentence, setSentence] = useState("");

  return (
    <div className="Home">
      <ClozeQuestion />
      <ClozeAnswer />
    </div>
  );
}

export default Home;
