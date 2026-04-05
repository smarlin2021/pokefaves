import "./App.css"
import FavoriteCard from "./components/FavoriteCard"
import Paginate from "./components/Paginate"
import { Grid } from "@mui/material"
import data from "./data.json"
import { useState } from "react"

function Home() {
	const [currentPage, setCurrentPage] = useState(1)
	const dataPerPage = 6

	const indexOfLastPost = currentPage * dataPerPage
	const indexOfFirstPost = indexOfLastPost - dataPerPage
	const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
	const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
				{currentPosts.map((data) => (
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
			<br />
			<Paginate
				postsPerPage={dataPerPage}
				totalPosts={data.length}
				paginate={paginate}
			/>{" "}
		</div>
	)
}

export default Home
