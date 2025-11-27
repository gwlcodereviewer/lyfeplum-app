import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {IUserData} from '../../types/utils';

export interface UserState {
  userData: {
    id: number;
    profile_photo_url: string;
    cover_image: string;
    social_type: string;
  };
  isShowSessionExpireAlert: boolean;
}

const initialState: UserState = {
  userData: {
    id: 0,
    profile_photo_url: '',
    cover_image: '',
    social_type: '',
  },
  isShowSessionExpireAlert: false,
};

export const userSlice = createSlice({
  name: 'user state',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserData>) => {
      state.userData = action.payload;
    },
    setShowSessionExpireAlert: (state, action: PayloadAction<boolean>) => {
      state.isShowSessionExpireAlert = action.payload;
    },
  },
});

export const {setUserData, setShowSessionExpireAlert} = userSlice.actions;

export default userSlice.reducer;
