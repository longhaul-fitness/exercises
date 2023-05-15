<script>
	import { base } from '$app/paths';
	export let data;
</script>

<h1>Long Haul Fitness Exercise Directory</h1>
<table>
	<thead>
		<tr>
			<td>Exercise</td>
			<td>Primary Muscles</td>
			<td>Secondary Muscles</td>
		</tr>
	</thead>
	<tbody>
		{#each data.exercises as exercise}
			<tr>
				<td><a href="{base}/exercises/{exercise.pk}">{exercise.fields.name}</a></td>
				<td>
					{exercise.fields.primary_muscles.map((muscleId) => data.muscles[muscleId]).join(', ')}
				</td>
				<td>
					{exercise.fields.secondary_muscles.map((muscleId) => data.muscles[muscleId]).join(', ')}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
