import React from "react";

const ProductIframe = () => {
	const iframeSrc =
		"https://vanveer.com/products/original-custom-3d?tdaState=eyJtdG01NmYiOiJmaTIyYyIsImkxYzA1IjoianhhZ3giLCI1eWp4aiI6InV2ZDF1IiwiY3A1bndzIjoibnVkM251IiwiODk3cHMiOiJ0MWZlcGUiLCJ5c2EwbWYiOiJjM2dsNXgiLCJnbmZ2aHYiOiI5cnluMmciLCIxdXg1aWoiOiJ0Y2dmMzUiLCJ3dHExeWMiOiJ4ZnpvbHEiLCJhNDRjY2giOiJyNGw4aGsiLCJwbmlsbGg1IjoibWVoNWgiLCJvdm03NWwiOiJkNzlxMG4iLCJseWI3aGgiOiJiY2UwdnUiLCJhcGJmcGEiOiJ4Z3YxMnIiLCJueWdxMnAiOiJnbWVxcWgiLCJpNmY1bGoiOiJ6ZmwxcGgiLCJiaHNiZm8iOiI0d3ZrYiIsInJpdWt0byI6IjNodTdvYiIsInNtYmpmZSI6InI0NmwybCIsIm96NGp4biI6ImVhMXJhZiIsInd0cTF5Yy1lbmdyYXZpbmctZW5qMTMtaGtiNW1lIjoiTG9yZW0gIiwid3RxMXljLWVuZ3JhdmluZy1lbmoxMy1mb250IjoiYXJpYWwiLCJ3dHExeWMtZW5ncmF2aW5nLWVuajEzLWNvbG9yIjoiI2NjY2NjYyJ9&tdaId=96872501";

	return (
		<div style={{ textAlign: "center", margin: "20px" }}>
			<h1>Vanveer Product Viewer</h1>
			<iframe
				src={iframeSrc}
				width="100%"
				height="600px"
				style={{ border: "none" }}
				title="Vanveer Product Viewer"
			></iframe>
		</div>
	);
};

export default ProductIframe;
