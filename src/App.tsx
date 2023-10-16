import BirthdayProfiles from "@/components/BirthdayProfiles";
import Header from "@/components/Header.tsx";
import SearchTools from "@/components/SearchTools";
import { AppContextProvider } from "@/context/AppContext";

import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <div className="main-container">
        <SearchTools />
        <BirthdayProfiles />
      </div>
    </AppContextProvider>
  );
}

export default App;
