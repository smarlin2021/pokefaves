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
    <Card sx={{ maxWidth: 350, backgroundColor: "rgb(223, 204, 204)" }}>
      <CardHeader title={name} />
      <CardMedia component="img" height="294" image={image} />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {id}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
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
