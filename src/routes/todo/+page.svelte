<script>
	let num1 = 0;
	let num2 = 0;
	let op = '+';

	function plus() {
		num1 += num2;
		num2 = 0;
	}

	function minus() {
		num1 -= num2;
		num2 = 0;
	}

	function multiply() {
		num1 *= num2;
		num2 = 0;
	}

	function divide() {
		if (num2 === 0) {
			throw new Error('Cannot divide by zero!');
		}
		num1 /= num2;
		num2 = 0;
	}

	function reset() {
		num1 = 0;
		num2 = 0;
	}
</script>

<main>
	<h1>Calculator</h1>

	<form>
		<label for="num1">Number 1:</label>
		<input type="number" id="num1" bind:value={num1} />

		<label for="num2">Number 2:</label>
		<input type="number" id="num2" bind:value={num2} />

		<!-- <select id="op">
			<option value="+">+</option>
			<option value="-">-</option>
			<option value="*">*</option>
			<option value="/">/</option>
		</select> -->

		<button on:click={plus}>+</button>
		<button on:click={minus}>-</button>
		<button on:click={multiply}>*</button>
		<button on:click={divide}>/</button>
		<button on:click={reset}>Reset</button>
	</form>

	<p id="result">{num1}</p>
</main>
