---
title: AR Mural
description: >-
  A collaborative drawing/sculpting platform in augmented reality built with Unity using a Microsoft Hololens.

date: 2025-08-01
tags:
  - Unity
  - MQTT
  - C#
  - AR/VR
  - Visual Studio
image:
  path: /assets/projects/ar-mural/cover.gif
  alt: AR Mural in action
---

<!-- markdownlint-disable MD001 -->

> Summer Research Project, May 2025 – August 2025.

A legacy AR drawing platform where users can virtually draw together in shared worlds.

**My role:** Multiplayer functionality, avatar logic, design, and animation.

---

## QR Code Initialization

QR code initialization was central to making AR Mural a truly collaborative, persistent artwork. By scanning three fixed QR codes, the app established a shared spatial anchor in Unity, ensuring that every user's device aligned to the same real-world coordinate system rather than starting from scratch.

<figure>
  <img src="/assets/projects/ar-mural/qr-code.png" " />
  <figcaption>Drawing illustrating how QR codes help spatialize the virtual reality world.</figcaption>
</figure>

- **Consistent placement**: Drawings appeared in the same physical location for all users, turning individual contributions into a unified mural.
- **Persistent loading**: Existing drawing objects loaded automatically after calibration, so the artwork accumulated over time instead of resetting each session.
- **Improved accuracy**: Using three QR codes (instead of one) reduced drift and kept alignment stable across a larger physical space.

---

## Avatar Creation

To make the collaboration feel more embodied, we implemented real-time avatar spawning using the MQTT protocol. Once a user's HoloLens completed QR calibration, its live position data was published over MQTT and used to render a corresponding avatar on every other connected user's headset, letting people see exactly where their collaborators were standing in the shared space.

<figure>
  <img src="/assets/projects/ar-mural/avatars.png" " />
  <figcaption>2 avatars spawned in Unity simulation.</figcaption>
</figure>

- **Real-time position sync**: HoloLens headsets continuously published their coordinates via MQTT, keeping avatar positions updated across all connected devices with minimal latency.
**Embodied presence**: Seeing avatars representing other users' physical locations made the collaborative drawing experience feel more social and spatially grounded, rather than isolated.

---

## Avatar Animation

My group and I spent a lot of time working on different ways to humanize these avatars since the static avatar figure didn't closely resemble another user's movements.

- **Hand Tracking**: We were looking to recreate hand data so users could more accurately see how other users hands were moving when they were drawing, rather than their drawings just immediately spawning in.
<figure class="narrow">
  <img src="/assets/projects/ar-mural/hand_animation.gif"  />
  <figcaption>POV view of hand tracking working. Note the offset between my hands and the recreated hands is because the camera is in a different position than my eyes.</figcaption>
</figure>



- **Walking Animation**: We also wanted to animate movement from the avatar so it looked more natural, rather than the avatar staticly sliding around the world.
<figure>
  <img src="/assets/projects/ar-mural/body_animation.gif"  />
  <figcaption>Rigged the avatar so it can walk. Hand was rigged with inverse kinematics so hand tracking data could be combined with it.</figcaption>
</figure>

- **Pose Detection**: We also researched using a depth camera combined with YOLO pose detection to estimate key body points and recreate user movement in Unity.

<figure>
  <img src="/assets/projects/ar-mural/depth-camera.png"  />
  <figcaption>Depth camera that can estimate how far things are from the camera despite only having a 2D image input.</figcaption>
</figure>


---

## Poster

<figure>
  <img src="/assets/projects/ar-mural/poster.jpg" alt="Final poster" />
  <figcaption>Final Poster</figcaption>
</figure>