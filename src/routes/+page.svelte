<script>
	import { base } from '$app/paths';
	import { translateMuscleIdsToNames } from '$lib/services/ui';
	export let data;
	$: muscleMap = data.muscles;
</script>

<h1>Long Haul Fitness Exercise Directory</h1>
<table>
	<thead>
		<tr>
			<th>Exercise</th>
			<th>Primary Muscles</th>
		</tr>
	</thead>
	<tbody>
		{#each data.exercises as exercise}
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

<style>
	tbody tr:nth-child(even) {
		background-color: #f6f8fa;
	}
</style>
