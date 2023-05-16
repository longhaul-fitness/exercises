<script>
	import { base } from '$app/paths';
	import { translateMuscleIdsToNames } from '$lib/services/ui';
	export let data;
	const exercise = data.exercise.fields;
	$: muscleMap = data.muscles;
</script>

<svelte:head>
	<title>{exercise.name} - Long Haul Fitness Exercise Directory</title>
	<meta
		name="description"
		content="Describes the steps and benefits of the '{exercise.name}' exercise"
	/>
</svelte:head>
<h1>{exercise.name}</h1>
<a href="{base}/">←Back to Exercise Directory</a>
<div id="primaryMuscles">
	<h2>Primary Muscles</h2>
	<ul>
		{#each translateMuscleIdsToNames(exercise.primary_muscles, muscleMap) as muscle}
			<li>{muscle}</li>
		{/each}
	</ul>
</div>
<div id="secondaryMuscles">
	<h2>Secondary Muscles</h2>
	<ul>
		{#each translateMuscleIdsToNames(exercise.secondary_muscles, muscleMap) as muscle}
			<li>{muscle}</li>
		{/each}
	</ul>
</div>
<div id="steps">
	<h2>Steps</h2>
	{@html exercise.steps}
</div>
