import { useState, useEffect } from "react";

interface SelectedData {
	text: string;
	x: number;
	y: number;
}

export function useSelectedText() {
	const [selectedData, setSelectedData] = useState<SelectedData>({
		text: "",
		x: 0,
		y: 0,
	});

	useEffect(() => {
		let timer: number;

		const handleSelectionChange = () => {
			clearTimeout(timer);

			timer = setTimeout(() => {
				const selection = window.getSelection();

				if (selection && selection.toString().trim()) {
					const range = selection.getRangeAt(0);
					const rect = range.getBoundingClientRect();

					setSelectedData({
						text: selection.toString(),
						x: rect.left + window.scrollX,
						y: rect.top + window.scrollY,
					});
				} else {
					setSelectedData({ text: "", x: 0, y: 0 });
				}
			}, 1000);
		};

		document.addEventListener("selectionchange", handleSelectionChange);

		return () => {
			clearTimeout(timer);
			document.removeEventListener(
				"selectionchange",
				handleSelectionChange
			);
		};
	}, []);

	return selectedData;
}
