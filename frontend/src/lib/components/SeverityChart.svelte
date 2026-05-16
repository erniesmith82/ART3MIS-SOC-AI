<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let critical = 0;
	export let high = 0;
	export let medium = 0;
	export let low = 0;

	let canvas;

	onMount(() => {
		const chart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: ['Critical', 'High', 'Medium', 'Low'],
				datasets: [
					{
						data: [critical, high, medium, low],
						backgroundColor: [
							'#ef4444',
							'#f97316',
							'#eab308',
							'#10b981'
						],
						borderWidth: 0
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						labels: {
							color: '#cbd5e1',
							font: {
								size: 14,
								weight: 'bold'
							}
						}
					}
				}
			}
		});

		return () => {
			chart.destroy();
		};
	});
</script>

<div class="relative mx-auto max-w-md">
	<canvas bind:this={canvas}></canvas>
</div>