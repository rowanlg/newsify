import logo from "./logo.svg";
import React from "react";
import "./App.css";
import styled from "styled-components";
import { colours, fontSizes } from "./utils/utils";
import Masonry from "react-masonry-css";
import Thumnails from "./components/Thumnails";
import SideBar from "./components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

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
  margin: 0px 30px 10px;
  width: 94%;
  /* border: 1px solid red; */
  div.search-section {
    display: flex;
    flex-direction: row;
  }
  svg {
    font-size: 28px;
    margin: auto 0 auto 20px;
    cursor: pointer;
  }
  input {
    padding: 10px;
    border-radius: 5px 0 0 5px;
    border: none;
    font-family: "Montserrat", sans-serif;
    min-width: 200px;
  }
  button.search-bar-button {
    padding: 10px;
    border-radius: 0 5px 5px 0;
    border: none;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
    /* min-width: 200px; */
  }
`;

const ParametersContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
  margin-right: 10px;
`;

const Parameters = styled.div`
  font-size: ${fontSizes.xSmall};
  margin: auto 3px;
  padding-left: 8px;
  border-radius: 5px;
  background-color: #363636;
  button {
    border-radius: 5px;
    border: none;
    background-color: #363636;
    color: ${colours.white};
    cursor: pointer;
  }
`;

const MainContent = styled.div`
  margin: auto;
  min-width: 72%;
  min-height: 100vh;
  h2.top-title {
    text-align: left;
    margin: 60px 0 0 0;
    font-size: ${fontSizes.xLarge};
  }
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
    pageSize: 25,
  });

  // const apiKey = "831e97b09158486dac67fbb1fd1ee9b9";
  const apiKey = "35af35641cd64a93a63d95294c569865";

  const countryCalculation = parameters.country
    ? `country=${parameters.country}&`
    : "";
  const sourcesCalculation = parameters.sources
    ? `sources=${parameters.sources}&`
    : "";
  const qCalculation = parameters.q ? `q=${parameters.q}&` : "";
  const pageSizeCalculation = parameters.pageSize
    ? `pageSize=${parameters.pageSize}&`
    : "";

  function handleUrl() {
    if (searchType === "top-headlines") {
      return (
        `https://newsapi.org/v2/${parameters.endpoint}?` +
        countryCalculation +
        qCalculation +
        sourcesCalculation +
        `apiKey=${apiKey}`
      );
    } else {
      return (
        `https://newsapi.org/v2/${parameters.endpoint}?` +
        `country=${parameters.country}&` +
        qCalculation +
        `apiKey=${apiKey}`
      );
    }
  }

  // const url =
  //   `https://newsapi.org/v2/${parameters.endpoint}?` +
  //   `country=${parameters.country}&` +
  //   qCalculation +
  //   "apiKey=831e97b09158486dac67fbb1fd1ee9b9";

  // console.log(url);

  React.useEffect(() => {
    const req = new Request(handleUrl());
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

  // React.useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "./utils.getHtml.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

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

  const parametersMap = Object.entries(parameters).map((item, key) => {
    if (item[1] && item[0] !== "endpoint") {
      // console.log(item[1]);
      return (
        <Parameters key={key}>
          {`${item[0]}: ${item[1]}`}
          <button
            onClick={() => {
              if (item[0] !== "country") {
                setParameters({
                  ...parameters,
                  [item[0]]: null,
                });
              }
            }}
          >
            X
          </button>
        </Parameters>
      );
    }
  });

  return (
    <AppContainer className="App">
      <SideBar
        parameters={parameters}
        setParameters={setParameters}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      <MainContent>
        <h2 className="top-title">
          {searchType === "top-headlines"
            ? "Top Headlines"
            : "Internet Wide Search"}
        </h2>
        <TopBar>
          <h2>
            {parameters.q
              ? parameters.q[0].toUpperCase() + parameters.q.substring(1)
              : handleCountry()}
          </h2>
          <div className="search-section">
            <ParametersContainer>{parametersMap}</ParametersContainer>
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
              className="search-bar-button"
              onClick={() => {
                setParameters({
                  ...parameters,
                  q: keyword,
                });
              }}
            >
              Go
            </button>
            <FontAwesomeIcon icon={faSliders} />
          </div>
        </TopBar>
        <Thumnails data={data} />
        {data.length == 0 || data == undefined ? (
          <>
            <h3>No news found, sorry :(</h3>
          </>
        ) : null}
      </MainContent>
    </AppContainer>
  );
}

export default App;
