---
title: "Control System Design for a Neuron Model"
description: "Stability analysis and full-state feedback control of the nonlinear Hindmarsh-Rose neuron model, validated in MATLAB/Simulink."
date: 2025-12-01
tags: [Controls, MATLAB, Simulink, State-Space, Nyquist, Root Locus, Full-State Feedback]
image:
  path: /assets/projects/neuron-model-control-system/controller.png
  alt: Hindmarsh-Rose neuron model spiking and bursting behavior
---

> Control System Design Project

**Ciaran Fontenot, Hans Wassermann, Aditya Raman** — Rutgers University, Group 6

Applied classical and modern control theory to the Hindmarsh-Rose (HR) neuron model, a nonlinear system that reproduces the spiking and bursting behavior of real neurons, to design controllers that stabilize and shape its dynamics.

---

## The Model

The brain runs on ~15 W; comparable computing hardware draws megawatts. That gap motivates neuromorphic engineering: circuits that compute the way neurons do. The Hindmarsh-Rose model captures rich neuronal firing (spiking and bursting) but has no native circuit realization — so we worked from a theoretical equivalent circuit (Ochs & Jenderny, 2021) derived directly from its governing equations, and linearized it about equilibrium to get a state-space model suitable for classical control design.

![Linear vs. nonlinear equivalent circuit (Ochs & Jenderny, 2021)](/assets/projects/neuron-model-control-system/19-paper-fig3-linear-vs-nonlinear-circuit.jpg)

![Linearized state-space equations](/assets/projects/neuron-model-control-system/03-state-space-equations.jpg)

---

## Stability & Controller Design

We designed a proportional controller using the **Routh-Hurwitz criterion** (stable for K > 0.748), independently confirmed the same boundary with the **Nyquist criterion**, and used **root locus / Bode analysis** to shape the design further. After verifying the linearized system was both controllable and observable, we designed a **full-state feedback controller** via pole placement, with feed-forward compensation to remove steady-state error.

![Full-state feedback pole placement design](/assets/projects/neuron-model-control-system/pole-placement.png)

![Feed Forward Design](/assets/projects/neuron-model-control-system/feed-forward.png)

---

## Results

Controllers designed on the linearized model were validated in MATLAB/Simulink against the full **nonlinear** system — including under noise disturbance.

![Nonlinear closed-loop response, unity gain](/assets/projects/neuron-model-control-system/nonlinear-closed-loop-unity.png)

Full-state feedback with feed-forward compensation cut steady-state error to **7%** on the nonlinear model:

![Nonlinear full-state feedback controller, 7% steady-state error](/assets/projects/neuron-model-control-system/nonlinear-full-state-feedforward.png)

Adding 0.1-amplitude noise tested the controller's robustness:

![Nonlinear closed-loop response under disturbance](/assets/projects/neuron-model-control-system/nonlinear-disturbance-noise.png)

---

## Takeaways

- Took a nonlinear, biologically derived model from governing equations to a working full-state feedback controller
- Cross-validated stability three independent ways (Routh-Hurwitz, Nyquist, root locus/Bode)
- Controller held up on the full nonlinear system and under disturbance, with predictable degradation in tracking accuracy
- Connects classical control theory to neuromorphic circuit design

**Tools:** MATLAB, Simulink, State-Space Modeling, Routh-Hurwitz, Nyquist, Root Locus, Bode Analysis, Pole Placement, Full-State Feedback

**Reference:** Ochs, K., & Jenderny, S. (2021). An equivalent electrical circuit for the Hindmarsh-Rose model. *International Journal of Circuit Theory and Applications*, 49(11), 3526–3539.
