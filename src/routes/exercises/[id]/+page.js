import exercises from '../../../../exercises.json';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const exercise = exercises.filter(e => e.pk === parseInt(params.id));
  // TODO: Check for empty array
  return { exercise: exercise[0] };
}

