// !AUTH
interface IPost {
	caption: string;
	mediaUrl: string;
	mediaType: string;
}

interface IFormUser {
	id: number;
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
	photo: string;
}

// Определяем интерфейс для пользователя
interface IFormUser {
	id: number;
	name: string;
	email: string;
	// другие поля
}

// !AUTH SLICE
// Определяем тип для состояния среза
interface AuthState {
	user: IFormUser | null;
	isAuth: boolean;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null; // поле для хранения ошибок
}

// !MODALS & THEME
interface ThemeContextType {
	theme: string;
	switchTheme: () => void;
}

interface IFormResetPassword {
	token: string;
	newPassword: string;
	newPasswordConfirm: string;
}

interface ModalSidebarMenuProps {
	closeModal: () => void;
}
interface ModalFooterMenuProps {
	closeModalprofil: () => void;
}

interface SessionProviderProps {
	children: ReactNode;
}

// !TODO SLISE
// Определение типа для ответа API
type ApiResponse = {
	url: string;
};

// Определение типа для ошибки
type ApiError = {
	message: string;
};

interface TodosState {
	post: string | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
