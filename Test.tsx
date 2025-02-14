import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface CollapsiblePanelProps {
	side: "left" | "right";
	width: string;
	children: React.ReactNode;
	panelTitle?: string;
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
	side,
	width,
	children,
	panelTitle = side === "left" ? "Left Panel" : "Right Panel",
}) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div
			className={`bg-light border-${
				side === "left" ? "end" : "start"
			} d-flex flex-column`}
			style={{
				width: isOpen ? width : "60px",
				minWidth: "60px",
				transition: "width 0.3s ease-in-out",
				height: "100vh",
				flexShrink: 0,
				overflow: "hidden",
			}}
		>
			<div className="d-flex p-2 align-items-center">
				{side === "right" && (
					<button
						className="btn btn-primary me-2"
						onClick={() => setIsOpen(!isOpen)}
						aria-label={`Toggle ${side} Panel`}
						aria-expanded={isOpen}
						aria-controls={`${side}Panel`}
					>
						{isOpen ? "►" : "◄"}
					</button>
				)}
				{isOpen && (
					<span className="fw-bold mx-auto">{panelTitle}</span>
				)}
				{side === "left" && (
					<button
						className="btn btn-primary ms-auto"
						onClick={() => setIsOpen(!isOpen)}
						aria-label={`Toggle ${side} Panel`}
						aria-expanded={isOpen}
						aria-controls={`${side}Panel`}
					>
						{isOpen ? "◄" : "►"}
					</button>
				)}
			</div>
			{isOpen && (
				<div
					id={`${side}Panel`}
					className="p-2"
					style={{
						flexGrow: 1,
						overflowY: "auto",
					}}
				>
					{children}
				</div>
			)}
		</div>
	);
};

const Layout: React.FC = () => {
	return (
		<div className="container-fluid vh-100 d-flex flex-column p-0">
			<div className="d-flex flex-grow-1">
				<CollapsiblePanel side="left" width="20vw">
					<h3>Left Panel</h3>
					<p>This is the left panel content.</p>
				</CollapsiblePanel>

				<div
					className="flex-grow-1 p-3 bg-white"
					style={{
						overflow: "auto",
						minWidth: 0,
					}}
				>
					<h2>Center Panel</h2>
					<p>This is the main content area.</p>
				</div>

				<CollapsiblePanel side="right" width="35vw">
					<h3>Right Panel</h3>
					<p>This is the right panel content.</p>
				</CollapsiblePanel>
			</div>
		</div>
	);
};

export default Layout;
