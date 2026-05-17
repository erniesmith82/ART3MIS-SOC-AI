const API_BASE =
	import.meta.env.VITE_API_BASE_URL ||
	(typeof window === 'undefined'
		? 'http://backend:8000'
		: 'http://127.0.0.1:8000');

function getAuthHeaders() {
	const token = localStorage.getItem('token');

	if (!token) {
		return {
			'Content-Type': 'application/json'
		};
	}

	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	};
}


export async function register(username, password) {
	const response = await fetch(
		`${API_BASE}/api/auth/register`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		}
	);

	if (!response.ok) {
		const error = await response.json();

		throw new Error(
			error.detail || 'Registration failed.'
		);
	}

	return response.json();
}


export async function login(username, password) {
	const response = await fetch(
		`${API_BASE}/api/auth/login`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		}
	);

	if (!response.ok) {
		const error = await response.json();

		throw new Error(
			error.detail || 'Login failed.'
		);
	}

	return response.json();
}


export async function analyzeText(text) {
	const response = await fetch(
		`${API_BASE}/api/analyze/text`,
		{
			method: 'POST',
			headers: getAuthHeaders(),
			body: JSON.stringify({ text })
		}
	);

	if (!response.ok) {
		const error = await response.json();

		throw new Error(
			error.detail || 'Analysis failed.'
		);
	}

	return response.json();
}


export async function uploadLogFile(file) {
	const formData = new FormData();

	formData.append('file', file);

	const token = localStorage.getItem('token');

	const response = await fetch(
		`${API_BASE}/api/logs/upload`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData
		}
	);

	if (!response.ok) {
		const error = await response.json();

		throw new Error(
			error.detail || 'Upload failed.'
		);
	}

	return response.json();
}


export async function getReports() {
	const response = await fetch(
		`${API_BASE}/api/reports`,
		{
			headers: getAuthHeaders()
		}
	);

	if (!response.ok) {
		const error = await response.json();

		throw new Error(
			error.detail || 'Failed to load reports.'
		);
	}

	return response.json();
}


export async function getReport(reportId) {
	const response = await fetch(
		`${API_BASE}/api/reports/${reportId}`,
		{
			headers: getAuthHeaders()
		}
	);

	if (!response.ok) {
		const error = await response.json();

		throw new Error(
			error.detail || 'Failed to load report.'
		);
	}

	return response.json();
}


export async function deleteReport(reportId) {
	const response = await fetch(
		`${API_BASE}/api/reports/${reportId}`,
		{
			method: 'DELETE',
			headers: getAuthHeaders()
		}
	);

	if (!response.ok) {
		const error = await response.json();

		throw new Error(
			error.detail || 'Failed to delete report.'
		);
	}

	return response.json();
}


export async function deleteAllReports() {
	const response = await fetch(
		`${API_BASE}/api/reports`,
		{
			method: 'DELETE',
			headers: getAuthHeaders()
		}
	);

	if (!response.ok) {
		const error = await response.json();

		throw new Error(
			error.detail || 'Failed to delete all reports.'
		);
	}

	return response.json();
}


export async function getTopSourceIps() {
	const response = await fetch(
		`${API_BASE}/api/analytics/top-ips`,
		{
			headers: getAuthHeaders()
		}
	);

	if (!response.ok) {
		const error = await response.json();

		throw new Error(
			error.detail || 'Failed to load top source IPs.'
		);
	}

	return response.json();
}