import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterDto, RegisterResponseDto } from "./auth.dto";
import { register } from "./auth.api";

interface RegistrationState {
  registration: RegisterResponseDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  registration: null,
  loading: false,
  error: null,
};

export const fetchRegistration = createAsyncThunk<
  RegisterResponseDto,
  RegisterDto,
  { rejectValue: string }
>(
  'registration/fetchRegistration',
  async (data: RegisterDto, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка при регистрации');
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<RegisterResponseDto>) => {
        state.loading = false;
        state.registration = action.payload;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Ошибка';
      });
  },
});

export default registrationSlice.reducer;
