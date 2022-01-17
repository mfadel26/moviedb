import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Movie.css";
import Poster from "../components/Poster";
import PropTypes from "prop-types";
import { Progress, Image, Badge } from "antd";
import { getApiCall2 } from "../actions/fetching";
import { useParams, useHistory } from "react-router-dom";

function Homes(props) {
	const [data, setData] = useState([]);
	const [datasimilar, setDatasimilar] = useState([]);
	const id = useParams();
	const history = useHistory();

	useEffect(() => {
		if (id) {
			getIdMovie();
			props.load(false);
		}
	}, [id]);

	const getIdMovie = (e) => {
		try {
			getApiCall2(id?.ctgr + "/" + id?.id, {}).then((result) => {
				setData(result?.data);
			});
		} catch (error) {
			console.log(error);
		}
		try {
			getApiCall2(id?.ctgr + "/" + id?.id + "/similar", { page: 2 }).then((result) => {
				setDatasimilar(result?.data);
			});
		} catch (error) {
			console.log(error);
		}
	};
	const getMovie = (e) => {
		if (e === "back") {
			history.push("/");
			return false;
		}
		history.push("/Movie/" + e + "/" + id?.ctgr);
	};

	return (
		<>
			<div className={"movieContainer"}>
				<div className="poster">
					<Poster title={data.original_title} img={data.poster_path} />
				</div>

				<div className="metadata">
					<div className="close" style={{ float: "right", cursor: "pointer" }}>
						<span onClick={() => getMovie("back")}>Close</span>
					</div>
					<h2 className="title">
						{data && data ? `${data.title}` : data.original_title}
					</h2>
					<p className="overvie">{data.overview}</p>
					<div className="infoContainer">
						<div className="info">
							<h4>Original Release</h4>
							<p>
								{data.release_date
									? moment(data.release_date).format("MMMM D, YYYY")
									: "N/A"}
							</p>
						</div>
						<div className="info">
							<h4>Running Time</h4>
							<p>
								{data.runtime === 0 || !data.runtime ? "N/A" : `${data.runtime} mins`}
							</p>
						</div>
						<div className="info">
							<h4>Budget</h4>
							{data.budget === 0 || !data.budget
								? "N/A"
								: `$${Number(data.budget).toLocaleString()}`}
						</div>
						<div className="info">
							<h4>Revenue</h4>
							<p>
								{data.revenue === 0 || !data.revenue
									? "N/A"
									: `$${Number(data.revenue).toLocaleString()}`}
							</p>
						</div>
						<div className="info">
							<h4>Voting Average</h4>
							<Badge
								count={
									<Progress
										style={{ backgroundColor: "black", borderRadius: 150 }}
										width={35}
										type="circle"
										trailColor="#F0F0F0"
										format={(percent) => (
											<p
												style={{
													fontWeight: "bold",
													color: "white",
													textAlign: "center",
													marginTop: 5,
													fontSize: 8,
												}}>
												{percent}%
											</p>
										)}
										strokeColor={{
											"0%": "#108ee9",
											"100%": "#21D07A",
										}}
										percent={data.vote_average * 10}
									/>
								}
								showZero></Badge>
							<p>{data.vote_average * 10}%</p>
						</div>
						<div className="info">
							<h4>Genres</h4>
							<div className="genres">
								{data.genres
									? data.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)
									: "N/A"}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="movieContainer">
				<p style={{ padding: 5, fontSize: 18, fontWeight: "bold" }}>
					You Might Also Like This!
				</p>
			</div>
			<div
				className="similar"
				style={{
					color: "#000000",
					overflowY: "hidden",
					display: "flex",
					textAlign: "center",
					position: "relative",
				}}>
				{datasimilar &&
					datasimilar.results &&
					datasimilar?.results.map((val, i) => {
						return (
							<div
								style={{
									display: "flex",
									padding: 10,
								}}>
								<div className="poster">
									<Badge
										count={
											<Progress
												style={{ backgroundColor: "black", borderRadius: 150 }}
												width={35}
												type="circle"
												trailColor="#F0F0F0"
												format={(percent) => (
													<p
														style={{
															fontWeight: "bold",
															color: "white",
															textAlign: "center",
															marginTop: 5,
															fontSize: 8,
														}}>
														{percent}%
													</p>
												)}
												strokeColor={{
													"0%": "#108ee9",
													"100%": "#21D07A",
												}}
												percent={val.vote_average * 10}
											/>
										}
										showZero
										offset={[-20, 220]}>
										<Image
											onClick={() => getMovie(val.id)}
											style={{ borderRadius: 10 }}
											preview={false}
											width={150}
											src={"https://image.tmdb.org/t/p/w500/" + val.poster_path}
										/>
									</Badge>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
}

export default Homes;
Homes.propTypes = {
	movie: PropTypes.object,
};
