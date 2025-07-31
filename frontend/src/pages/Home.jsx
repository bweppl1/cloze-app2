import ClozeQuestion from "../components/ClozeQuestion";

function Home({ showTranslations, onAnswer }) {
  return (
    <div className="Home">
      <ClozeQuestion onAnswer={onAnswer} showTranslations={showTranslations} />
    </div>
  );
}

export default Home;
