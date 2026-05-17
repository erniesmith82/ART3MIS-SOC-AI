import "./client.js";
//#region src/lib/api/client.js
var API_BASE = typeof window === "undefined" ? "http://backend:8000" : "http://127.0.0.1:8000";
function getAuthHeaders() {
	const token = localStorage.getItem("token");
	if (!token) return { "Content-Type": "application/json" };
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	};
}
async function getReports() {
	const response = await fetch(`${API_BASE}/api/reports`, { headers: getAuthHeaders() });
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.detail || "Failed to load reports.");
	}
	return response.json();
}
async function getReport(reportId) {
	const response = await fetch(`${API_BASE}/api/reports/${reportId}`, { headers: getAuthHeaders() });
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.detail || "Failed to load report.");
	}
	return response.json();
}
async function getTopSourceIps() {
	const response = await fetch(`${API_BASE}/api/analytics/top-ips`, { headers: getAuthHeaders() });
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.detail || "Failed to load top source IPs.");
	}
	return response.json();
}
//#endregion
export { getReports as n, getTopSourceIps as r, getReport as t };
