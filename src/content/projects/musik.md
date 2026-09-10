---
title: MUSIK 2.0 — AR Piano Learning System
description: >-
  An augmented reality system that teaches piano through real-time visual
  note cues — a 3D-printed AR headset, Arduino/Bluetooth firmware for live
  MIDI accuracy scoring, and a Unity-based AR visualizer.
date: 2025-05-01
math: false
tags:
  - Augmented Reality
  - Embedded Systems
  - Arduino
  - Unity
  - C/C++
  - Python
  - Product Design
image:
  path: /assets/projects/musik/playing.gif
  alt: MUSIK 2.0 AR headset overlaying falling note tiles on a piano keyboard
---

<!-- markdownlint-disable MD001 -->

> Design & Development, September 2024 – May 2025.

MUSIK 2.0 is an augmented reality system that teaches people to play piano without reading sheet music. A MIDI file is converted into falling "note tiles" that a user views through a custom 3D-printed AR headset, aligned directly over their physical keyboard — while an Arduino compares the notes they actually play against the song in real time and scores their accuracy.

📄 [Read the final report (PDF)](/assets/projects/musik/final-paper.pdf)
💻 [View the code on GitHub](https://github.com/dlin07/MusikGroup4)

**My role:** Arduino/Bluetooth firmware for communication between the Python accuracy engine, Arduino, and Unity app, and design of the note-timing accuracy algorithm (early/perfect/late/miss classification).

---

## System Overview

MUSIK 2.0 has two halves that run in parallel and stay synchronized over Bluetooth: a **digital pipeline** (Python accuracy engine + Arduino + Unity visualizer) and a **physical pipeline** (MIDI keyboard + headset). A MIDI cable carries the keyboard's note data into the Arduino, which relays it to a Python script for accuracy scoring, while the Unity app — running on a phone inside the headset — displays the song and receives live feedback back through the Arduino.

<figure>
  <img src="/assets/projects/musik/component-flowchart.png" alt="Flowchart showing how the headset, Arduino, Python accuracy engine, and Unity visualizer communicate" />
  <figcaption>How the physical and digital components connect: MIDI keyboard → Arduino → Python (accuracy) → Bluetooth → Unity (AR display).</figcaption>
</figure>

---

## Arduino & Bluetooth Communication

I built the firmware that lets the Arduino act as a proxy between the Python accuracy engine (running on a laptop, reading MIDI input from the keyboard over USB) and the Unity app (running on the phone inside the headset). An HC-05 Bluetooth module handles the Arduino ↔ Unity link, while a serial connection handles Arduino ↔ Python.

The Arduino continuously checks both channels for incoming data and forwards it to the other side:

```cpp
SoftwareSerial BT(10, 11); // RX, TX

// Python -> Arduino -> Unity
if (Serial.available() > 0) {
  String data = Serial.readStringUntil('\n');
  BT.println(data);
}

// Unity -> Arduino -> Python
if (BT.available() > 0) {
  String data = BT.readStringUntil('\n');
  Serial.println(data);
}
```

This let Unity send a "start" message to kick off a global timer, receive live timing feedback strings ("early," "perfect," "late," "miss") throughout gameplay, and receive a final accuracy score once the song ended.

---

## Accuracy Algorithm

The core scoring algorithm compares the timestamps of the notes a user actually plays against a reference MIDI file, using a tunable threshold to account for natural timing variance.

**1. Reference conversion.** A helper script (`midi2Tiles.py`) converts the sample MIDI file into a flat list of `[event type, note number, time, channel]` entries using the `mido` library, giving a ground-truth timeline for the song.

**2. Live input capture.** `pygame` polls the keyboard's MIDI port in a background thread. Each event is bit-masked to separate note-on/off status from channel data (`event_type & 0xF0 == 0x90`), and a `velocity > 0` check disambiguates true "note on" messages from "note off" messages sent as zero-velocity note-on events.

**3. Timing classification.** The main thread walks through the reference timeline and compares it against the user's queued key presses, classifying each attempt against the expected time `t`:

| Result | Relative allowable time |
|---|---|
| Early, don't advance | t < −1.5s |
| Early | −1.5s ≤ t < −0.2s |
| Perfect | −0.2s ≤ t ≤ 0.2s |
| Late | 0.2s < t ≤ 1.5s |
| Late, skip | t > 1.5s |

Getting these thresholds right took real tuning: too tight, and the game penalizes normal human timing variance; too loose, and it can't tell a good performance from a sloppy one. A ±0.2s "perfect" window with wider ±1.5s bounds for advancing past a missed note worked well for the songs we tested, though faster songs (like a chromatic scale with 0.6s note spacing) would need tighter thresholds.

---

## AR Visualizer & Headset

While my focus was firmware and the accuracy algorithm, the AR experience these systems drove was built by teammates using Unity, Vuforia, and Google Cardboard — parsing the MIDI file into falling note tiles (color-coded for naturals vs. sharps) and rendering them in stereoscopic 3D through a custom headset.

<figure>
  <img src="/assets/projects/musik/demo.gif" alt="Stereoscopic split-screen view of falling note tiles as seen through the AR headset" />
  <figcaption>Stereoscopic view from inside the headset spawning the virtual screen.</figcaption>
</figure>

<figure>
  <img src="/assets/projects/musik/game-screen.png" alt="Unity game screen showing falling note tiles above a piano keyboard with live hit/miss feedback" />
  <figcaption>The Unity game screen mid-song, showing falling note tiles and live accuracy feedback.</figcaption>
</figure>

The headset itself was a 4-part 3D-printed design (base, facial interface, top cover, strap mounts) modeled in SolidWorks and inspired by Google Cardboard, with biconvex lenses positioned to match the phone's focal distance.

<figure>
  <img src="/assets/projects/musik/custom-headset.png" alt="Assembled 3D-printed AR headset with lenses and head strap" />
  <figcaption>The fully assembled, 3D-printed headset — PLA construction with a head strap for hands-free wear.</figcaption>
</figure>

---

## Results

The final prototype reliably displayed a song's notes as falling tiles, tracked a user's playing against the reference MIDI file, and returned a live accuracy score at the end of each song — all through a self-contained headset and keyboard setup, with no projector or external display required (unlike the MUSIK 1.0 design it replaced). Future work identified in our final report includes moving all accuracy computation onto the Arduino to remove the laptop middleman, and expanding the algorithm to factor in note *release* timing, not just note-on timing.