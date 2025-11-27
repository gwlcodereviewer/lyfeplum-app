import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface SubscriptionState {
  subscriptionStatus: string;
  familyPlanStatus: string;
  isFamilyAdmin?: boolean;
  maxUsersAllowed?: number;
  isUpdateSubscription: boolean;
}

const initialState: SubscriptionState = {
  subscriptionStatus: '',
  familyPlanStatus: '',
  isFamilyAdmin: false,
  maxUsersAllowed: 0,
  isUpdateSubscription: false,
};

export const subscriptionSlice = createSlice({
  name: 'subscription state',
  initialState,
  reducers: {
    setSubscriptionStatus: (state, action: PayloadAction<string>) => {
      // TODO: Use the below for dev
      // state.subscriptionStatus = 'Active';
      // TODO: Use the below for prod
      state.subscriptionStatus = action.payload;
    },
    setFamilyPlanStatus: (state, action: PayloadAction<string>) => {
      state.familyPlanStatus = action.payload;
    },
    setFamilyAdminStatus: (state, action: PayloadAction<boolean>) => {
      state.isFamilyAdmin = action.payload;
    },
    setMaxUsers: (state, action: PayloadAction<number>) => {
      state.maxUsersAllowed = action.payload;
    },
    setIsUpdateSubscription: (state, action: PayloadAction<boolean>) => {
      state.isUpdateSubscription = action.payload;
    },
  },
});

export const {
  setSubscriptionStatus,
  setFamilyAdminStatus,
  setFamilyPlanStatus,
  setMaxUsers,
  setIsUpdateSubscription,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
