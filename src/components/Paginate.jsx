import { Box, Pagination } from "@mui/material";

const Paginate = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          fontFamily: "'Bitcount Prop Double Ink', sans-serif",
        }}
      >
        <Pagination
          count={pageNumber.length}
          onChange={(e, p) => paginate(p)}
        />
      </Box>
    </nav>
  );
};

export default Paginate;
