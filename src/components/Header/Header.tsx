import SettingsIcon from "@/assets/settings.svg";
import { useAppContext } from "@/context/AppContext";
import useMediaQuery from "@/hooks/useMediaQuery";
import "./Header.css";

function Header() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [, dispatch] = useAppContext();
  return (
    <header className="header-bar">
      {isDesktop ? (
        <span style={{ marginRight: "auto" }} />
      ) : (
        <button
          className="header-bar__settings-button"
          aria-label="Toggle Search Tools Menu"
          onClick={() => dispatch({ type: "TOGGLE_SEARCH_TOOLS" })}
        >
          <img
            src={SettingsIcon}
            className="header-bar__settings-icon"
            alt=""
          />
        </button>
      )}
      <h1 className="header-bar__title">The Birthday Atlas</h1>

      <span style={{ marginLeft: "auto" }}></span>
    </header>
  );
}

export default Header;
