# Exercises

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

Staying fit and healthy is crucial for leading a happy and fulfilling life. However, with so many different exercise routines and workout plans, keeping track of exercises and learning new ones can be challenging.

That's why I wanted to introduce an open-source dataset of strength and cardio exercises. My goal is to provide a comprehensive resource that anyone can use to learn about different types of activities and create personalized workout plans that suit their fitness goals and lifestyles.

Whether you're a seasoned athlete or a complete beginner, this dataset has something for you. I collect information about a wide range of strength and cardio exercises, from classic moves like push-ups and squats to more advanced techniques like kettlebell swings and plyometric jumps. Accompanying each exercise is a detailed description of proper form and technique.

The best way to create a truly comprehensive dataset is to crowdsource contributions from fitness enthusiasts and experts worldwide. That's why I'd love for you to share your favorite exercises. By contributing to this dataset, you'll be helping others discover new and effective ways to stay fit and healthy. You'll also have the opportunity to connect with a global community of fitness enthusiasts passionate about sharing their knowledge and expertise.

PRs welcome! Together, we can help everyone achieve their fitness goals and live their best lives.

## Contributing

Please contribute with GitHub Pull Requests, for now. Eventually I'll have a web form where folks submit their exercises.

## Exercises

See [exercises.json](./exercises.json) for current data.

| Column | Description |
| --- | --- |
| name | What to call this exercise. |
| steps | Describes steps to perform the exercise. |
| notes | Lists tips and techniques to keep in mine while performing the exercise. _Note_: Stored as HTML |
| primaryMuscles | Main muscles under work. |
| secondaryMuscles | Supporting muscles under work. |

#### On Naming Exercises

Exercise names follow the following format:

```
<Variation - Optional> Exercise Name – <Equipment - Optional>
```

Let's go through some examples:

1. Shrugs

Using our naming convention, we can identify many shrug moves:

- Shrug – Barbell _-- These first three show different equipment for the same movement_
- Shrug – Dumbbell
- Shrug – Trap Bar
- Wide-Grip Shrug – Barbell _-- These final two show variations_
- Overhead Shrug – Barbell
