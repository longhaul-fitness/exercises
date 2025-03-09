# Exercises

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Welcome!

Staying fit and healthy is crucial for leading a happy and fulfilling life. However, with so many different exercise routines and workout plans, keeping track of exercises and learning new ones can be challenging.

That's why I wanted to introduce an open-source dataset of strength and cardio exercises. My goal is to provide a comprehensive resource that anyone can use to learn about different types of activities and create personalized workout plans that suit their fitness goals and lifestyles.

Whether you're a seasoned athlete or a complete beginner, this dataset has something for you. I collect information about a wide range of strength and cardio exercises, from classic moves like push-ups and squats to more advanced techniques like kettlebell swings and plyometric jumps. Accompanying each exercise is a detailed description of proper form and technique.

The best way to create a truly comprehensive dataset is to crowdsource contributions from fitness enthusiasts and experts worldwide. That's why I'd love for you to share your favorite exercises. By contributing to this dataset, you'll be helping others discover new and effective ways to stay fit and healthy. You'll also have the opportunity to connect with a global community of fitness enthusiasts passionate about sharing their knowledge and expertise.

PRs welcome! Together, we can help everyone achieve their fitness goals and live their best lives.

## Contributing

You have two options:

1. **GitHub Pull Request:** If you're familiar with GitHub and enjoy contributing directly, you're welcome to submit exercises as a Pull Request. First, visit our [GitHub repository](https://github.com/longhaul-fitness/exercises). There, you can fork the repository, add your exercise details, and submit a Pull Request.

2. **Submission Form on Our Website:** If you want to stay out of your editor, head over to the web form at [https://longhaul.fitness/exercises/submit/](https://longhaul.fitness/exercises/submit/). Here, you can easily input the details of your exercise. The form is designed to guide you through the necessary steps to ensure all relevant information is captured. Once submitted, I'll review the information and add your exercise to our directory.

## Exercises

### Strength Training

See [strength.json](./strength.json) for strength training exercises.

| Column | Description |
| --- | --- |
| pk | Numeric ID. Makes my life easier for database migrations. |
| name | What to call this exercise. |
| slug | Programatic way to refer to the exercise. Appears in URLs. |
| primaryMuscles | Main muscles under work. |
| secondaryMuscles | Supporting muscles under work. |
| steps | Describes steps to perform the exercise. |
| notes | Lists tips and techniques to keep in mine while performing the exercise. |

#### On Naming Exercises

Exercise names follow the following format:

```
<Variation - Optional> Exercise Name – <Equipment - Optional>
```

Let's go through some examples for the _Shrug_ exercise. Using our naming convention, we can identify many shrug moves:

1. Shrug – Barbell _-- These first three show different equipment for the same movement_
2. Shrug – Dumbbell
3. Shrug – Trap Bar
4. Wide-Grip Shrug – Barbell _-- These final two show variations_
5. Overhead Shrug – Barbell
