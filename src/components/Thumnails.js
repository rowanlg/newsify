import React from "react";
import styled from "styled-components";
import { colours, fontSizes } from "../utils/utils";
import Masonry from "react-masonry-css";
import placeholder from "../assets/myNews.jpg";

/////// Main Function ///////
const Thumnails = ({ data }) => {
  const articles = data.slice(0, 50).map((article, key) => {
    return <NewsThumbnail key={key} article={article} />;
  });

  // console.log(data.slice(0, 50));

  ///// Breakpoints pre sidebar /////
  // const breakpoints = {
  //   default: 4,
  //   1350: 3,
  //   1030: 2,
  //   700: 1,
  // };

  const breakpoints = {
    default: 4,
    1650: 3,
    1330: 2,
    700: 1,
  };

  return (
    <MasonryContainer>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {articles}
      </Masonry>
    </MasonryContainer>
  );
};

const NewsThumbnail = ({ article }) => {
  return (
    <NewsThumbnailContainer>
      <img
        src={article.urlToImage ? article.urlToImage : placeholder}
        alt={article.title}
        loading="lazy"
      />
      <div>
        <h3>{article.source.name}</h3>
        <p>{article.title}</p>
        <button>Read more.</button>
      </div>
    </NewsThumbnailContainer>
  );
};

const MasonryContainer = styled.div`
  margin: auto;
  color: ${colours.dark};
  /* border: 1px solid red; */
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-right: 30px; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 30px;
  }
`;

const NewsThumbnailContainer = styled.div`
  width: 300px;
  border-radius: 5px;
  background-color: ${colours.white};
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    border-radius: 5px 5px 0 0;
    max-height: 200px;
    /* :hover {
      width: 110%;
    } */
  }

  div {
    width: 85%;
    margin: auto;
    text-align: left;
  }
  h3 {
    margin-bottom: 0;
    font-size: ${fontSizes.medium};
  }
  p {
    margin-top: 0;
    font-size: ${fontSizes.small};
  }
  button {
    margin-bottom: 15px;
    border: none;
    padding: 5px 20px;
    border-radius: 5px;
    background-color: ${colours.dark};
    color: ${colours.white};
    cursor: pointer;
    font-size: ${fontSizes.small};
  }
`;

export default Thumnails;
