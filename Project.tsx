import React, { useState } from "react";
import styles from "./Project.module.less"; // Correct CSS module import

function Overlay({ show, onClose, children }) {
	if (!show) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div
				className={styles.overlayContent}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}

function Project() {
	const [showOverlay, setShowOverlay] = useState(false);

	return (
		<div className="Project">
			<h2>Overlay Example</h2>
			<button onClick={() => setShowOverlay(true)}>Show Overlay</button>

			<Overlay show={showOverlay} onClose={() => setShowOverlay(false)}>
				<h3>Overlay Content</h3>
				<p>This is the content inside the overlay.</p>
				<button onClick={() => setShowOverlay(false)}>Close</button>
			</Overlay>
		</div>
	);
}

export default Project;
