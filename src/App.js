import React from "react";
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import Movie from "./pages/Home";
import MovieId from "./pages/MovieId";
import {
	Layout,
	Menu,
	Image
} from "antd";
import "./App.css";
const { Header, Footer } = Layout;
export default function App() {
	return (
		<Router>
				<Header >
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
				<div className="App" >
					<Switch>
						<Route path="/Movie">
							<Detail />
						</Route>
						<Route path="/">
							<Movie />
						</Route>
					</Switch>
          </div>
				<Footer style={{ textAlign: "center" }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>      
		</Router>
	);
}
function Detail() {
	let match = useRouteMatch();
	return (
		<div>
			<Switch>
				<Route path={`${match.path}/:id/:ctgr`}>
					<MovieId />
				</Route>
			</Switch>
		</div>
	);
}
