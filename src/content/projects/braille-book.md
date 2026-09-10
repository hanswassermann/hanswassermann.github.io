---
title: Braille Book
description: >-
  A low-cost electromechanical refreshable Braille display that translates
  English text into physical Braille using rotating octagonal prisms.
date: 2026-05-01
tags:
  - Embedded Programming
  - Arduino
  - Mechanical Design
  - CAD
  - Accessibility
image:
  path: /assets/projects/braille-book/demo.gif
  alt: The Braille Book prototype displaying two braille characters
---

<!-- markdownlint-disable MD001 -->

> Design & Development Project, January 2026 – May 2026.

A refreshable Braille reader built for under $40, aiming to make Braille literacy accessible where $1,500+ commercial devices aren't.

📄 [Read the final paper (PDF)](/assets/projects/braille-book/final-paper.pdf) · 💻 [View the code on GitHub](https://github.com/saketpab/Braille-E-book)

**My role:** everything — CAD/mechanical design and the Python-to-Arduino software pipeline (text-to-Braille translation, serial communication, motor control logic).

---

## Mechanical Encoding: Octagonal Prisms

Each Braille cell is displayed using two rotating octagonal prisms — one per 3-dot column — so all 64 Grade 1 Braille characters can be represented by 8 faces per prism.

<figure>
  <img src="/assets/projects/braille-book/prototype1-cad.png" />
  <figcaption>Prototype 1 CAD: direct motor shaft drive into the octagonal prism.</figcaption>
</figure>

<figure>
  <img src="/assets/projects/braille-book/prototype1-layout.png" />
  <figcaption>First 3D-printed prototype, assembled and wired for testing.</figcaption>
</figure>

- 3×2 dot grid decomposed into two 3-dot columns → 8 binary states each → one octagon face per state
- Iterated through direct-drive, bevel gear, and spur gear transmissions to minimize inter-cell spacing

---

## Prototype Iterations

<figure class="narrow">
  <img src="/assets/projects/braille-book/prototype2-cad.png" />
  <figcaption>Prototype 2: bevel gear transmission, reorienting the motor 90° to tighten cell spacing.</figcaption>
</figure>

<figure>
  <img src="/assets/projects/braille-book/prototype2-print.png" />
  <figcaption>3D-printed bevel gear housing and motor adapter.</figcaption>
</figure>

<figure class="narrow">
  <img src="/assets/projects/braille-book/prototype3-cad-top.png"/>
  <figcaption>Prototype 3 (final): spur gear transmission, top view.</figcaption>
</figure>

<figure class="narrow">
  <img src="/assets/projects/braille-book/prototype3-cad-side.png" />
  <figcaption>Prototype 3 (final): spur gear transmission, side view.</figcaption>
</figure>

---

## Electronics

Stepper motors drive each prism to its target face; a microcontroller computes the minimum rotation path.

<figure class="narrow">
  <img src="/assets/projects/braille-book/stepper-motor.png"/>
  <figcaption>28BYJ-48 stepper motor.</figcaption>
</figure>

<figure class="narrow">
  <img src="/assets/projects/braille-book/driver-board.png" />
  <figcaption>ULN2003 motor driver board.</figcaption>
</figure>

- Arduino Uno R3 drives 4 stepper motors simultaneously via ULN2003 driver boards
- `spinToFace()` picks the shorter rotation direction (forward vs. backward) to minimize step count per face change

---

## Software Pipeline

Text entered on the host computer (`input.py`) is converted to physical motor motion in a few steps:

1. **Translate** — the input word is sent to a self-hosted Flask REST API (`english2braille-api`) that returns Unicode Grade 1 Braille
2. **Decode** — each character's Unicode Braille is split into two 3-bit binary columns (`wheelObject.py`), then mapped to one of 8 motor face indices via lookup tables
3. **Transmit** — face indices are sent over serial (`arduinoScript.py`, pySerial) to the Arduino
4. **Actuate** — Arduino firmware (`braille_wheels.ino`) rotates each prism to its target face using the shortest path, and `reset.py` can zero all motors back to a home position

---

## Demo

<figure>
  <img src="/assets/projects/braille-book/demo.gif"/>
  <figcaption>Live demo: text-to-Braille rendering on the two-cell prototype.</figcaption>
</figure>

---

## Results

**$37** for the two-cell prototype, with a projected **$320** for a 20-cell device — roughly **80% cheaper** than comparable commercial displays (~$3,000).