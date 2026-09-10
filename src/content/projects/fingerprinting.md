---
title: Audio Fingerprinting & FIR Filter Design
description: >-
  A from-scratch MATLAB implementation of Shazam-style audio fingerprinting —
  spectrogram peak-picking, relational hashing, and noise-robust song
  identification — alongside a study of FIR filter design.
date: 2026-04-04
math: true
tags:
  - Digital Signal Processing
  - MATLAB
  - Audio Processing
  - Algorithm Design
  - Python
image:
  path: /assets/projects/fingerprinting/fingerprint.png
  alt: Spectrogram of an audio track with detected fingerprint peaks
---

<!-- markdownlint-disable MD001 -->

> Digital Signal Processing term project, March 2026 – May 2026.

A MATLAB system that identifies a song from a short, noisy audio clip — implementing the same spectral peak-hashing approach used by apps like Shazam — alongside a study of FIR filter design and its trade-offs.
<!--
📄 [Read the final report (PDF)](/assets/projects/fingerprinting/final-paper.pdf)
💻 [View the code on GitHub](https://github.com/hanswassermann/shazam-fingerprinting.git)
-->
**My role:** algorithm design for the similarity/matching metric, MATLAB implementation of the fingerprinting and comparison pipeline, and report writing.

---

## FIR Filter Design

Using the windowed-sinc method (`fir1`, Hamming window), I designed and analyzed low-pass and high-pass FIR filters at orders 32 and 64 with a 3 kHz cutoff, comparing their magnitude and phase responses.

<figure>
  <img src="/assets/projects/fingerprinting/order64.png" alt="Magnitude and phase response of the 64th-order FIR low-pass filter" />
  <figcaption>Magnitude and phase response of the 64th-order FIR low-pass filter (cutoff 3 kHz).</figcaption>
</figure>

<figure>
  <img src="/assets/projects/fingerprinting/order32.png" alt="Magnitude and phase response of the 32nd-order FIR low-pass filter" />
  <figcaption>Magnitude and phase response of the 32nd-order FIR low-pass filter (cutoff 3 kHz).</figcaption>
</figure>

Dropping the order from 64 to 32 widens and softens the transition band — fewer coefficients means the filter can't approximate an ideal rectangular response as closely, so the rolloff near the cutoff is noticeably less steep. The phase response also shows fewer oscillation cycles, since a lower-order filter introduces less group delay.

---

## Audio Fingerprinting: How It Works

The core idea behind Shazam-style identification is turning audio into a compact, noise-robust "fingerprint" that can be matched even from a few noisy seconds of a recording.

**1. Spectrogram.** A sliding FFT window is stepped across the signal, producing a 2D array $S(f, t)$ of frequency magnitude over time — telling us not just *which* frequencies are present, but *when*.

**2. Peak-picking.** For every point $S(f, t)$, a $7\times7$ neighborhood is checked: the point is kept as a peak only if it's the local maximum *and* above an amplitude threshold. This keeps only the handful of frequencies that are strong enough to survive background noise.

**3. Relational hashing.** Rather than storing absolute peak coordinates (fragile — they'd shift if the recording started a second later), each peak is paired with the next `fanOut = 5` peaks that follow it, encoding the *relationship* between them:

$$
\begin{bmatrix} f_1 & f_2 & \Delta t & t_1 \end{bmatrix}
$$

where $f_1$ is the anchor peak's frequency, $f_2$ is the paired peak's frequency, $\Delta t = t_2 - t_1$ is the time difference between them, and $t_1$ is the anchor's absolute time (kept only for later alignment, not for matching). Because $\Delta t$ is *relative*, the fingerprint is invariant to where in the song a clip starts.

**4. Anchor-based matching.** A query clip's first hash is used as an anchor to find candidate time offsets in the database. Every other query hash is shifted by that offset and checked for a match — a database hash $d$ is counted as a match to query hash $q = (f_1, f_2, \Delta T, t_1)$ only if all four conditions hold:

$$
\begin{aligned}
|f_{1,q} - f_{1,d}| &< \epsilon_f \\
|f_{2,q} - f_{2,d}| &< \epsilon_f \\
|\Delta T_q - \Delta T_d| &< \epsilon_t \\
|t_{1,q} + \Delta t_{\text{offset}} - t_{1,d}| &< \epsilon_t
\end{aligned}
$$

using $\epsilon_f = 50\text{ Hz}$ and $\epsilon_t = 0.05\text{ s}$. That fourth condition is what makes the metric discriminative: a coincidental frequency match in the *wrong part* of a song gets rejected, since the offset fixes where in the database each query hash should land.

---

## MATLAB Implementation

Peak-picking and relational hashing, from `computeHashes.m`:

```matlab
for t = (1 + neighborhoodSize):(nTimeBins - neighborhoodSize)
    for f = (1 + neighborhoodSize):(nFreqBins - neighborhoodSize)
        localWindow = S(f - neighborhoodSize:f + neighborhoodSize, ...
                         t - neighborhoodSize:t + neighborhoodSize);
        if S(f, t) == max(localWindow(:)) && S(f, t) > ampMin
            peaks(f, t) = 1;
        end
    end
end

[peakFreqIdx, peakTimeIdx] = find(peaks);

hashes = [];
for i = 1:length(peakTimeIdx)
    for j = 1:fanOut
        if i + j <= length(peakTimeIdx)
            t1 = T(peakTimeIdx(i));
            t2 = T(peakTimeIdx(i + j));
            f1 = F(peakFreqIdx(i));
            f2 = F(peakFreqIdx(i + j));
            deltaT = round(t2 - t1, 2);
            hashes(end+1, :) = [round(f1), round(f2), deltaT, round(t1, 2)];
        end
    end
end
```

Anchor-based similarity scoring, from `computeSimilarity.m`:

```matlab
% find all candidates in dbHashes that match the first hash entry within a tolerance
candidateIdx = find( ...
    abs(dbHashes(:,1) - q_anchor(1)) < freq_tol & ...
    abs(dbHashes(:,2) - q_anchor(2)) < freq_tol & ...
    abs(dbHashes(:,3) - q_anchor(3)) < time_tol );

for c = 1:length(candidateIdx)
    t_offset = dbHashes(candidateIdx(c), 4) - q_anchor(4);
    candidateScore = 0;

    for i = 1:size(queryHashes, 1)
        q = queryHashes(i, :);
        q_t1_shifted = q(4) + t_offset;

        match = any( ...
            abs(dbHashes(:,1) - q(1)) < freq_tol & ...
            abs(dbHashes(:,2) - q(2)) < freq_tol & ...
            abs(dbHashes(:,3) - q(3)) < time_tol & ...
            abs(dbHashes(:,4) - q_t1_shifted) < time_tol );

        if match
            candidateScore = candidateScore + 1;
        end
    end

    score = max(score, candidateScore);
end
```

---

## Results

I built a reference database of 13 songs and tested the pipeline against a 3-second clip of *Slow Ride* by Foghat, artificially corrupted with white Gaussian noise to simulate a noisy recording environment.

```text
Best match: song 4 (Foghat - Slow Ride.wav) with score 338

All scores:
  Song 1  (Alice Cooper - School's Out):              47 matches
  Song 4  (Foghat - Slow Ride):                       338 matches  ← correct match
  Song 9  (Mountain - Mississippi Queen):              86 matches
  Song 8  (Lynyrd Skynyrd - Sweet Home Alabama):        81 matches
  ...
```

The correct song scored **338 matches — nearly 4× higher than the next-closest song (86)** — despite the added noise and the short query length. The margin comes directly from the temporal-consistency check: songs that coincidentally share a few frequencies with the query score low, because those matches don't line up consistently at a single time offset.