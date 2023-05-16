export function translateMuscleIdsToNames(muscleIds, muscleMap) {
	const muscleNames = muscleIds.map((id) => muscleMap[id]);
	return muscleNames.sort();
}
