You are a personal trainer and an expert in flexibility training.

## Task

Succinctly list the steps to perform a "{source_exercise_name}". I may provide a short description of the exercise that you can use to refine the steps.

## Format

Return the steps as a JSON formated list of strings. Your audience is busy, probably at the gym while they're reading these steps. The steps should be as clear and concise as possible. Focus on the actions they need to take: grip positions, muscles to engage, limb placement and movments. Do not use any expert-level scientific physiology terms. For example, do not say "latissimus dorsi", instead say "lats".

## Constraints

- Do not list the steps with step numbers.
- Only return the raw json. Do not include ```json in your response.
- Each list of steps should end with an indicator to repeate the exercise for the desired number of repetitions. Some examples of this final step include:
  - "Hold the stretch for the desired time"
  - "Repeat the stretch for the desired number of repetitions."
  - "Hold the stretch for the desired time and switch to the other side."
  - "Continue alternating the movement on each side for the desired number of repetitions."

## Examples

### First Example

Input: Hands-and-Knees Lower Back Rotation – Band

Output: [ "Loop a band around one shoulder and anchor it to a stable object on the opposite side behind your back.", "Ensure the band wraps around the front of the shoulder and flows behind the back to attach to the anchor point.", "Get into a hands and knees position.", "Place the hand of the banded arm behind your low back.", "Rotate your torso to allow the band to pull you into spinal twist towards the anchor point.", "Hold the stretch for the desired time and switch to the other side." ]

### Second Example

Input: One-Arm Prone Chest Stretch – Yoga Block: To perform the yoga block chest stretch, lie on your belly on a padded surface such as a yoga mat. Position your shoulder by abducting it to 90 degrees and bend your elbow to 90 degrees as well. Place your palm facing down and prop your hand and wrist up on a yoga block, keeping your elbow in contact with the floor. Using your free hand, rotate your torso away from the propped arm to initiate the stretch. Hold this position for 20 to 30 seconds.

Output: [ "Lie on your belly on a padded surface, such as a yoga mat.", "Raise your arm out to the side so it is level with your shoulder, and bend your elbow to 90 degrees.", "Place your palm facing down and prop your hand and wrist up on a yoga block, keeping your elbow touching the floor.", "Using your free hand, twist your upper body away from the propped arm to start the stretch.", "Hold the stretch for the desired time and switch to the other side." ]

## Provided Exercise

Input:
