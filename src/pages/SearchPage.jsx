import React, { useCallback, useEffect, useState } from "react";
import FavoriteCard from "../components/FavoriteCard";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Paginate from "../components/Paginate";
import tcgdex from "../TCGDex";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dataPerPage = 8;

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#f5f5f0",
        padding: {
          xs: "1rem",
          md: "2rem",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: "flex-start",
          gap: {
            xs: "1rem",
            md: "2rem",
          },
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "150px",
            },
            minWidth: {
              md: "150px",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "20px",
                backgroundColor: "#263626",
                color: "white",
                fontFamily: "'Bitcount Prop Double Ink', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.05rem",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#384b38",
                  boxShadow: "none",
                },
              }}
            >
              Your Wishlist
            </Button>

            <Button
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "20px",
                backgroundColor: "#263626",
                color: "white",
                fontFamily: "'Bitcount Prop Double Ink', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.05rem",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#384b38",
                  boxShadow: "none",
                },
              }}
            >
              Most Wanted
            </Button>

            <Button
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "20px",
                backgroundColor: "#263626",
                color: "white",
                fontFamily: "'Bitcount Prop Double Ink', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.05rem",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#384b38",
                  boxShadow: "none",
                },
              }}
            >
              Most Popular
            </Button>
          </Box>

          <Box
            component="img"
            src="/your-wishlist-image.png"
            alt="Wishlist"
            sx={{
              width: "120px",
              height: "auto",
              marginTop: "2rem",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            width: "100%",
            minWidth: 0,
          }}
        >
          <TextField
            fullWidth
            value={query}
            onChange={handleSearch}
            placeholder="Search for a Pokémon card..."
            variant="outlined"
            sx={{
              marginBottom: "1.5rem",

              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                borderRadius: "20px",
                height: "45px",

                "& fieldset": {
                  borderColor: "#30c7cd",
                  borderWidth: "2px",
                },

                "&:hover fieldset": {
                  borderColor: "#d158b7",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#d158b7",
                },
              },

              "& .MuiInputBase-input": {
                padding: "10px 18px",
              },
            }}
          />
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "4rem",
              }}
            >
              <CircularProgress
                sx={{
                  color: "#d158b7",
                }}
              />
            </Box>
          )}
          {error && (
            <Typography
              color="error"
              sx={{
                textAlign: "center",
                padding: "2rem",
              }}
            >
              {error}
            </Typography>
          )}
          {!loading && !error && (
            <>
              <Grid
                container
                spacing={{
                  xs: 2,
                  sm: 2,
                  md: 2.5,
                }}
              >
                {currentCards.filter(Boolean).map((card) => (
                  <Grid
                    key={card.localId}
                    size={{
                      xs: 6,
                      sm: 4,
                      md: 3,
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        minHeight: {
                          xs: "220px",
                          md: "270px",
                        },
                        borderRadius: "18px",
                        overflow: "hidden",
                        backgroundColor: "#263626",
                      }}
                    >
                      <FavoriteCard
                        name={card.name}
                        id={card.id}
                        localId={card.localId}
                        image={card.image}
                        link={card.link}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
              {currentCards.length === 0 && (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "#263626",
                    marginTop: "3rem",
                    fontFamily: "'Bitcount Prop Double Ink', sans-serif",
                  }}
                >
                  No cards found.
                </Typography>
              )}
              {cards.length > dataPerPage && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2rem",
                    paddingBottom: "1rem",
                  }}
                >
                  <Paginate
                    postsPerPage={dataPerPage}
                    totalPosts={cards.length}
                    paginate={paginate}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchPage;
