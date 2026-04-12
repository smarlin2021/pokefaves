import FavoriteCard from "../components/FavoriteCard";
import Paginate from "../components/Paginate";
import { Grid } from "@mui/material";
import data from "../data.json";
import { useState } from "react";

import { useFavorites } from "../contexts/FavoritesContext";

function SavedCards() {
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const savedCards = data.cards.filter((card) =>
    favorites.includes(card.localId),
  );
  const indexOfLastCard = currentPage * dataPerPage;
  const indexOfFirstCard = indexOfLastCard - dataPerPage;
  const currentCards = savedCards.slice(indexOfFirstCard, indexOfLastCard);
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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {currentCards.map((card) => (
          <Grid size={{ xs: 2, sm: 4, md: 4 }} key={card.localId}>
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
        totalPosts={savedCards.length}
        paginate={paginate}
      />
    </div>
  );
}
export default SavedCards;
