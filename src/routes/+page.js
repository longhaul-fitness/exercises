import exercises from '../../exercises.json';
import muscles from '../../muscles.json';

export function load() {
	let muscleMap = {};
	for (let i = 0; i < muscles.length; i++) {
		let muscle = muscles[i];
		muscleMap[parseInt(muscle.pk)] = muscle.fields.name;
	}
	return { exercises: exercises, muscles: muscleMap };
}
