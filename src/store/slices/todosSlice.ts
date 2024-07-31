import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../helpers/api';

// Начальное состояние
const initialState: TodosState = {
	post: null,
	status: 'idle'
};

// Асинхронный thunk с типизацией
export const getMyPost = createAsyncThunk<
	string,
	void,
	{ rejectValue: ApiError }
>('todos/getMyPost', async (_, { rejectWithValue }) => {
	try {
		const tokens = localStorage.getItem('tokens');
		if (!tokens) {
			throw new Error('Токен доступа не найден');
		}

		const { accessToken } = JSON.parse(tokens);

		const response = await api.get('post/get-my', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		return response.data;
	} catch (error) {
		return rejectWithValue({ message: (error as Error).message });
	}
});

export const uploadFile = createAsyncThunk<
	string,
	File,
	{ rejectValue: ApiError }
>('todos/uploadFile', async (file, { rejectWithValue }) => {
	try {
		const tokens = localStorage.getItem('tokens');
		if (!tokens) {
			throw new Error('Токен доступа не найден');
		}

		const formData = new FormData();
		formData.append('file', file);

		const response = await api.post<ApiResponse>('/upload/file', formData, {
			headers: {
				Authorization: `Bearer ${JSON.parse(tokens).accessToken}`
			}
		});

		return response.data.url;
	} catch (error) {
		return rejectWithValue({ message: (error as Error).message });
	}
});

// Срез
const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMyPost.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getMyPost.fulfilled, (state, action: PayloadAction<string>) => {
				state.status = 'succeeded';
				state.post = action.payload;
			})
			.addCase(getMyPost.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(uploadFile.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(uploadFile.fulfilled, (state, action: PayloadAction<string>) => {
				state.status = 'succeeded';
				// Обновляем URL фото пользователя после успешной загрузки
				state.post = action.payload;
			})
			.addCase(uploadFile.rejected, (state) => {
				state.status = 'failed';
			});
	}
});

export default todosSlice.reducer;
