import React from "react";
import styled from "styled-components";
import { colours, fontSizes } from "../utils/utils";

const SideBarContainer = styled.div`
  /* width: 100%; */
  height: inherit;
  /* position: fixed; */
  width: 300px;
  background-color: ${colours.dark};
  display: none;
  @media screen and (min-width: 1000px) {
    display: block;
  }
  div {
    width: 200px;
    margin: 60px 40px 0;
    text-align: left;
    /* border: 1px solid red; */
    position: fixed;
  }
  div:nth-of-type(2) {
    margin-top: 150px;
  }
  div:nth-of-type(3) {
    margin-top: 350px;
  }
  h4 {
    margin: 5px 0;
    font-weight: 300;
    cursor: pointer;
  }
  .focussed {
    font-weight: 700;
  }
  h1 {
    font-style: italic;
    font-weight: 800;
    margin: 0;
  }
  p:nth-of-type(1) {
    margin: 5px 0;
    font-style: italic;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    text-align: left;
    font-weight: 500;
    font-size: ${fontSizes.large};
    margin: 5px 0;
    cursor: pointer;
    width: auto;
  }
`;

const SideBar = ({ parameters, setParameters, searchType, setSearchType }) => {
  // console.log(searchType);
  return (
    <SideBarContainer>
      <div>
        <h1>myNews</h1>
        <p>The daily dose</p>
      </div>
      <div>
        <p>Top Categories:</p>
        <ul>
          <li
            onClick={() => {
              setParameters({
                ...parameters,
                country: "gb",
              });
            }}
          >
            UK
          </li>
          <li
            onClick={() => {
              setParameters({
                ...parameters,
                country: "us",
              });
            }}
          >
            USA
          </li>
          <li>Tech</li>
          <li>Crypto</li>
          <li>Finance</li>
        </ul>
      </div>
      <div>
        <h4
          className={searchType === "top-headlines" ? "focussed" : ""}
          onClick={() => {
            if (searchType !== "top-headlines") {
              setSearchType("top-headlines");
            }
          }}
        >
          Top Headlines
        </h4>
        <h4
          className={searchType === "everything" ? "focussed" : ""}
          onClick={() => {
            if (searchType !== "everything") {
              setSearchType("everything");
            }
          }}
        >
          Internet Wide Search
        </h4>
      </div>
    </SideBarContainer>
  );
};

export default SideBar;
