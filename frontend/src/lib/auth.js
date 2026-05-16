import { goto } from '$app/navigation';

export function isLoggedIn() {
	if (typeof localStorage === 'undefined') {
		return false;
	}

	return Boolean(localStorage.getItem('token'));
}

export function getUsername() {
	if (typeof localStorage === 'undefined') {
		return '';
	}

	return localStorage.getItem('username') || '';
}

export function requireAuth() {
	if (!isLoggedIn()) {
		goto('/login');
	}
}

export function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('username');
	goto('/login');
}