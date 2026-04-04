import "./App.css"
import FavoriteCard from "./components/FavoriteCard"
import { Grid } from "@mui/material"
import data from "./data.json"

function Home() {
	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 4, sm: 8, md: 12 }}
		>
			{data.map((data) => (
				<Grid size={{ xs: 2, sm: 4, md: 4 }}>
					<FavoriteCard
						key={data.localId}
						name={data.name}
						id={data.id}
						localId={data.localId}
						image={data.image}
						link={data.link}
					/>
				</Grid>
			))}
		</Grid>
	)
}

export default Home
