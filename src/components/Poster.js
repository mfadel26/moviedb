import React from "react";
import PropTypes from "prop-types";
import "./Poster.css";
import {
	Progress,
	Badge,
} from "antd";
const Poster = ({ img, title, count}) => {
	return (
			<img
				className="poster"
				src={img ? `http://image.tmdb.org/t/p/w1280${img}` : null}
				alt={`poster of ${title}`}
			/>
	);
};

export default Poster;

Poster.propTypes = {
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
};
