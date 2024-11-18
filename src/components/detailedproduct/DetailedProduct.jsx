import React from "react";
import { useParams } from "react-router-dom";

function DetailedProduct() {
	let { id } = useParams();
	return <div>DetailedProduct {id}</div>;
}

export default DetailedProduct;
