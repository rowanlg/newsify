import logo from "./logo.svg";
import React from "react";
import "./App.css";
import styled from "styled-components";
import { colours, fontSizes } from "./utils/utils";
import Masonry from "react-masonry-css";
import Thumnails from "./components/Thumnails";
import SideBar from "./components/SideBar";

const AppContainer = styled.div`
  display: flex;
  color: ${colours.white};
  /* justify-content: space-between; */
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* height: 100px; */
  margin: 50px 30px 10px;
  width: 94%;
  /* border: 1px solid red; */
  input {
    padding: 10px;
    border-radius: 5px 0 0 5px;
    border: none;
    font-family: "Montserrat", sans-serif;
    min-width: 200px;
  }
  button {
    padding: 10px;
    border-radius: 0 5px 5px 0;
    border: none;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
    /* min-width: 200px; */
  }
`;

const MainContent = styled.div`
  margin: auto;
  min-width: 72%;
  min-height: 100vh;
`;

function App() {
  const [data, setData] = React.useState([]);
  const [searchType, setSearchType] = React.useState("top-headlines");
  const [keyword, setKeyword] = React.useState(null);
  const [parameters, setParameters] = React.useState({
    endpoint: "top-headlines",
    country: "gb",
    category: null,
    sources: null,
    q: null,
    pageSize: 100,
  });

  const qCalculation = parameters.q ? `q=${parameters.q}&` : "";

  const url =
    `https://newsapi.org/v2/${parameters.endpoint}?` +
    `country=${parameters.country}&` +
    qCalculation +
    "apiKey=831e97b09158486dac67fbb1fd1ee9b9";

  // console.log(url);

  React.useEffect(() => {
    const req = new Request(url);
    const fetchData = setTimeout(() => {
      fetch(req)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setData(data.articles);
        })
        .catch((err) => console.log(err));
    }, 500);
    return () => clearTimeout(fetchData);
  }, [parameters]);
  // console.log(data.slice(0, 9));

  console.log(data);

  function handleCountry() {
    switch (parameters.country) {
      case "gb":
        return "UK News";
        break;
      case "us":
        return "USA News";
        break;
      default:
        break;
    }
  }

  return (
    <AppContainer className="App">
      <SideBar
        parameters={parameters}
        setParameters={setParameters}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      <MainContent>
        <TopBar>
          <h2>
            {parameters.q
              ? parameters.q[0].toUpperCase() + parameters.q.substring(1)
              : handleCountry()}
          </h2>
          <div>
            <input
              placeholder="Search"
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setParameters({
                    ...parameters,
                    q: keyword,
                  });
                }
              }}
            />
            <button
              onClick={() => {
                setParameters({
                  ...parameters,
                  q: keyword,
                });
              }}
            >
              Go
            </button>
          </div>
        </TopBar>
        <Thumnails data={data} />
        {data.length == 0 ? (
          <>
            <h3>No news found, sorry :(</h3>
          </>
        ) : null}
      </MainContent>
    </AppContainer>
  );
}

export default App;
