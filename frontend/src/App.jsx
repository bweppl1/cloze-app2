import { useEffect, useState } from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import UserDisplay from "./components/UserDisplay";
import OptionsBar from "./components/OptionsBar";
import correctSound from "./assets/sounds/correct.mp3";
import incorrectSound from "./assets/sounds/incorrect.wav";
import { saveUserData, loadUserData } from "./services/userService";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [showTranslations, setShowTranslations] = useState(true);
  const [playSound, setPlaySound] = useState(true);
  const [userData, setUserData] = useState(loadUserData());
  const [audio] = useState({
    correct: new Audio(correctSound),
    incorrect: new Audio(incorrectSound),
  });

  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  useEffect(() => {
    audio.correct.load(), audio.incorrect.load();
    return () => {
      audio.correct.remove();
      audio.incorrect.remove();
    };
  }, [audio]);

  const handleAnswer = (isCorrect) => {
    setUserData((prev) => {
      let newLvl = prev.lvl || 0;
      let newXp = prev.xp || 0;
      let newStreak = prev.streak || 0;

      // answer feedback sound
      const sound = isCorrect ? audio.correct : audio.incorrect;
      sound.currentTime = 0;
      if (playSound) {
        sound.play();
      }

      // handling correct/incorrect events
      if (!isCorrect) {
        newXp = Math.max(0, prev.xp - 1);
        newStreak = 0;
      }
      if (isCorrect) {
        console.log(userData.streak);
        newXp += 1;
        newStreak += 1;
      }

      // checking for level up
      if (newXp > 5) {
        newXp = 0;
        newLvl = prev.lvl + 1;
      }

      return {
        xp: newXp,
        lvl: newLvl,
        streak: newStreak,
      };
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <UserDisplay
          xp={userData.xp}
          lvl={userData.lvl}
          streak={userData.streak}
        />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onAnswer={handleAnswer}
                  showTranslations={showTranslations}
                />
              }
            />
          </Routes>
        </div>
        <OptionsBar
          onTranslationToggle={setShowTranslations}
          showTranslations={showTranslations}
          onSoundToggle={setPlaySound}
          playSound={playSound}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
