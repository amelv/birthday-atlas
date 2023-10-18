import useMediaQuery from "@/hooks/useMediaQuery";

import { useAppContext } from "@/context/AppContext";
import "./ExploreTools.css";

import SortField from "@/components/ExploreTools/SortField";

function ExploreTools() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [{ isSearchToolsOpen }] = useAppContext();

  return (
    <aside
      aria-hidden={isMobile && !isSearchToolsOpen}
      className={`explore-tools${isMobile && isSearchToolsOpen ? " open" : ""}`}
    >
      <h2 className="explore-tools__title">Explore Tools</h2>
      <p className="explore-tools__title-description">
        Use the tools below to explore the atlas. Sort the atlas by name, age,
        or birthday.
      </p>
      <form
        className="explore-tools__form"
        onSubmit={(e) => e.preventDefault()}
      >
        <SortField />
      </form>
    </aside>
  );
}

export default ExploreTools;
