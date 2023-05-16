export function translateMuscleIdsToNames(muscleIds: Array<number>, muscleMap) {
	const muscleNames = muscleIds.map((id) => muscleMap[id]);
	return muscleNames.sort();
}
