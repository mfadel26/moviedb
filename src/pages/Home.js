import React, { useEffect, useState } from "react";
import { Progress, Carousel, Image, Badge, Tabs, Button, message } from "antd";
import { getApiCall2 } from "../actions/fetching";
import "./Movie.css";
import { useHistory } from "react-router-dom";
const { TabPane } = Tabs;
const contentStyle = {
	color: "#000000",
	textAlign: "center",
	background: "#001529",
	position: "relative",
	borderRadius:5,
	background: `linear-gradient(to right, #e8eff0, #e3f4f5, #c6f1f0)`
};
function Home(props) {
	const history = useHistory();
	const [data, setData] = useState([]);
	const [tabid, setTabid] = useState("1");
	const [dataCarousel, setDataCarousel] = useState([]);
	useEffect(() => {
		getData();
	}, []);
	const getData = () => {
		try {
			getApiCall2("movie/now_playing", {}).then((result) => {
				setDataCarousel(result?.data);
			});
		} catch (error) {
			message.error('Network Error');
		}
		try {
			getApiCall2("movie/top_rated", {}).then((result) => {
				setData(result?.data);
				props.load(false)	
			});
		} catch (error) {
			message.error('Network Error');
		}
	};
	const getIdMovie = (e) => {
		let ctgr = "/movie";
		if (tabid === "2") {
			ctgr = "/tv";
		}
		history.push("/Movie/" + e + ctgr);
	};

	const callback = (key) => {
		props.load(true)	
		if (key === "1") {
			try {
				getApiCall2("movie/top_rated", {}).then((result) => {
					setData(result?.data);
					props.load(false)	
				});
			} catch (error) {
				message.error('Network Error');
			}
		}
		if (key === "2") {
			try {
				getApiCall2("tv/on_the_air", {}).then((result) => {
					setData(result?.data);
					props.load(false)
				});
			} catch (error) {
				message.error('Network Error');
			}
		}
		if (key === "3") {
			try {
				getApiCall2("movie/top_rated", {}).then((result) => {
					setData(result?.data);
					props.load(false)
				});
			} catch (error) {
				message.error('Network Error');
			}
		}
		if (key === "4") {
			try {
				getApiCall2("movie/now_playing", {}).then((result) => {
					setData(result?.data);
					props.load(false)
				});
			} catch (error) {
				message.error('Network Error');
			}
		}

		setTabid(key);
	};
	const SampleNextArrow = (props) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					color: "black",
					fontSize: "25px",
					lineHeight: "1.5715",
				}}
				onClick={onClick}
			/>
		);
	};

	const SamplePrevArrow = (props) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					color: "black",
					fontSize: "25px",
					lineHeight: "1.5715",
				}}
				onClick={onClick}
			/>
		);
	};

	const settings = {
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div>
			{/* <Layout > */}
				<Carousel autoplay effect="scrollx" autoplaySpeed={2000} arrows {...settings}>
					{dataCarousel &&
						dataCarousel.results &&
						dataCarousel?.results.map((val, i) => {
							return (
								<div>
									<h3 style={contentStyle}>
										<Image
											preview={false}
											width={330}
											src={"https://image.tmdb.org/t/p/original/" + val.poster_path}
										/>{" "}
									</h3>
								</div>
							);
						})}
				</Carousel>
				<Tabs defaultActiveKey="1" onChange={callback}>
					<TabPane
						tab={
							<Button
								style={{
									backgroundColor: tabid === "1" ? "#032541" : "white",
									borderRadius: 40,
									color: tabid !== "1" ? "black" : "white",
								}}>
								Streaming
							</Button>
						}
						key={1}></TabPane>
					<TabPane
						tab={
							<Button
								style={{
									backgroundColor: tabid === "2" ? "#032541" : "white",
									borderRadius: 40,
									color: tabid !== "2" ? "black" : "white",
								}}>
								On TV
							</Button>
						}
						key={2}></TabPane>
					<TabPane
						tab={
							<Button
								style={{
									backgroundColor: tabid === "3" ? "#032541" : "white",
									borderRadius: 40,
									color: tabid !== "3" ? "black" : "white",
								}}>
								For Rent
							</Button>
						}
						key={3}></TabPane>
					<TabPane
						tab={
							<Button
								style={{
									backgroundColor: tabid === "4" ? "#032541" : "white",
									borderRadius: 40,
									color: tabid !== "4" ? "black" : "white",
								}}>
								In Theaters
							</Button>
						}
						key={4}></TabPane>
				</Tabs>
				<div
					style={{
						color: "#000000",
						overflowY: "hidden",
						display: "flex",
						textAlign: "center",
						// background: "#F5F5F5",
						position: "relative",
						borderRadius:10,
						background:`linear-gradient(to right, #e8eff0, #e3f4f5, #c6f1f0)`
					}}>
					{data &&
						data.results &&
						data?.results.map((val, i) => {
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
												onClick={() => getIdMovie(val.id)}
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
			{/* </Layout> */}
		</div>
	);
}

export default Home;
