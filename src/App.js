import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import Movie from "./pages/Home";
import MovieId from "./pages/MovieId";
import { Layout, Menu, Image, Spin } from "antd";
import "./App.css";
import FontAwesome from "react-fontawesome";
const { Header, Footer } = Layout;
export default function App() {
	const [isload, setIsload] = useState(true);
	const load = (e) => {
		setTimeout(() => {
			setIsload(e);
		}, 2000);
	};

	return (
		<>
			{isload && (
				<div className="spin">
					<Spin size="large" />
				</div>
			)}
			<div className={isload ? "load" : "route"}>
				<Router>
					<Header>
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={["1"]}
							style={{ float: "right" }}>
							<Menu.Item>
								<a href="https://github.com/mfadel26/moviedb">Github - M Fadel</a>{" "}
							</Menu.Item>
							<Menu.Item key="2">
								<Image
									preview={false}
									width={50}
									src={
										"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
									}
								/>
							</Menu.Item>
						</Menu>
					</Header>
					<div className="App">
						<Switch>
							<Route path="/Movie">
								<Detail  load={(e) => load(false)} />
							</Route>
							<Route path="/">
								<Movie load={(e) => load(e)} />
							</Route>
						</Switch>
					</div>
					<Footer style={{ textAlign: "center" }}>
						<p>
							Made by <a href="https://github.com/mfadel26">mfadel26</a>
						</p>
						<p>
							<a href="https://github.com/mfadel26/moviedb">
								<FontAwesome name="github" /> View code
							</a>
						</p>
					</Footer>
				</Router>
			</div>
		</>
	);
}
function Detail(props) {
	
	let match = useRouteMatch();
	return (
		<div>
			<Switch>
				<Route path={`${match.path}/:id/:ctgr`}>
					<MovieId load={() => props.load(false)} />
				</Route>
			</Switch>
		</div>
	);
}
