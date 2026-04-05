import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	IconButton,
	Typography,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import { useState } from "react"

export default function FavoriteCard({ id, name, image, localId, link }) {
	const [favorite, setFavorite] = useState(() =>
		JSON.parse(localStorage.getItem("favorites") || "[]"),
	)
	const isFavorited = favorite.includes(localId)
	const handleToggleFavorite = () => {
		if (!isFavorited) {
			const newFavorite = [...favorite, localId]
			setFavorite(newFavorite)
			localStorage.setItem("favorites", JSON.stringify(newFavorite))
		} else {
			const newFavorite = favorite.filter((savedId) => savedId !== localId)
			setFavorite(newFavorite)
			localStorage.setItem("favorites", JSON.stringify(newFavorite))
		}
	}
	const handleCopy = () => {
		navigator.clipboard
			.writeText(link)
			.then(() => {
				alert("Link copied to clipboard!")
			})
			.catch((err) => {
				console.error("Failed to copy link", err)
			})
	}

	return (
		<Card sx={{ maxWidth: 350, backgroundColor: "rgb(223, 204, 204)" }}>
			<CardHeader title={name} />
			<CardMedia
				component="img"
				height="294"
				image={image}
			/>
			<CardContent>
				<Typography
					variant="body2"
					sx={{ color: "text.secondary" }}
				>
					{id}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton onClick={handleToggleFavorite}>
					{isFavorited ? (
						<FavoriteIcon color="error" />
					) : (
						<FavoriteIcon color="grey" />
					)}
				</IconButton>
				<IconButton onClick={handleCopy}>
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}
