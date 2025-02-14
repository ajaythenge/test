// sectionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Section, SectionState } from "./types";

interface MovePayload {
  newData: any;
  direction: "next" | "previous" | "index";
  index?: number; // Required if direction is "index"
}

const initialState: SectionState = {
  sections: [],
  activeSectionId: null,
};

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    // Add a section
    addSection: (state, action: PayloadAction<Section>) => {
      state.sections.push({ ...action.payload, updatedData: action.payload.data });
    },

    // **Save and move section dynamically**
    saveAndMoveSection: (state, action: PayloadAction<MovePayload>) => {
      const currentIndex = state.sections.findIndex(
        (s) => s.id === state.activeSectionId
      );
      if (currentIndex === -1) return;

      // Save current section's updated data
      state.sections[currentIndex].updatedData = action.payload.newData;

      let newIndex = currentIndex;

      // Determine new index based on direction
      if (action.payload.direction === "next" && currentIndex < state.sections.length - 1) {
        newIndex = currentIndex + 1;
      } else if (action.payload.direction === "previous" && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (action.payload.direction === "index" && action.payload.index !== undefined) {
        if (action.payload.index >= 0 && action.payload.index < state.sections.length) {
          newIndex = action.payload.index;
        }
      }

      // Set new active section
      state.activeSectionId = state.sections[newIndex].id;
    },
  },
});

export const {
  addSection,
  saveAndMoveSection,
} = sectionSlice.actions;

export default sectionSlice.reducer;
