import exercises from '../../../../exercises.json';
import muscles from '../../../../muscles.json';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const exercise = exercises.filter((e) => e.pk === parseInt(params.id));
	// TODO: Check for empty array
	let muscleMap = {};
	for (let i = 0; i < muscles.length; i++) {
		let muscle = muscles[i];
		muscleMap[parseInt(muscle.pk)] = muscle.fields.name;
	}
	return { exercise: exercise[0], muscles: muscleMap };
}
