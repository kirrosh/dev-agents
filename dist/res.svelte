
<script>
	import { onMount } from 'svelte';
	let todos = [
		{ text: 'Buy milk', done: false },
		{ text: 'Walk the dog', done: true },
		{ text: 'Clean the house', done: false }
	];

	function addTodo(text) {
		todos.push({ text, done: false });
	}

	function deleteTodo(index) {
		todos.splice(index, 1);
	}

	function toggleDone(index) {
		todos[index].done = !todos[index].done;
	}
</script>

<h1>Todo List</h1>

<form on:submit={addTodo}>
	<input type="text" bind:value={text} />
	<button type="submit">Create</button>
</form>

<ul>
	{#each todos as todo}
		<li>
			<input type="checkbox" bind:checked={todo.done} />
			{todo.text}
			<button on:click={() => deleteTodo(todos.indexOf(todo))}>Delete</button>
			<button on:click={() => toggleDone(todos.indexOf(todo))}>Mark as done</button>
		</li>
	{/each}
</ul>
