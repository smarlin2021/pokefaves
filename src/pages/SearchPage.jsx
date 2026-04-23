import React, { useState } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { Grid, TextField } from "@mui/material";
import Paginate from "../components/Paginate";
import data from "../data.json";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;
  const filteredCards = data.cards.filter((card) => {
    if (query === "") return card;
    return card.name.toLowerCase().includes(query.toLowerCase());
  });
  const indexOfLastCard = currentPage * dataPerPage;
  const indexOfFirstCard = indexOfLastCard - dataPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleSearch}
        sx={{ margin: "1rem", width: "97%" }}
      />
      <Grid
        container
        display="flex"
        spacing={{ xs: 3, md: 3, lg: 3, xl: 3 }}
        columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        margin="1rem"
      >
        {currentCards.map((card) => (
          <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
            <FavoriteCard
              key={card.localId}
              name={card.name}
              id={card.id}
              localId={card.localId}
              image={card.image}
              link={card.link}
            />
          </Grid>
        ))}
      </Grid>
      <br />
      <Paginate
        postsPerPage={dataPerPage}
        totalPosts={currentCards.length}
        paginate={paginate}
      />
    </div>
  );
};

export default SearchPage;
