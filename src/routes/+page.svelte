<script>
	let code = '';

	async function generate() {
		const response = await fetch('/api/svelte/component', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});

		code = await response.json();
		console.log(code);
	}
</script>

<div>
	<h1>Page</h1>
	<p>This is a page</p>
	<button on:click={generate}>Generate</button>
	<p>{code}</p>
</div>
