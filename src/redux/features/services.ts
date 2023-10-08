import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Service } from "@/models/service.type";
// Define a type for the slice state
interface ServicesState {
  services: Service[];
}

// Define the initial state using that type
const initialState: ServicesState = {
  services: [],
};

export const serviceSlice = createSlice({
  name: "services",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.services = [...state.services, action.payload];
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateService: (state, action: PayloadAction<Service>) => {
      const serviceIndex = state.services.findIndex((service: Service) => {
        return service._id === action.payload._id;
      });
      if (serviceIndex < 0) {
        return;
      }
      state.services[serviceIndex] = action.payload;
    },
    deleteService: (state, action: PayloadAction<{serviceID: string}>) => {
      state.services = state.services.filter(
        (service) => service._id !== action.payload.serviceID
      );
    },
  },
});

export const { getServices, addService, updateService, deleteService } =
  serviceSlice.actions;
export default serviceSlice.reducer;
