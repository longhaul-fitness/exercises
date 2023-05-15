<script>
	export let data;
</script>

<h1>Long Haul Fitness Exercise Directory</h1>
<ol>
	{#each data.exercises as exercise}
		<li>{exercise.fields.name}</li>
	{/each}
</ol>
