import React from "react";

function Chatbot() {
	return (
		<>
			<button
				className="btn fixed bottom-0 right-0"
				style={{
					position: "fixed",
					bottom: "20px",
					right: "20px",
					zIndex: 1000,
					width: "30px", // Adjust size as needed
					height: "40px", // Adjust size as needed
					border: "1px solid #ccc",
					backgroundColor: "#fff", // Ensure the background is visible
				}}
				onClick={() =>
					document.getElementById("my_modal_2").showModal()
				}
			>
				open modal
			</button>
			<dialog
				id="my_modal_2"
				className="modal right-0 bottom-0"
			>
				<div className="modal-box">
					<div>Chatbot</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default Chatbot;
