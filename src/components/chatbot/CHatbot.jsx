import React from "react";

import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

function CHatbot() {
	return (
		<>
			<button
				className="btn fixed bottom-0 right-0"
				style={{
					position: "fixed",
					bottom: "20px",
					right: "20px",
					zIndex: 1000,
					width: "90px", // Adjust size as needed
					height: "60px", // Adjust size as needed
					border: "1px solid #ccc",
					backgroundColor: "#fff", // Ensure the background is visible
				}}
				onClick={() =>
					document.getElementById("my_modal_2").showModal()
				}
			>
				<img
					src="data:image/png;base64,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"
					alt=""
					className="w-full h-full"
				/>
			</button>
			<dialog
				id="my_modal_2"
				className="modal right-0 bottom-0"
			>
				<div className="modal-box">
					<div>
						<div className="flex justify-center items-center w-full">
							<Chatbot
								config={config}
								actionProvider={ActionProvider}
								messageParser={MessageParser}
							/>
						</div>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default CHatbot;

// function Chatbot() {
//     return (
//         <>
//             <button
//                 className="btn fixed bottom-0 right-0"
//                 style={{
//                     position: "fixed",
//                     bottom: "20px",
//                     right: "20px",
//                     zIndex: 1000,
//                     width: "30px", // Adjust size as needed
//                     height: "40px", // Adjust size as needed
//                     border: "1px solid #ccc",
//                     backgroundColor: "#fff", // Ensure the background is visible
//                 }}
//                 onClick={() => document.getElementById("my_modal_2").showModal()}
//             >
//                 open modal
//             </button>
//             <dialog id="my_modal_2" className="modal right-0 bottom-0">
//                 <div className="modal-box">
//                     <div style={{ maxWidth: "600px", margin: "0 auto", paddingTop: "20px" }}>

//                     </div>
//                 </div>
//                 <form method="dialog" className="modal-backdrop">
//                     <button>close</button>
//                 </form>
//             </dialog>
//         </>
//     );
// }

// export default Chatbot;
