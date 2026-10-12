---
title: Controller design for a nanoflexture system
description: >-
  Designing a PID and feedforward controller to improve point to point positioning, mitigate resonance modes, and increase precision for semiconductor fabrication applications.

date: 2026-09-01
tags:
  - MATLAB
  - Simulink
  - PID
  - Feedforward
  - dSpace
image:
  path: /assets/projects/psdl/cover.jpg
  alt: Picture of nanoflexture system
---

<!-- markdownlint-disable MD001 -->

> UofM Precision Systems Design Lab, September 2026 – Present

A 2D nanoflexture positioning system opening up the possibility of nanometric
accuracy and resolution, ultra-fast point-to-point stepping times, and high payload capacity in semiconductor fabrication.

**My role:** Controller design and implementation

---

## System Modeling

The first step to designing a controller is to create as accurate of a model of the system (plant) as possible. This is crucial to ensuring that the controller can achieve the intended performance specifications.

<figure>
  <img src="/assets/projects/psdl/plant_model.png" " />
  <figcaption>Second order approximation of system</figcaption>
</figure>

- **Good fit for low frequencies**: Our model is a great fit for all frequencies under 100 Hz.
- **Ignoring benign mode**: The deviation from the 2 peaks seen at ~120 Hz is on purpose. That behavior stems from the columns that the system is mounted on, but we are specifically only interested in the behavior of the origin with respect to ground.

---

## Controller Design
- **Currently in progress!**
