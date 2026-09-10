import React, { useCallback, useEffect, useState } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { CircularProgress, Grid, TextField, Typography } from "@mui/material";
import Paginate from "../components/Paginate";
import tcgdex from "../TCGDex";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const fetchCards = useCallback(async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      if (searchQuery.trim() === "") {
        const set = await tcgdex.fetch("sets", "base1");
        setCards(set?.cards ?? []);
      } else {
        const results = await tcgdex.fetch("cards");
        const filtered = (results ?? []).filter((card) =>
          card.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setCards(filtered);
      }
    } catch (err) {
      setError(err?.message ?? "An error occurred while fetching cards.");
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCards(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query, fetchCards]);

  useEffect(() => {
    setCurrentPage(1);
  }, [cards]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const indexOfLastCard = currentPage * dataPerPage;
  const indexOfFirstCard = indexOfLastCard - dataPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
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
      {loading && <CircularProgress sx={{ margin: "2rem" }} />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <>
          <Grid
            container
            display="flex"
            spacing={{ xs: 3, md: 3, lg: 3, xl: 3 }}
            columns={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
            margin="1rem"
          >
            {currentCards.filter(Boolean).map((card) => (
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
        </>
      )}
    </div>
  );
};

export default SearchPage;
