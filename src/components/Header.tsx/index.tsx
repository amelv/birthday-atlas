import CakeIcon from "@/assets/cake.svg";
import CompassIcon from "@/assets/compass.svg";
import "./index.css";

export const Header = () => {
  return (
    <header className="header-bar">
      <span /* placeholder */ />
      <div className="header-bar__title">
        <img src={CakeIcon} className="header-bar__title-logo" alt="" />
        <h1 className="header-bar__title">The Birthday Atlas</h1>
        <img src={CompassIcon} className="header-bar__title-logo" alt="" />
      </div>
      <span /* placeholder */ />
    </header>
  );
};
