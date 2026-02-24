const {
  universe,
  standardModel,
  constants,
  quantumMechanics,
  bootSequence,
  LHC,
  openQuestions,
} = require('./universe');

// ─── UNIVERSE COMPOSITION ────────────────────────────────────────────────────

describe('universe', () => {
  test('contains visibleMatter, darkMatter, and darkEnergy', () => {
    expect(universe).toHaveProperty('visibleMatter');
    expect(universe).toHaveProperty('darkMatter');
    expect(universe).toHaveProperty('darkEnergy');
  });

  test('composition fractions sum to 1.0 (100%)', () => {
    const total = universe.visibleMatter + universe.darkMatter + universe.darkEnergy;
    expect(total).toBeCloseTo(1.0, 10);
  });

  test('all composition values are between 0 and 1', () => {
    for (const [key, value] of Object.entries(universe)) {
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThan(1);
    }
  });

  test('dark energy is the dominant component', () => {
    expect(universe.darkEnergy).toBeGreaterThan(universe.darkMatter);
    expect(universe.darkEnergy).toBeGreaterThan(universe.visibleMatter);
  });
});

// ─── STANDARD MODEL ──────────────────────────────────────────────────────────

describe('standardModel', () => {
  describe('fermions.quarks', () => {
    const { quarks } = standardModel.fermions;

    test('contains all 6 quark flavors', () => {
      const expectedQuarks = ['up', 'down', 'charm', 'strange', 'top', 'bottom'];
      expect(Object.keys(quarks)).toEqual(expect.arrayContaining(expectedQuarks));
      expect(Object.keys(quarks)).toHaveLength(6);
    });

    test('each quark has charge and mass_MeV', () => {
      for (const [name, quark] of Object.entries(quarks)) {
        expect(quark).toHaveProperty('charge');
        expect(quark).toHaveProperty('mass_MeV');
        expect(typeof quark.charge).toBe('number');
        expect(typeof quark.mass_MeV).toBe('number');
      }
    });

    test('up-type quarks have charge +2/3', () => {
      expect(quarks.up.charge).toBeCloseTo(2 / 3);
      expect(quarks.charm.charge).toBeCloseTo(2 / 3);
      expect(quarks.top.charge).toBeCloseTo(2 / 3);
    });

    test('down-type quarks have charge -1/3', () => {
      expect(quarks.down.charge).toBeCloseTo(-1 / 3);
      expect(quarks.strange.charge).toBeCloseTo(-1 / 3);
      expect(quarks.bottom.charge).toBeCloseTo(-1 / 3);
    });

    test('top quark is the heaviest', () => {
      const masses = Object.values(quarks).map(q => q.mass_MeV);
      expect(quarks.top.mass_MeV).toBe(Math.max(...masses));
    });

    test('up quark is the lightest', () => {
      const masses = Object.values(quarks).map(q => q.mass_MeV);
      expect(quarks.up.mass_MeV).toBe(Math.min(...masses));
    });
  });

  describe('fermions.leptons', () => {
    const { leptons } = standardModel.fermions;

    test('contains all 6 leptons', () => {
      const expectedLeptons = [
        'electron', 'muon', 'tau',
        'electron_neutrino', 'muon_neutrino', 'tau_neutrino',
      ];
      expect(Object.keys(leptons)).toEqual(expect.arrayContaining(expectedLeptons));
      expect(Object.keys(leptons)).toHaveLength(6);
    });

    test('charged leptons have charge -1', () => {
      expect(leptons.electron.charge).toBe(-1);
      expect(leptons.muon.charge).toBe(-1);
      expect(leptons.tau.charge).toBe(-1);
    });

    test('neutrinos have charge 0', () => {
      expect(leptons.electron_neutrino.charge).toBe(0);
      expect(leptons.muon_neutrino.charge).toBe(0);
      expect(leptons.tau_neutrino.charge).toBe(0);
    });

    test('charged leptons have numeric mass_MeV', () => {
      expect(typeof leptons.electron.mass_MeV).toBe('number');
      expect(typeof leptons.muon.mass_MeV).toBe('number');
      expect(typeof leptons.tau.mass_MeV).toBe('number');
    });

    test('neutrinos have string mass_MeV (upper bounds)', () => {
      expect(typeof leptons.electron_neutrino.mass_MeV).toBe('string');
      expect(typeof leptons.muon_neutrino.mass_MeV).toBe('string');
      expect(typeof leptons.tau_neutrino.mass_MeV).toBe('string');
    });

    test('tau is heavier than muon, muon is heavier than electron', () => {
      expect(leptons.tau.mass_MeV).toBeGreaterThan(leptons.muon.mass_MeV);
      expect(leptons.muon.mass_MeV).toBeGreaterThan(leptons.electron.mass_MeV);
    });
  });

  describe('bosons', () => {
    const { bosons } = standardModel;

    test('contains all expected bosons', () => {
      const expectedBosons = ['photon', 'gluon', 'W_plus', 'W_minus', 'Z_zero', 'higgs'];
      expect(Object.keys(bosons)).toEqual(expect.arrayContaining(expectedBosons));
      expect(Object.keys(bosons)).toHaveLength(6);
    });

    test('each boson has a force property', () => {
      for (const [name, boson] of Object.entries(bosons)) {
        expect(boson).toHaveProperty('force');
        expect(typeof boson.force).toBe('string');
      }
    });

    test('photon is massless with infinite range', () => {
      expect(bosons.photon.mass).toBe(0);
      expect(bosons.photon.range).toBe(Infinity);
      expect(bosons.photon.force).toBe('electromagnetic');
    });

    test('gluon is massless with finite range', () => {
      expect(bosons.gluon.mass).toBe(0);
      expect(bosons.gluon.force).toBe('strong_nuclear');
    });

    test('W bosons have opposite charges', () => {
      expect(bosons.W_plus.charge).toBe(+1);
      expect(bosons.W_minus.charge).toBe(-1);
    });

    test('W bosons have the same mass', () => {
      expect(bosons.W_plus.mass_GeV).toBe(bosons.W_minus.mass_GeV);
    });

    test('Z boson is electrically neutral', () => {
      expect(bosons.Z_zero.charge).toBe(0);
    });

    test('Higgs boson was discovered in 2012', () => {
      expect(bosons.higgs.discovered).toBe(2012);
    });

    test('Higgs boson mass is approximately 125 GeV', () => {
      expect(bosons.higgs.mass_GeV).toBeCloseTo(125.1, 1);
    });
  });

  describe('openIssues', () => {
    test('is a non-empty array', () => {
      expect(Array.isArray(standardModel.openIssues)).toBe(true);
      expect(standardModel.openIssues.length).toBeGreaterThan(0);
    });

    test('contains gravity as an open issue', () => {
      const hasGravity = standardModel.openIssues.some(issue =>
        issue.toLowerCase().includes('gravity')
      );
      expect(hasGravity).toBe(true);
    });
  });
});

// ─── FUNDAMENTAL CONSTANTS ───────────────────────────────────────────────────

describe('constants', () => {
  test('speed of light is 299,792,458 m/s', () => {
    expect(constants.c).toBe(299_792_458);
  });

  test('Planck constant is approximately 6.626e-34', () => {
    expect(constants.h).toBeCloseTo(6.626e-34, 37);
  });

  test('gravitational constant is approximately 6.674e-11', () => {
    expect(constants.G).toBeCloseTo(6.674e-11, 14);
  });

  test('elementary charge is approximately 1.602e-19', () => {
    expect(constants.e).toBeCloseTo(1.602e-19, 22);
  });

  test('Boltzmann constant is approximately 1.381e-23', () => {
    expect(constants.k_B).toBeCloseTo(1.381e-23, 26);
  });

  test('fine-structure constant is approximately 1/137', () => {
    expect(constants.α).toBeCloseTo(1 / 137.036, 10);
  });

  test('all constants are positive numbers', () => {
    for (const [name, value] of Object.entries(constants)) {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
    }
  });
});

// ─── QUANTUM MECHANICS ───────────────────────────────────────────────────────

describe('quantumMechanics', () => {
  describe('uncertainty', () => {
    test('allows measurements that satisfy the uncertainty principle', () => {
      const hbar = constants.h / (2 * Math.PI);
      const position = { uncertainty: 1e-10 };
      const momentum = { uncertainty: hbar / (2 * 1e-10) + 1e-30 }; // just above the limit
      const result = quantumMechanics.uncertainty(position, momentum);
      expect(typeof result).toBe('string');
    });

    test('throws HeisenbergViolation when uncertainty principle is violated', () => {
      const position = { uncertainty: 1e-35 };
      const momentum = { uncertainty: 1e-35 };
      expect(() => {
        quantumMechanics.uncertainty(position, momentum);
      }).toThrow('HeisenbergViolation');
    });

    test('boundary case: exactly at the limit should not throw', () => {
      const hbar = constants.h / (2 * Math.PI);
      const position = { uncertainty: 1 };
      const momentum = { uncertainty: hbar / 2 };
      // Product equals hbar/2 exactly, so it should NOT throw (>= check)
      expect(() => {
        quantumMechanics.uncertainty(position, momentum);
      }).not.toThrow();
    });
  });

  describe('superposition', () => {
    test('returns an object with before_measurement and after_measurement', () => {
      const states = ['alive', 'dead'];
      const result = quantumMechanics.superposition(states);
      expect(result).toHaveProperty('before_measurement');
      expect(result).toHaveProperty('after_measurement');
      expect(result).toHaveProperty('interpretation');
    });

    test('before_measurement contains all original states', () => {
      const states = ['spin_up', 'spin_down'];
      const result = quantumMechanics.superposition(states);
      expect(result.before_measurement).toEqual(states);
    });

    test('after_measurement is one of the original states', () => {
      const states = ['red', 'green', 'blue'];
      const result = quantumMechanics.superposition(states);
      expect(states).toContain(result.after_measurement);
    });

    test('works with a single state', () => {
      const states = ['only_state'];
      const result = quantumMechanics.superposition(states);
      expect(result.after_measurement).toBe('only_state');
    });
  });

  describe('entangle', () => {
    test('returns an object with both particles', () => {
      const result = quantumMechanics.entangle('electronA', 'electronB');
      expect(result).toHaveProperty('electronA');
      expect(result).toHaveProperty('electronB');
      expect(result).toHaveProperty('note');
    });

    test('entangled particles have opposite spins', () => {
      const result = quantumMechanics.entangle('A', 'B');
      const validPairs = [
        ['spin_up', 'spin_down'],
        ['spin_down', 'spin_up'],
      ];
      expect(validPairs).toContainEqual([result.A, result.B]);
    });

    test('result always contains a note about correlation', () => {
      const result = quantumMechanics.entangle('x', 'y');
      expect(result.note).toBeDefined();
      expect(typeof result.note).toBe('string');
    });
  });
});

// ─── BOOT SEQUENCE ───────────────────────────────────────────────────────────

describe('bootSequence', () => {
  test('is a non-empty array', () => {
    expect(Array.isArray(bootSequence)).toBe(true);
    expect(bootSequence.length).toBeGreaterThan(0);
  });

  test('each entry has t and event properties', () => {
    for (const entry of bootSequence) {
      expect(entry).toHaveProperty('t');
      expect(entry).toHaveProperty('event');
      expect(typeof entry.t).toBe('string');
      expect(typeof entry.event).toBe('string');
    }
  });

  test('starts at t=0 (the singularity)', () => {
    expect(bootSequence[0].t).toBe('0');
  });

  test('ends at the present (13.8 Gyr)', () => {
    const last = bootSequence[bootSequence.length - 1];
    expect(last.t).toContain('13.8 Gyr');
  });

  test('contains the CMB recombination event', () => {
    const hasCMB = bootSequence.some(entry =>
      entry.event.toLowerCase().includes('cmb') ||
      entry.event.toLowerCase().includes('recombination')
    );
    expect(hasCMB).toBe(true);
  });

  test('contains the inflation event', () => {
    const hasInflation = bootSequence.some(entry =>
      entry.event.toLowerCase().includes('inflation')
    );
    expect(hasInflation).toBe(true);
  });

  test('has exactly 10 entries', () => {
    expect(bootSequence).toHaveLength(10);
  });
});

// ─── LHC ─────────────────────────────────────────────────────────────────────

describe('LHC', () => {
  test('has the correct circumference', () => {
    expect(LHC.circumference_km).toBe(27);
  });

  test('has 4 detectors', () => {
    expect(LHC.detectors).toHaveLength(4);
    expect(LHC.detectors).toContain('ATLAS');
    expect(LHC.detectors).toContain('CMS');
    expect(LHC.detectors).toContain('ALICE');
    expect(LHC.detectors).toContain('LHCb');
  });

  test('collision_energy_TeV is a positive number', () => {
    expect(LHC.collision_energy_TeV).toBeGreaterThan(0);
  });

  test('collisions_per_second is 1 billion', () => {
    expect(LHC.collisions_per_second).toBe(1_000_000_000);
  });

  describe('debug', () => {
    test('returns collision analysis for a given event', () => {
      const event = { decayProducts: ['muon+', 'muon-', 'photon', 'photon'] };
      const result = LHC.debug(event);
      expect(result).toHaveProperty('input');
      expect(result).toHaveProperty('collision');
      expect(result).toHaveProperty('output');
      expect(result).toHaveProperty('insight');
    });

    test('output matches the provided decayProducts', () => {
      const decayProducts = ['electron', 'positron', 'neutrino'];
      const event = { decayProducts };
      const result = LHC.debug(event);
      expect(result.output).toEqual(decayProducts);
    });

    test('input describes two protons', () => {
      const result = LHC.debug({ decayProducts: [] });
      expect(result.input).toContain('proton');
    });
  });
});

// ─── OPEN QUESTIONS ──────────────────────────────────────────────────────────

describe('openQuestions', () => {
  test('is an object with multiple questions', () => {
    expect(typeof openQuestions).toBe('object');
    expect(Object.keys(openQuestions).length).toBeGreaterThan(0);
  });

  test('all values are non-empty strings', () => {
    for (const [key, value] of Object.entries(openQuestions)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });

  test('contains key unsolved questions', () => {
    expect(openQuestions).toHaveProperty('quantumGravity');
    expect(openQuestions).toHaveProperty('darkMatterParticle');
    expect(openQuestions).toHaveProperty('darkEnergyOrigin');
    expect(openQuestions).toHaveProperty('timeAsymmetry');
    expect(openQuestions).toHaveProperty('finetuning');
    expect(openQuestions).toHaveProperty('beforeTheBigBang');
  });
});

// ─── MODULE EXPORTS ──────────────────────────────────────────────────────────

describe('module exports', () => {
  test('exports all expected top-level members', () => {
    const mod = require('./universe');
    expect(mod).toHaveProperty('universe');
    expect(mod).toHaveProperty('standardModel');
    expect(mod).toHaveProperty('constants');
    expect(mod).toHaveProperty('quantumMechanics');
    expect(mod).toHaveProperty('bootSequence');
    expect(mod).toHaveProperty('LHC');
    expect(mod).toHaveProperty('openQuestions');
  });

  test('exports exactly 7 members', () => {
    const mod = require('./universe');
    expect(Object.keys(mod)).toHaveLength(7);
  });
});
