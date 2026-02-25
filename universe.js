// universe.js
// Reverse-engineering the universe's codebase.
// We are not the authors. We are archaeologists of the compiler output.

"use strict";

// ─── RUNTIME COMPOSITION ────────────────────────────────────────────────────
// Everything that exists is a small footnote.

const universe = {
  visibleMatter: 0.05,   // 5%  — everything we know
  darkMatter:    0.27,   // 27% — we feel its gravity, can't see it
  darkEnergy:    0.68,   // 68% — accelerating expansion, unknown origin
};

// The universe ships no source maps.
// Dark matter and dark energy are the 95% of the codebase
// that is minified, unreachable, and undocumented.

// ─── THE STANDARD MODEL ─────────────────────────────────────────────────────
// A working API with no documentation and one known bug:
// it doesn't compile with gravity.

const standardModel = {

  // Fermions: the matter particles. They obey Fermi-Dirac statistics,
  // which means no two identical fermions can occupy the same quantum state.
  // Nature's solution to namespace collisions.
  fermions: {
    quarks: {
      up:      { charge: +2/3, mass_MeV: 2.2     },
      down:    { charge: -1/3, mass_MeV: 4.7     },
      charm:   { charge: +2/3, mass_MeV: 1275    },
      strange: { charge: -1/3, mass_MeV: 95      },
      top:     { charge: +2/3, mass_MeV: 173_100 }, // heaviest known elementary particle
      bottom:  { charge: -1/3, mass_MeV: 4_180   },
    },
    leptons: {
      electron:        { charge: -1, mass_MeV: 0.511  },
      muon:            { charge: -1, mass_MeV: 105.7  },
      tau:             { charge: -1, mass_MeV: 1776.9 },
      electron_neutrino: { charge: 0, mass_MeV: '<0.0000022' },
      muon_neutrino:     { charge: 0, mass_MeV: '<0.17'      },
      tau_neutrino:      { charge: 0, mass_MeV: '<15.5'      },
      // Neutrinos are the universe's ghost threads —
      // 100 trillion pass through your body every second, doing nothing.
    },
  },

  // Bosons: the force carriers. They obey Bose-Einstein statistics,
  // meaning they can all pile into the same quantum state.
  // This is how lasers work. Coherence by consensus.
  bosons: {
    photon:   { force: 'electromagnetic', mass: 0, range: Infinity },
    gluon:    { force: 'strong_nuclear',  mass: 0, range: '~1fm'   },
    W_plus:   { force: 'weak_nuclear',    mass_GeV: 80.4, charge: +1 },
    W_minus:  { force: 'weak_nuclear',    mass_GeV: 80.4, charge: -1 },
    Z_zero:   { force: 'weak_nuclear',    mass_GeV: 91.2, charge:  0 },
    higgs:    {
      force: 'mass_field',
      mass_GeV: 125.1,
      discovered: 2012,
      note: 'The mechanism that gives mass to other particles. Found after a 48-year search.'
      // Predicting a particle in 1964, finding it in 2012:
      // the longest-running passing test in physics history.
    },
  },

  // What's not in the model — the open issues:
  openIssues: [
    'gravity (no quantum carrier found — graviton is hypothetical)',
    'dark matter (not a particle in this model)',
    'dark energy (not a field in this model)',
    'matter/antimatter asymmetry (why is there something rather than nothing?)',
    'neutrino masses (non-zero, but the model assumed zero)',
    'strong CP problem (why is the strong force so symmetric?)',
  ],
};

// ─── FUNDAMENTAL CONSTANTS ───────────────────────────────────────────────────
// Hard-coded values. No config file. No environment variables.
// If these numbers were slightly different, the program wouldn't run.

const constants = {
  c:   299_792_458,         // speed of light, m/s — the universe's max throughput
  h:   6.626e-34,           // Planck's constant — the universe's minimum resolution
  G:   6.674e-11,           // gravitational constant — how hard spacetime bends
  e:   1.602e-19,           // elementary charge — the quantum of electric charge
  k_B: 1.381e-23,           // Boltzmann constant — bridge between micro and macro
  α:   1/137.036,           // fine-structure constant — the coupling strength of electromagnetism
  // α ≈ 1/137. No one knows why. It is what it is.
  // Richard Feynman called it "one of the greatest damn mysteries of physics."
};

// ─── GENERAL RELATIVITY AS A FUNCTION ────────────────────────────────────────
// Einstein's field equations: G_μν + Λg_μν = (8πG/c⁴) T_μν
// Spacetime tells matter how to move.
// Matter tells spacetime how to curve.
// It's a circular dependency, and it compiles fine.

function spacetimeCurvature({ massDensity, pressureTensor }) {
  // In GR, what we feel as "gravity" is not a force.
  // It is the geometry of spacetime itself — and we are falling through it.
  return {
    geodesic: 'the straightest possible path through curved spacetime',
    whatYouFeel: 'the ground pushing up against you, resisting freefall',
    whatGravityActuallyIs: 'curvature, not force',
    cosmologicalConstant: 'Λ — Einstein\'s biggest blunder, or his greatest insight',
    // He added Λ to keep the universe static, then removed it when Hubble
    // showed the universe was expanding. Dark energy brought it back.
  };
}

// ─── QUANTUM MECHANICS ───────────────────────────────────────────────────────
// The universe at small scales does not work the way you think.
// It is probabilistic, non-local, and deeply weird.

const quantumMechanics = {

  // Heisenberg uncertainty: Δx · Δp ≥ ℏ/2
  // You cannot know both position and momentum precisely.
  // This is not a measurement problem. It is ontological.
  uncertainty: (position, momentum) => {
    const hbar = constants.h / (2 * Math.PI);
    const certaintyProduct = position.uncertainty * momentum.uncertainty;
    if (certaintyProduct < hbar / 2) {
      throw new Error('HeisenbergViolation: the universe forbids this.');
    }
    return 'the universe is fuzzy at the edges — by design';
  },

  // Superposition: a quantum system exists in all possible states
  // until it is observed (measured). The act of measurement collapses the wavefunction.
  // The universe doesn't render what no one is looking at.
  // (Or maybe it does, and we're in a branch where we looked.)
  superposition: (states) => ({
    before_measurement: states,               // all possibilities, weighted by amplitude
    after_measurement: states[
      // collapse happens here — but the math doesn't tell you which branch you get.
      Math.floor(Math.random() * states.length)
    ],
    interpretation: 'Copenhagen, Many-Worlds, or something we haven\'t thought of yet',
  }),

  // Entanglement: two particles share a quantum state regardless of distance.
  // Measuring one instantly determines the other — but no information travels.
  // It's read-only synchronization across arbitrary distance.
  entangle: (particleA, particleB) => {
    const sharedState = Math.random() > 0.5 ? 'spin_up' : 'spin_down';
    return {
      [particleA]: sharedState,
      [particleB]: sharedState === 'spin_up' ? 'spin_down' : 'spin_up',
      note: 'Correlation is not causation, even at the speed of nothing.'
    };
  },
};

// ─── THE BIG BANG AS A BOOT SEQUENCE ─────────────────────────────────────────
// t=0 is a singularity. The physics breaks there.
// We can only read the log from t=10^-43 seconds onward (Planck time).

const bootSequence = [
  { t: '0',          event: 'UNDEFINED — singularity, all known physics breaks' },
  { t: '10^-43 s',   event: 'Planck epoch begins. Quantum gravity required (not yet found).' },
  { t: '10^-36 s',   event: 'Inflation: universe expands faster than light, exponentially' },
  { t: '10^-12 s',   event: 'Electroweak symmetry breaks. Higgs field activates. Particles get mass.' },
  { t: '10^-6 s',    event: 'Quarks bind into protons and neutrons' },
  { t: '3 min',      event: 'Big Bang nucleosynthesis: H, He, Li nuclei form' },
  { t: '380,000 yr', event: 'Recombination: universe becomes transparent. Photons escape → CMB' },
  { t: '400 Myr',    event: 'First stars ignite (Population III — no metals, massive, short-lived)' },
  { t: '9.2 Gyr',    event: 'Solar system forms from a recycled stellar cloud' },
  { t: '13.8 Gyr',   event: 'NOW — a pattern of atoms reads a file about the system it runs on' },
];

// ─── THE MEASUREMENT PROBLEM ─────────────────────────────────────────────────
// The LHC is our debugger. We set the collision energy, read the decay products,
// and infer what existed for 10^-25 seconds before it fell apart.
// We have never directly seen a quark. We infer them from jets.
// The universe does not expose private fields.

const LHC = {
  circumference_km: 27,
  collision_energy_TeV: 13.6,
  collisions_per_second: 1_000_000_000,
  detectors: ['ATLAS', 'CMS', 'ALICE', 'LHCb'],

  debug: function(collisionEvent) {
    // We smash protons together at 99.9999991% the speed of light
    // and watch what falls out. The decay products are the stack trace.
    return {
      input:     'two protons at 6.8 TeV each',
      collision: 'brief recreation of conditions ~10^-12 seconds after the Big Bang',
      output:    collisionEvent.decayProducts,
      insight:   'the Higgs boson appeared this way in 2012, after 48 years of searching',
    };
  },
};

// ─── WHAT WE DON'T KNOW ──────────────────────────────────────────────────────
// The honest summary. Production is running.
// We do not have the source code.

const openQuestions = {
  quantumGravity:          'How do GR and QM unify? String theory? Loop quantum gravity? Neither?',
  darkMatterParticle:      'WIMPs? Axions? Primordial black holes? Sterile neutrinos?',
  darkEnergyOrigin:        'Vacuum energy? Quintessence? A mistake in our equations?',
  consciousnessAndPhysics: 'Does the observer have a physical role, or is that just interpretation?',
  timeAsymmetry:           'The laws are time-symmetric. So why does time only run one way?',
  finetuning:              'Why are the constants what they are? Multiverse? Necessity? Coincidence?',
  beforeTheBigBang:        '"Before" may not be a valid query for t < 0',
};

// ─── FINAL EXPORT ────────────────────────────────────────────────────────────

module.exports = {
  universe,
  standardModel,
  constants,
  quantumMechanics,
  bootSequence,
  LHC,
  openQuestions,
};

// We are made of atoms that were forged in the cores of stars
// that died before the Sun existed.
// We are the universe examining itself.
// The code is reading itself — and writing notes in the margin.
