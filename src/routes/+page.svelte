<script>
	import { base } from '$app/paths';
	import { translateMuscleIdsToNames } from '$lib/services/ui';
	export let data;
	const muscleMap = data.muscles;
	let query = '';
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
<input bind:value={query} type="text" placeholder="Search exercises" />
{#if filteredExercises.length > 0}
	<table>
		<thead>
			<tr>
				<th>Exercise</th>
				<th>Primary Muscles</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredExercises as exercise}
				<tr>
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
	tbody tr:nth-child(even) {
		background-color: #f6f8fa;
	}
</style>
