import React from "react";
import styled from "styled-components";
import { colours, fontSizes } from "../utils/utils";
import Masonry from "react-masonry-css";
import placeholder from "../public/myNews.jpg";

/////// Main Function ///////
const Thumbnails = ({ data }) => {
  const articles = data.slice(0, 50).map((article, key) => {
    return <NewsThumbnail key={key} article={article} />;
  });

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
        <h3>{article.source.Name}</h3>
        <p>{article.title}</p>
        <p>{article.author}</p>
        <a href={article.url} target="_blank">
          Read more.
        </a>
      </div>
    </NewsThumbnailContainer>
  );
};

const MasonryContainer = styled.div`
  margin: auto;
  color: ${colours.dark};
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
  /* height: 400px; */
  border-radius: 5px;
  background-color: ${colours.white};
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  /* box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2); */
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
  a {
    margin-bottom: 10px;
    border: none;
    padding: 5px 20px;
    border-radius: 5px;
    background-color: ${colours.dark};
    color: ${colours.white};
    cursor: pointer;
    font-size: ${fontSizes.small};
    text-decoration: none;
  }
`;

export default Thumbnails;
