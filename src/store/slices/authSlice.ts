import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../helpers/api';

// Начальное состояние
const initialState: AuthState = {
	user: null,
	isAuth: false,
	status: 'idle',
	error: null
};

//! Thunk для регистрации пользователя
export const registerUser = createAsyncThunk<
	void,
	{ email: string; password: string; username: string; photo: string },
	{ rejectValue: string }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
	try {
		const response = await api.post('/auth/sign-up', userData);
		localStorage.setItem('tokens', JSON.stringify(response.data));
		return response.data;
	} catch (error) {
		return rejectWithValue((error as Error).message || 'Ошибка регистрации');
	}
});

//! Thunk для получения данных пользователя
export const fetchUserData = createAsyncThunk<
	IFormUser,
	void,
	{ rejectValue: string }
>('auth/fetchUserData', async (_, { rejectWithValue }) => {
	try {
		const tokens = localStorage.getItem('tokens');
		if (!tokens) {
			return rejectWithValue('Токен доступа не найден');
		}

		const { accessToken } = JSON.parse(tokens);

		const response = await api.get('/auth/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		return response.data.profile;
	} catch (error) {
		return rejectWithValue((error as Error).message || 'Произошла ошибка');
	}
});

//! Thunk для сброса пароля
export const resetPassword = createAsyncThunk<
	string,
	{ token: string | null; newPassword: string },
	{ rejectValue: string }
>('auth/resetPassword', async ({ token, newPassword }, { rejectWithValue }) => {
	try {
		if (!token) {
			return rejectWithValue('Токен не найден');
		}

		const response = await api.patch('/auth/reset-password', {
			token,
			newPassword
		});

		return response.data.message;
	} catch (error) {
		return rejectWithValue(
			(error as Error).message || 'Не удалось сбросить пароль'
		);
	}
});

// !  Thunk для logout
export const logoutUser = createAsyncThunk('logout', async () => {
	const { accessToken } = JSON.parse(localStorage.getItem('tokens')!);
	await api.post(
		'/auth/logout',
		{},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);
	localStorage.removeItem('tokens');
});

//!!----------------------------<<<     Срез       >>>--------------------------------------------
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = null;
			state.isAuth = false;
			state.error = null;
			localStorage.removeItem('tokens');
		}
	},
	extraReducers: (builder) => {
		builder
			//? Обработка для регистрации пользователя
			.addCase(registerUser.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.status = 'succeeded';
				state.isAuth = true;
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.isAuth = false;
				state.error = action.payload || 'Ошибка регистрации';
			})

			//? Обработка получения данных пользователя
			.addCase(fetchUserData.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(
				fetchUserData.fulfilled,
				(state, action: PayloadAction<IFormUser>) => {
					state.status = 'succeeded';
					state.user = action.payload;
					state.isAuth = true;
					state.error = null;
				}
			)
			.addCase(fetchUserData.rejected, (state, action) => {
				state.status = 'failed';
				state.isAuth = false;
				state.error =
					action.payload || 'Произошла ошибка при загрузке данных пользователя';
			})

			//? Обработка сброса пароля
			.addCase(resetPassword.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.status = 'succeeded';
				state.error = null;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'Не удалось сбросить пароль';
			});
	}
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
