import "./App.css";

import { Helmet } from "react-helmet-async";

const siteMetadata = {
  title: "The Birthday Atlas",
  description:
    "Explore people's birthdays. See who has already celebrated, has one upcoming, or whose special day is today! ",
};

function App() {
  return (
    <>
      <Helmet>
        <title>{siteMetadata.title}</title>
        <meta name="description" lang="en" content={siteMetadata.description} />
      </Helmet>
      <h1>The Birthday Atlas</h1>
    </>
  );
}

export default App;
