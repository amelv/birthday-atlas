import BirthdayProfiles from "@/components/BirthdayProfiles";
import ExploreTools from "@/components/ExploreTools";
import Header from "@/components/Header.tsx";
import { AppContextProvider } from "@/context/AppContext";

import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <div className="main-container">
        <ExploreTools />
        <BirthdayProfiles />
      </div>
    </AppContextProvider>
  );
}

export default App;
