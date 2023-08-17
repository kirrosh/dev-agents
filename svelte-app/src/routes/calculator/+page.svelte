
<script>
  let num1 = 0;
  let num2 = 0;
  let result = 0;

  function add() {
    result = num1 + num2;
  }

  function subtract() {
    result = num1 - num2;
  }

  function multiply() {
    result = num1 * num2;
  }

  function divide() {
    result = num1 / num2;
  }
</script>

<main>
  <h1>Calculator</h1>

  <div>
    <label for="num1">Number 1:</label>
    <input type="number" id="num1" bind:value={num1} />
  </div>

  <div>
    <label for="num2">Number 2:</label>
    <input type="number" id="num2" bind:value={num2} />
  </div>

  <div>
    <button on:click={add}>Add</button>
    <button on:click={subtract}>Subtract</button>
    <button on:click={multiply}>Multiply</button>
    <button on:click={divide}>Divide</button>
  </div>

  <div>
    <p>Result: {result}</p>
  </div>
</main>
