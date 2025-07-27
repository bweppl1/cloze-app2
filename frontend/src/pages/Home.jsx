import ClozeQuestion from "../components/ClozeQuestion";

function Home({ showTranslations }) {
  return (
    <div className="Home">
      <ClozeQuestion showTranslations={showTranslations} />
    </div>
  );
}

export default Home;
