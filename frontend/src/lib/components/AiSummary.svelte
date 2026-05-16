<script>
	export let text = '';

	function escapeHtml(value) {
		return value
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#039;');
	}

	function formatSummary(value) {
		if (!value) return '';

		let safe = escapeHtml(value);

		safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		safe = safe.replace(/\n{2,}/g, '</p><p>');
		safe = safe.replace(/\n/g, '<br />');

		return `<p>${safe}</p>`;
	}
</script>

<div class="ai-summary">
	{@html formatSummary(text)}
</div>

<style>
	.ai-summary :global(p) {
		margin-bottom: 1rem;
		line-height: 1.8;
	}

	.ai-summary :global(strong) {
		color: #6ee7b7;
		font-weight: 900;
	}

	.ai-summary :global(br) {
		display: block;
		margin-bottom: 0.5rem;
	}
</style>