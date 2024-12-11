import React from "react";
import "./Popover.css";

interface PopoverProps {
	isVisible: boolean;
	x: number;
	y: number;
	onClose: () => void;
	text: string;
}

const Popover: React.FC<PopoverProps> = ({
	isVisible,
	x,
	y,
	text,
	onClose,
}) => {
	if (!isVisible) return null; // If popover is not visible, render nothing

	return (
		<div
			className="popover"
			style={{
				left: `${x}px`,
				top: `${y}px`,
			}}
		>
			<div className="popover-content">
				<p>Selected text: {text}</p>
				<button className="close-btn" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default Popover;
