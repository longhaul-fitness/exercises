<script>
	export let data;
	const exercise = data.exercise.fields;
</script>

<h1>{exercise.name}</h1>
<div id="primaryMuscles">
	<ul>
		{#each exercise.primary_muscles.map((muscleId) => data.muscles[muscleId]) as muscle}
			<li>{muscle}</li>
		{/each}
	</ul>
</div>
<div id="secondaryMuscles">
	<ul>
		{#each exercise.secondary_muscles.map((muscleId) => data.muscles[muscleId]) as muscle}
			<li>{muscle}</li>
		{/each}
	</ul>
</div>
<div id="secondaryMuscles">
	{@html exercise.steps}
</div>
