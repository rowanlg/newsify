import logo from "./logo.svg";
import React from "react";
import "./App.css";
import styled from "styled-components";
import { colours, fontSizes } from "./utils/utils";
import Masonry from "react-masonry-css";
import Thumnails from "./components/Thumnails";

const AppContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
`;

const SideBar = styled.div`
  /* width: 100%; */
  height: inherit;
  /* position: fixed; */
  width: 300px;
  background-color: ${colours.white};
  display: none;
  @media screen and (min-width: 1000px) {
    display: block;
  }
`;

const MainContent = styled.div`
  margin: auto;
`;

function App() {
  const [data, setData] = React.useState([]);
  const url =
    "https://newsapi.org/v2/top-headlines?" +
    "sources=bbc-news&" +
    "apiKey=35af35641cd64a93a63d95294c569865";

  React.useEffect(() => {
    const req = new Request(url);
    fetch(req)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setData(data.articles);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data.slice(0, 9));

  return (
    <AppContainer className="App">
      <SideBar></SideBar>
      <MainContent>
        <h2>Tech</h2>
        <Thumnails data={data} />
      </MainContent>
    </AppContainer>
  );
}

export default App;
