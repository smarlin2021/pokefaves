import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useFavorites } from "../contexts/FavoritesContext";

export default function FavoriteCard({ id, name, image, localId, link }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(localId);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy link", err));
  };

  return (
    <Card sx={{ maxWidth: "20rem", backgroundColor: "#58d1bf" }}>
      <CardMedia
        component="img"
        image={image ? `${image}/high.png` : "/placeholder.png"}
        alt={name}
      />
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontFamily: "'Bitcount Prop Double Ink', sans-serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: ".3rem",
          }}
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={() => toggleFavorite(localId)}>
          <FavoriteIcon color={isFavorited ? "error" : "grey"} />
        </IconButton>
        <IconButton onClick={handleCopy}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
