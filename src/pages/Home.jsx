import FavoriteCard from "../components/FavoriteCard";
import Paginate from "../components/Paginate";
import { Grid } from "@mui/material";
import data from "../data.json";
import { useState } from "react";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const indexOfLastCard = currentPage * dataPerPage;
  const indexOfFirstCard = indexOfLastCard - dataPerPage;
  const currentCards = data.cards.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
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
        totalPosts={data.cards.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Home;
