import React, { useCallback, useEffect, useState } from "react";
import FavoriteCard from "../components/FavoriteCard";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Paginate from "../components/Paginate";
import tcgdex from "../TCGDex";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Most Popular reveal state
  const [revealedCard, setRevealedCard] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const getCardImage = (card) => {
    if (!card?.image) return null;
    if (
      !card.image.endsWith(".png") &&
      !card.image.endsWith(".jpg") &&
      !card.image.endsWith(".jpeg") &&
      !card.image.endsWith(".webp")
    ) {
      return `${card.image}/high.webp`;
    }

    return card.image;
  };

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

  const handleMostPopular = () => {
    if (!cards.length) return;

    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    setIsRevealing(true);
    setRevealedCard(randomCard);
  };

  const handleCloseReveal = () => {
    setIsRevealing(false);

    setTimeout(() => {
      setRevealedCard(null);
    }, 300);
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
            {/* <Button
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
            </Button> */}
            <Button
              variant="contained"
              onClick={handleMostPopular}
              disabled={loading || cards.length === 0}
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
                  backgroundColor: "#d158b7",
                  boxShadow: "0 0 15px rgba(209, 88, 183, 0.5)",
                },

                "&:disabled": {
                  backgroundColor: "#999",
                  color: "#ddd",
                },
              }}
            >
              Most Popular
            </Button>
          </Box>
          {/* <Box
            component="img"
            src="/your-wishlist-image.png"
            alt="Wishlist"
            sx={{
              width: "120px",
              height: "auto",
              marginTop: "2rem",
              objectFit: "contain",
            }}
          /> */}
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
                  borderColor: "#263626",
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

              {/* PAGINATION */}
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
      {revealedCard && (
        <Dialog
          open={Boolean(revealedCard)}
          onClose={handleCloseReveal}
          fullScreen
          PaperProps={{
            sx: {
              backgroundColor: "rgba(20, 30, 20, 0.92)",
              backdropFilter: "blur(8px)",
              boxShadow: "none",
              overflow: "hidden",
            },
          }}
        >
          <Box
            onClick={handleCloseReveal}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "450px",
                height: "450px",
                borderRadius: "50%",

                background:
                  "radial-gradient(circle, rgba(209,88,183,0.35) 0%, rgba(88,209,191,0.15) 40%, transparent 70%)",

                filter: "blur(20px)",
                animation: "pulseGlow 2s ease-in-out infinite",

                pointerEvents: "none",
              }}
            />

            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: "relative",

                width: {
                  xs: "75vw",
                  sm: "300px",
                  md: "360px",
                },

                maxWidth: "360px",

                borderRadius: "25px",
                overflow: "hidden",

                backgroundColor: "#263626",

                boxShadow: `
                  0 0 15px rgba(209, 88, 183, 0.7),
                  0 0 40px rgba(88, 209, 191, 0.5),
                  0 25px 80px rgba(0, 0, 0, 0.7)
                `,

                animation: isRevealing
                  ? "cardReveal 0.9s cubic-bezier(.17,.89,.32,1.28)"
                  : "cardHide 0.3s ease-in forwards",

                "@keyframes cardReveal": {
                  "0%": {
                    opacity: 0,
                    transform:
                      "perspective(1000px) rotateY(180deg) rotateX(20deg) scale(0.1)",
                    filter: "blur(20px)",
                  },

                  "50%": {
                    opacity: 1,
                    transform:
                      "perspective(1000px) rotateY(25deg) rotateX(-5deg) scale(1.08)",
                    filter: "blur(0px)",
                  },

                  "75%": {
                    transform:
                      "perspective(1000px) rotateY(-8deg) rotateX(2deg) scale(0.97)",
                  },

                  "100%": {
                    opacity: 1,
                    transform:
                      "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)",
                    filter: "blur(0px)",
                  },
                },

                "@keyframes cardHide": {
                  from: {
                    opacity: 1,
                    transform: "scale(1)",
                  },

                  to: {
                    opacity: 0,
                    transform: "scale(0.7)",
                  },
                },

                "@keyframes pulseGlow": {
                  "0%, 100%": {
                    transform: "scale(0.9)",
                    opacity: 0.6,
                  },

                  "50%": {
                    transform: "scale(1.1)",
                    opacity: 1,
                  },
                },
              }}
            >
              <IconButton
                onClick={handleCloseReveal}
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  zIndex: 5,

                  backgroundColor: "rgba(38, 54, 38, 0.8)",

                  color: "white",

                  "&:hover": {
                    backgroundColor: "#d158b7",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box
                component="img"
                src={getCardImage(revealedCard)}
                alt={revealedCard.name}
                sx={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  console.error("Could not load card image:", revealedCard);
                  e.currentTarget.style.display = "none";
                }}
              />

              <Box
                sx={{
                  padding: "1rem",
                  textAlign: "center",
                  backgroundColor: "#263626",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "'Bitcount Prop Double Ink', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    letterSpacing: "0.08rem",
                  }}
                >
                  {revealedCard.name}
                </Typography>

                <Typography
                  sx={{
                    color: "#58d1bf",
                    marginTop: "0.25rem",
                    fontSize: "0.8rem",
                  }}
                >
                  ✦ MOST POPULAR ✦
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                position: "absolute",
                bottom: "30px",
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.8rem",
                letterSpacing: "0.1rem",
              }}
            >
              CLICK OUTSIDE TO CLOSE
            </Typography>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default SearchPage;
