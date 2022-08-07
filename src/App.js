import logo from "./logo.svg";
import React from "react";
import "./App.css";
import styled from "styled-components";
import { colours } from "./utils/colours";

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const NewsThumbnailContainer = styled.div`
  width: 300px;
  margin: 20px;
  border-radius: 5px;
  background-color: ${colours.white};
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    border-radius: 5px 5px 0 0;
    /* :hover {
      width: 110%;
    } */
  }

  div {
    width: 90%;
    margin: auto;
    text-align: left;
  }
  h3 {
    margin-bottom: 0;
  }
  p {
    margin-top: 0;
  }
  button {
    margin-bottom: 10px;
    border: none;
    padding: 5px 20px;
    border-radius: 5px;
    background-color: ${colours.dark};
    color: ${colours.white};
    cursor: pointer;
  }
`;

const NewsThumbnail = ({ article }) => {
  return (
    <NewsThumbnailContainer>
      <img src={article.urlToImage} alt={article.title} />
      <div>
        <h3>{article.source.name}</h3>
        <p>{article.title}</p>
        <button>Read more.</button>
      </div>
    </NewsThumbnailContainer>
  );
};

function App() {
  const [data, setData] = React.useState([]);
  const url =
    "https://newsapi.org/v2/everything?" +
    "q=Apple&" +
    "from=2022-08-07&" +
    "sortBy=popularity&" +
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
    console.log(data.slice(0, 5));
  }, []);

  const articles = data.slice(0, 5).map((article, key) => {
    return <NewsThumbnail key={key} article={article} />;
  });
  return <AppContainer className="App">{articles}</AppContainer>;
}

export default App;
