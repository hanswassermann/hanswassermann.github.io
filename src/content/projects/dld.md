---
title: Traffic Signal State Machine
description: >-
  A demand-driven traffic signal controller built entirely from discrete
  logic gates and flip-flops, designed as a Mealy finite state machine and
  wired up on a breadboard.
date: 2024-04-30
tags:
  - Digital Logic Design
  - Finite State Machines
  - Circuit Design
  - Combinational & Sequential Logic
image:
  path: /assets/projects/dld/implementation.png
  alt: The final breadboard implementation of the traffic signal controller
---

<!-- markdownlint-disable MD001 -->

> Digital Logic Design Lab, Rutgers University — Spring 2024 (freshman year).

A traffic signal controller for a demand-driven pedestrian crossing, designed from scratch as a finite state machine and built entirely out of logic gates, flip-flops, and a 555 timer clock — **no microcontroller involved**.

**My role:** state diagram design, truth table derivation and Boolean minimization, and full breadboard implementation of the resulting sequential circuit.

---

## The Problem

The controller sits at an intersection between a high-traffic main road and a low-traffic cross road. By default, the main road stays green and the cross road stays red. When a pedestrian presses the "Walk" button, the system has to step through a fixed lighting sequence and then return to default:

1. Main road goes Amber for 4 seconds
2. Main road goes Red, Cross road goes Green for 8 seconds
3. Cross road goes Amber for 4 seconds
4. Back to default: Main road Green, Cross road Red

This is a classic finite state machine problem — 5 discrete states, one input (the pedestrian button), and six light outputs (red/amber/green for each road).

---

## State Diagram & Encoding

<figure>
  <img src="/assets/projects/dld/schematic.png" alt="TODO: logic gate schematic for the state machine" />
  <figcaption>Final combinational + sequential logic schematic: 3 D flip-flops driving the state, with gate networks generating the 6 light outputs.</figcaption>
</figure>

- 5 states → encoded with 3 D flip-flops (A, B, C), since 3 bits comfortably covers 5 states with room for "don't care" transitions
- Each output bit corresponds to one light (main/cross × red/amber/green), all active-low, so every state has exactly two bits pulled low — the two lights actually on
- One pedestrian-button input (X) determines whether the machine advances out of the default state or holds

---

## From Truth Tables to Gates

- Built a full next-state and output truth table (16 rows: 3 state bits × 1 input bit), with unused state combinations treated as "don't cares" that fall back to the default state
- Derived 9 separate Boolean equations — one for each flip-flop's D input (D_A, D_B, D_C) and one for each of the 6 light outputs (b0–b5) — by minimizing each truth table
- Example derived equations:
  - `D_A = A'BC`
  - `D_B = A'B'C + A'BC'`
  - `D_C = A'C'X + A'BC'`
  - `b0 = A + B'`

---

## Clocking & Timing

Since each state needed to persist for either 4 or 8 seconds, the design needed its own clock rather than relying on a microcontroller's timer:

- Built a 555 timer astable circuit to generate a 1-cycle-per-4-seconds square wave, with resistor/capacitor values worked out using an online 555 clock calculator
- Verified the clock signal on an oscilloscope before integrating it with the rest of the circuit

---

## Implementation

<figure>
  <img src="/assets/projects/dld/implementation.png" alt="TODO: breadboard implementation showing all wiring" />
  <figcaption>Final breadboard build: 3 D flip-flops, combinational logic gates for the 6 light outputs, and the 555 timer clock source.</figcaption>
</figure>

- Built and tested the circuit in stages — state machine flip-flops first, then the combinational output logic, then the clock — to make troubleshooting manageable
- Used a small mix of AND, NAND, OR, NOR, XOR, and NOT gates (including 3- and 4-input variants) to implement the minimized equations
- Caught and fixed a missing term in the original `b1` equation (needed an extra `A'B'C` term) after the built circuit lit a light that shouldn't have turned on — traced it back through the truth table and gate-level connections

---

## Reliability Consideration

One question the lab pushed us to think through: what happens if power briefly drops mid-sequence? Since the state was held in flip-flops (volatile memory), a power blip would reset the machine straight back to default — potentially skipping the amber warning phase for traffic already in the intersection. A more robust version of this design would need non-volatile state storage (e.g. a PLD) so the controller can resume from where it left off instead of resetting blind.