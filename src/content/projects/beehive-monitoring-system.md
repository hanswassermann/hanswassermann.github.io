---
title: Beehive Monitoring System
description: >-
  An embedded sensing system that listens to a beehive,
  detects whether the queen is present, and answers questions about the hive in plain English.
date: 2026-05-01
tags:
  - Embedded Programming
  - ESP32
  - Machine Learning
  - Full-Stack
  - CAD
image:
  path: /assets/projects/beehive-monitoring-system/cover.png
  alt: The beehive monitoring system deployed in the field
---

<!-- markdownlint-disable MD001 -->

> Senior design project, September 2025 – May 2026.

A field-deployable system that reports on hive health without a beekeeper having to open the box.

📄 [Read the final paper (PDF)](/assets/projects/beehive-monitoring-system/final-paper.pdf)
💻 [View the code on GitHub](https://github.com/RBooj/HMS_microcontroller_code)

**My role:** embedded firmware, physical hardware/enclosure design, and the integration layer connecting our firmware to the backend.

---

## Embedded Sensing & Telemetry

A dual-ESP32 system: a battery-powered in-hive unit that wakes every 15 minutes to sample temperature, humidity, pressure, weight, and audio, then sends it over BLE to a bridge device, which relays it over WiFi to our backend and dashboard.

<figure>
  <img src="/assets/projects/beehive-monitoring-system/capstone_protoboard.jpg" alt="TODO: describe the embedded hardware design" />
  <figcaption>Soldered protoboard with detachable connectors to outside sensors and antenna.</figcaption>
</figure>

- **Sensors:** BME280 (temp/humidity/pressure), 4× load cells via HX711, MEMS microphone
- **Comms:** BLE (hive → bridge) → WiFi/HTTP (bridge → FastAPI backend)
- **Power:** duty-cycled sleep/wake cycle for long-term field deployment on a single battery

---

## Machine Learning: Queen Detection & LLM Chatbot

Two AI layers sit on top of the raw sensor data: an audio classifier that listens for the queen, and a chatbot that answers questions about the hive using live telemetry.

**Queen detection** — Fine-tuned a transformer-based Audio Spectrogram Transformer (AST) on the UrBAN beehive acoustics dataset, evaluated on entirely unseen hives.
- **81.5%** balanced accuracy
- **99.8%** precision — tuned to almost never false-positive

**Chatbot** — A quantized Qwen3-8B-AWQ model (via vLLM + AnythingLLM), connected to our backend through a custom **Model Context Protocol (MCP) server**, so answers are grounded in real sensor readings instead of guesses.

---

## Mechanical Design & Prototype

A custom CAD enclosure, 3D printed to house the electronics and survive the humid, hive environment with minimal disruption to the colony.

<figure class="narrow">
  <img src="/assets/projects/beehive-monitoring-system/capstone_cad.png" alt="TODO: describe the initial CAD design" />
  <figcaption>CAD enclosure with indents for protoboard, charging module, and battery chassis, with exterior ports for sensor and antenna wiring.</figcaption>
</figure>

<figure>
  <img src="/assets/projects/beehive-monitoring-system/capstone_full_design.jpg" alt="TODO: describe the final prototype" />
  <figcaption>Final assembled prototype without lid.</figcaption>
</figure>

**$46.64** per prototype unit, with a path to **$20–25** at production scale.

---

## Poster

<figure>
  <img src="/assets/projects/beehive-monitoring-system/poster.png" alt="TODO: describe the final poster" />
  <figcaption>Our senior capstone design showcase poster.</figcaption>
</figure>