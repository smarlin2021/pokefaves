import { useState } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { Grid, TextField } from "@mui/material";
import data from "../data.json";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredCards = data.cards.filter((card) => {
    if (query === "") return card;
    return card.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div display="flex" justifyContent="center">
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        onChange={handleSearch}
      />
      <Grid item xs={12} sm={6} md={4} lg={3} key={data.cards.localId}>
        {filteredCards.map((card) => (
          <FavoriteCard
            name={card.name}
            id={card.id}
            localId={card.localId}
            image={card.image}
            link={card.link}
          />
        ))}
      </Grid>
    </div>
  );
};

export default SearchPage;
