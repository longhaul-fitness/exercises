<script>
	import { base } from '$app/paths';
	import { fade, fly } from 'svelte/transition';
	import { translateMuscleIdsToNames } from '$lib/services/ui';

	export let data;
	const muscleMap = data.muscles;
	let query = '';
	let timer;

	const debounce = (v) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			query = v;
		}, 200);
	};

	$: filteredExercises = data.exercises
		.filter((e) => {
			return e.fields.name.toLowerCase().match(query);
		})
		.sort((a, b) => {
			const nameA = a.fields.name.toUpperCase();
			const nameB = b.fields.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			// names must be equal
			return 0;
		});
</script>

<svelte:head>
	<title>Long Haul Fitness Exercise Directory</title>
	<meta name="description" content="Free and open source list of fitness exercises" />
</svelte:head>

<h1>Long Haul Fitness Exercise Directory</h1>
<input
	on:keyup={({ target: { value } }) => debounce(value)}
	type="text"
	placeholder="Search exercises"
/>
{#if filteredExercises.length > 0}
	<table>
		<colgroup>
			<col style:width="50%" />
			<col style:width="50%" />
		</colgroup>
		<thead>
			<tr>
				<th>Exercise</th>
				<th>Primary Muscles</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredExercises as exercise (exercise.pk)}
				<tr in:fade|local out:fly|local={{ x: 100, duration: 200 }}>
					<td><a href="{base}/exercises/{exercise.pk}">{exercise.fields.name}</a></td>
					<td>
						<ul>
							{#each translateMuscleIdsToNames(exercise.fields.primary_muscles, muscleMap) as muscle}
								<li>{muscle}</li>
							{/each}
						</ul>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>No exercises match query <strong>{query}</strong></p>
{/if}

<style>
	table {
		table-layout: fixed;
	}

	tbody tr:nth-child(even) {
		background-color: #f6f8fa;
	}
</style>
