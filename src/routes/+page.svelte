<script>
	import { base } from '$app/paths';
	import { fade, fly } from 'svelte/transition';
	import { translateMuscleIdsToNames } from '$lib/services/ui';

	export let data;
	const muscleMap = data.muscles;
	let query = '';
	let muscleFilters = [];

	const handleClickClear = () => {
		query = '';
		muscleFilters = [];
	};

	$: filteredExercises = data.exercises
		.filter((e) => {
			return e.fields.name.toLowerCase().match(query.toLowerCase());
		})
		.filter((e) => {
			if (muscleFilters.length === 0) return true;
			const intersection = e.fields.primary_muscles.filter((value) =>
				muscleFilters.includes(value.toString())
			);
			return intersection.length > 0;
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
<div class="u-grid grid-def">
	<div class="exercise-list">
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
	</div>
	<div class="exercise-filters">
		<input bind:value={query} type="text" placeholder="Search exercises" />
		<button on:click={handleClickClear}>Clear Search</button>
		{#each Object.entries(muscleMap) as [id, name]}
			<label>
				<input type="checkbox" bind:group={muscleFilters} name="muscleFilters" value={id} />
				{name}
			</label>
		{/each}
	</div>
</div>

<style>
	.grid-def {
		grid-template-areas:
			'filters'
			'list';
	}
	@media (min-width: 601px) {
		.grid-def {
			grid-template-areas: 'list filters';
			grid-template-columns: 3fr 1fr;
		}
	}
	.exercise-list {
		grid-area: list;
	}
	table {
		table-layout: fixed;
	}

	tbody tr:nth-child(even) {
		background-color: #ffeddc;
	}
	.exercise-filters {
		grid-area: filters;
	}
	.exercise-filters label {
		display: block;
	}
</style>
