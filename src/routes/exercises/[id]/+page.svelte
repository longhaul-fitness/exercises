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
{#if exercise.secondary_muscles.length > 0}
	<div id="secondaryMuscles">
		<h2>Secondary Muscles</h2>
		<ul>
			{#each translateMuscleIdsToNames(exercise.secondary_muscles, muscleMap) as muscle}
				<li>{muscle}</li>
			{/each}
		</ul>
	</div>
{/if}
{#if exercise.steps !== ''}
	<div id="steps">
		<h2>Steps</h2>
		{@html exercise.steps}<!-- eslint-disable-line svelte/no-at-html-tags -->
	</div>
{/if}
{#if exercise.notes !== ''}
	<div id="notes">
		<h2>Notes</h2>
		{@html exercise.notes}<!-- eslint-disable-line svelte/no-at-html-tags -->
	</div>
{/if}
