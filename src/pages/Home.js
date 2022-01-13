import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { Carousel, Image } from "antd";
import { getApiCall2 } from "../actions/fetching";
import { Card, Col, Row } from "antd";
const { Meta } = Card;
const { Header, Content, Footer } = Layout;

function Home() {
	const [data, setData] = useState([]);
	useEffect(() => {
		getData();
	}, []);

	const getData = (e) => {
		try {
			getApiCall2("movie/now_playing", {}).then((result) => {
				setData(result?.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Layout>
				{console.log(data)}
				<Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
					<div className="logo" />
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
						<Menu.Item key="1">nav 1</Menu.Item>
						<Menu.Item key="2">nav 2</Menu.Item>
						<Menu.Item key="3">nav 3</Menu.Item>
					</Menu>
				</Header>
				<Content className="site-layout" style={{ padding: "0 50px", marginTop: 64 }}>
					<Breadcrumb style={{ margin: "16px 0" }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ whiteSpace: "nowrap" }}>
						{data &&
							data.results &&
							data?.results.map((val, i) => {
								return (
									<div
										style={{
											whiteSpace: "nowrap",
											overflow: "auto",
											display: "inline-block",
										}}>
										<Card
											hoverable
											style={{ width: 240 }}
											cover={
												<Image
													width={200}
													src={"https://image.tmdb.org/t/p/w500/" + val.poster_path}
												/>
											}>
											<Meta title="Europe Street beat" description="www.instagram.com" />
										</Card>
									</div>
								);
							})}
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
			,
		</div>
	);
}

export default Home;
