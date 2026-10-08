import { Article, NewsFlash } from '../types/blog';

export const INITIAL_NEWS_FLASHES: NewsFlash[] = [
  {
    id: 'flash-1',
    headline: 'Frontier reasoning benchmark scores surpass 94% on formal mathematical verification suites',
    source: 'MIT AI Lab',
    timeAgo: '18m ago',
    category: 'Frontier Models',
    summary: 'Researchers demonstrate that scaling test-time compute search over tree-of-thought representations yields near-deterministic convergence on previously intractable Putnam competition proofs.',
    impactLevel: 'Critical',
  },
  {
    id: 'flash-2',
    headline: 'Bipedal generalist fleet achieves 10,000 continuous hours without human intervention in automotive plant',
    source: 'Automotive Robotics Wire',
    timeAgo: '42m ago',
    category: 'Embodied AI',
    summary: 'Zero-shot motor policy transfers from simulated physics engines to real manufacturing floors without task-specific fine-tuning.',
    impactLevel: 'High',
  },
  {
    id: 'flash-3',
    headline: 'Sub-picosecond co-packaged optical interconnects demonstrated for 500k-accelerator clusters',
    source: 'Semiconductor Digest',
    timeAgo: '2h ago',
    category: 'Silicon & Compute',
    summary: 'Photonic waveguides replace copper backplanes, slashing inter-rack latency by 85% and cutting datacenter cooling overhead.',
    impactLevel: 'High',
  },
  {
    id: 'flash-4',
    headline: 'De novo biocatalyst engineered in silico captures atmospheric methane at ambient temperatures',
    source: 'Nature Biotechnology',
    timeAgo: '3h ago',
    category: 'Bio & Science',
    summary: 'Generative diffusion models designed active catalytic pockets that folded with 0.58 Ångström root-mean-square precision in wet-lab tests.',
    impactLevel: 'Critical',
  },
  {
    id: 'flash-5',
    headline: 'International Compute Verification Protocol ratified across 34 nations to prevent rogue superclusters',
    source: 'Geneva AI Accord',
    timeAgo: '5h ago',
    category: 'Policy & Governance',
    summary: 'Hardware-anchored zero-knowledge attestation now certifies power draw and training FLOPs above 10²⁶ thresholds.',
    impactLevel: 'Notable',
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'lead-reasoning-frontiers',
    slug: 'recursive-self-correction-post-transformer-epoch',
    title: 'Recursive Self-Correction & The Post-Transformer Epoch: How Test-Time Compute Broke the Reasoning Ceiling',
    deck: 'As pre-training scaling laws encounter natural data exhaustion, the locus of artificial capability has shifted decisively to inference-time verification, Monte Carlo rollouts, and self-improving synthetic feedback loops.',
    category: 'Frontier Models',
    publishedAt: 'October 6, 2026',
    readTime: '8 min read',
    tier: 'lead',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Senior Research Fellow',
      affiliation: 'Center for Cognitive Architectures',
      avatarInitials: 'ER',
    },
    visualType: 'neural-network',
    visualTitle: 'Latent Path Tree Exploration in Test-Time Search',
    visualCaption: 'Fig. 1 — Visualization of multi-branch search rollouts over latent reasoning nodes, with automated value-head pruning of contradictory intermediate premises.',
    tags: ['Test-Time Compute', 'Reasoning Models', 'Monte Carlo Search', 'Synthetic Verification', 'Foundation Models'],
    likes: 342,
    takeaways: [
      'Scaling compute during inference delivers compounding logarithmic gains previously thought to require trillions of additional training tokens.',
      'Deterministic execution environments (code interpreters, formal proof assistants) eliminate hallucination loops in generative reasoning chains.',
      'Pre-training has transitioned from being the ultimate capability generator to functioning as an initial semantic dictionary for inference search engines.',
      'The bottleneck is no longer human-written web text, but rather the speed of verifiable simulator rollouts.',
    ],
    contentSections: [
      {
        heading: 'The Exhaustion of the Passive Corpus',
        body: 'For nearly seven years, the prevailing dogma of generative intelligence held that model competence was an uninterrupted function of web-scale tokens and parameter counts. Yet by late 2025, every major frontier lab arrived at an inescapable mathematical asymptote: the global sum of clean human intellectual prose had been ingested, compressed, and memorized. Further scaling of naive autoregression produced diminishing marginal returns, punctuated by synthetic data collapse when models trained on their own ungrounded hallucinations.',
      },
      {
        pullQuote: 'We stopped asking how much a model knows upon first generation, and started measuring how effectively it can refute its own drafts in a verification sandbox.',
        pullQuoteAuthor: 'Dr. Elena Rostova, Center for Cognitive Architectures',
        body: 'The pivot was both subtle and tectonic: redirecting computational capital from monolithic pre-training clusters toward test-time reasoning. Rather than producing an instantaneous probability distribution over the next token, modern reasoning engines construct explicit tree searches—generating hundreds of internal hypotheses, stress-testing intermediate lemmas against formal logic compilers, and discarding contradictory branches before delivering a single verified sentence.',
      },
      {
        heading: 'Formal Sandboxes and Deterministic Verifiers',
        body: 'The crucial breakthrough was not merely giving the model "more time to think," but coupling that contemplation to non-negotiable external arbiters. When an autonomous system attempts to solve a high-stakes algorithmic theorem or a complex chemical synthesis protocol, every candidate step is compiled through deterministic environments such as Lean 4, formal symbolic math engines, or virtual sandboxes.',
        metrics: [
          {
            label: 'Putnam Competition Accuracy',
            value: '94.2%',
            trend: '+38% vs 2024 baselines',
            detail: 'Evaluated on unreleased formal proof suites',
          },
          {
            label: 'Inference FLOPs per Solution',
            value: '1.4×10¹⁵',
            trend: 'Adaptive budget',
            detail: 'Dynamically allocated based on problem hardness',
          },
          {
            label: 'Hallucination Rate (Verifiable Tasks)',
            value: '< 0.08%',
            trend: '-99.1% drop',
            detail: 'Measured across 50,000 continuous benchmark cycles',
          },
        ],
      },
      {
        heading: 'Architecture of the Verification Loop',
        body: 'In this paradigm, the neural network acts not as a lone oracle, but as a dual-system cognitive agent: a rapid intuitive proposer paired with an unyielding value verifier. Below is an architectural abstraction of the adaptive search kernel now standard across frontier deployments.',
        codeSnippet: {
          title: 'Adaptive Tree-Search Inference Kernel (Pseudocode)',
          language: 'python',
          code: `def execute_verified_inference(prompt, verifier_env, max_depth=16):
    root_state = initialize_latent_state(prompt)
    search_tree = MonteCarloLatentTree(root_state)
    
    while search_tree.compute_budget_remaining():
        leaf = search_tree.select_most_promising_candidate()
        hypothesis_branch = proposer_model.generate_step(leaf)
        
        # Grounded deterministic execution check
        verification_result = verifier_env.audit(hypothesis_branch)
        
        if verification_result.is_valid:
            score = value_critic_model.evaluate_consistency(hypothesis_branch)
            search_tree.backpropagate_confidence(leaf, score)
        else:
            search_tree.prune_branch(leaf, reason=verification_result.error)
            
    return search_tree.synthesize_dominant_trajectory()`,
        },
      },
      {
        heading: 'The Horizon: Autonomous Epistemic Agents',
        body: 'The implications for the broader scientific enterprise are profound. When an artificial system can autonomously formulate a conjecture, construct the experimental simulation to test it, discover the flaw in its own derivation, and iterate until proven correct, the historical distinction between knowledge retrieval and scientific discovery begins to dissolve. We have crossed into an era where artificial intelligence does not merely mimic human answers—it uncovers theorems that human cognition had not yet formulated.',
      },
    ],
    comments: [
      {
        id: 'c-1',
        author: 'Marcus Vance',
        role: 'Principal Systems Architect',
        avatarInitials: 'MV',
        timestamp: '2 hours ago',
        content: 'The shift to deterministic verifiers is the most rigorous thing to happen to AI in a decade. We are seeing software engineering error rates plummet because models now write the test suites before they finalize the implementations.',
        likes: 19,
      },
      {
        id: 'c-2',
        author: 'Prof. Amara Osei',
        role: 'Computational Linguistics, Oxford',
        avatarInitials: 'AO',
        timestamp: '4 hours ago',
        content: 'Fascinating implications for language evolution as well. If models are conversing in formal verification intermediate representations rather than natural language tokens, our auditing techniques will have to evolve dramatically.',
        likes: 14,
      },
    ],
  },
  {
    id: 'sec-embodied-robotics',
    slug: 'physical-intelligence-zero-shot-factory-robotics',
    title: 'Zero-Shot Kinematics on the Assembly Line: Humanoid Generalists Transition to Real Factory Operations',
    deck: 'High-frequency tactile feedback arrays and end-to-end vision-language-action policies have enabled bipedal humanoids to execute dexterous manufacturing tasks without per-station programming.',
    category: 'Embodied AI',
    publishedAt: 'October 5, 2026',
    readTime: '6 min read',
    tier: 'secondary',
    author: {
      name: 'Kaito Tanaka',
      role: 'Staff Robotics Correspondent',
      affiliation: 'Tokyo Mechatronics Review',
      avatarInitials: 'KT',
    },
    visualType: 'robotics',
    visualTitle: 'Anthropomorphic Manipulator Kinematic Breakdown',
    visualCaption: 'Fig. 2 — Joint actuation angles and micro-tactile surface arrays during dynamic wire harness routing, demonstrating sub-millimeter positional adjustment at 500 Hz.',
    tags: ['Embodied AI', 'Humanoid Robots', 'Tactile Sensing', 'Zero-Shot Generalization', 'Manufacturing'],
    likes: 218,
    takeaways: [
      'Vision-Language-Action (VLA) models have successfully scaled to 500 Hz continuous physical motor control loops.',
      'Flexible wire-harness manipulation—long the holy grail of robotic assembly—has been solved using high-density optical tactile fingertips.',
      'Factory deployment cycles dropped from six months of robotic programming to a 15-minute video demonstration by human floor supervisors.',
    ],
    contentSections: [
      {
        heading: 'Breaking the Rigidity of Industrial Automation',
        body: 'For five decades, factory robotics meant heavy orange arms bolted to reinforced concrete, cycling through rigid programmed waypoints inside safety cages. If a stamping sheet was rotated by three millimeters, the entire line ground to an emergency halt. Today, in an aerospace assembly plant outside Nagoya, three dozen bipedal generalists walk alongside human technicians, adjusting flexibly to loose bolts, misaligned brackets, and unscripted obstacles in real time.',
      },
      {
        pullQuote: 'The robot no longer executes coordinates; it observes the physical goal state and continuously modulates its muscle torques to fulfill it.',
        pullQuoteAuthor: 'Kaito Tanaka, Robotics Correspondent',
        body: 'The linchpin of this agility is the unification of tactile perception with foundation world models. Rather than relying solely on ceiling cameras and depth sensors, modern robotic hands are wrapped in synthetic skins containing thousands of micro-photometric tactile cells. When the hand grips an elastic rubber seal or a slippery hydraulic hose, it feels the shear stress across its fingertips at 1,000 samples per second, instantly correcting its grasp pressure.',
      },
      {
        heading: 'From Simulation to the Real World in Seconds',
        body: 'In 2024, crossing the "sim-to-real" domain gap required weeks of domain randomization across thousands of virtual GPU environments. In 2026, foundation embodiment models are pretrained on millions of hours of diverse physical physics simulations and human teleoperation data. When introduced to a novel cable assembly station, the robot observes a human technician complete the task twice, asks clarifying verbal questions regarding safety clearance, and begins production immediately.',
      },
    ],
    comments: [
      {
        id: 'c-3',
        author: 'Claire Dupont',
        role: 'Operations Director, NexaMotors',
        avatarInitials: 'CD',
        timestamp: '1 day ago',
        content: 'We integrated our first pilot batch last month. The fact that the robots can adapt when parts are slightly out of tolerance without our engineers touching a line of code is game-changing.',
        likes: 12,
      },
    ],
  },
  {
    id: 'sec-silicon-photonic',
    slug: '2-gigawatt-datacenter-paradigm-photonic-compute',
    title: 'The 2-Gigawatt Datacenter Paradigm: Photonic Interconnects and Liquid Silicon Wafer-Scale Engines',
    deck: 'With electrical copper interconnects slamming into the thermal and bandwidth wall, optical waveguides etched directly onto silicon wafers are powering the next leap in trillion-parameter training clusters.',
    category: 'Silicon & Compute',
    publishedAt: 'October 4, 2026',
    readTime: '7 min read',
    tier: 'secondary',
    author: {
      name: 'Nikhil Bharadwaj',
      role: 'Hardware Architecture Analyst',
      affiliation: 'Semiconductor Insights',
      avatarInitials: 'NB',
    },
    visualType: 'silicon',
    visualTitle: 'Co-Packaged Optics and Waveguide Topology',
    visualCaption: 'Fig. 3 — Optical interconnect routing directly on compute die, showing sub-wavelength silicon modulators that bypass resistive copper traces and eliminate electrical serialization bottlenecks.',
    tags: ['Co-Packaged Optics', 'Photonic Compute', 'Datacenter Infrastructure', 'Silicon Wafer', 'Thermal Management'],
    likes: 189,
    takeaways: [
      'Copper wiring inside datacenter racks has reached physical thermal limits; optical fibers now route photons directly to the processor package.',
      'Wafer-scale engines now achieve 128 Terabits/sec optical throughput per package at 1/10th the power consumption of electrical retimers.',
      'Substation-scale datacenters are being co-located with dedicated nuclear microreactors and geothermal wells to sustain 2-gigawatt continuous workloads.',
    ],
    contentSections: [
      {
        heading: 'The End of the Copper Era',
        body: 'Over the past three decades, electrical engineers managed to push copper wire speeds from megabits to hundreds of gigabits. But at 224 Gbps per lane, standard copper traces turn into high-resistance heaters. Inside massive training superclusters, more energy was being burned merely shuffling tensor gradients between adjacent chassis than in executing the floating-point arithmetic itself.',
      },
      {
        body: 'The transition to Co-Packaged Optics (CPO) and all-photonic backplanes has dismantled this barrier. By integrating microscopic lasers and silicon Mach-Zehnder optical modulators directly onto the substrate alongside the compute cores, data now travels as modulated wavelengths of light through microscopic glass waveguides.',
      },
      {
        pullQuote: 'A cluster of 100,000 accelerators connected by photonics behaves as though it were a single contiguous monolithic processor.',
        pullQuoteAuthor: 'Nikhil Bharadwaj, Semiconductor Insights',
        body: 'The implications for model architecture are profound. For years, AI researchers were constrained by the dreaded communication penalty of distributed pipeline parallelism. With photonic latency reduced to the speed of light in glass (sub-picosecond round trips), neural networks with 50-million-token active working memory can distribute KV caches seamlessly across square kilometers of hardware without experiencing memory stalls.',
      },
    ],
    comments: [
      {
        id: 'c-4',
        author: 'Soren Lindqvist',
        role: 'Datacenter Systems Engineer',
        avatarInitials: 'SL',
        timestamp: '3 days ago',
        content: 'The liquid immersion coupled with optical interconnects has completely changed rack topology. We are no longer constrained by cable radius or signal degradation over a few meters.',
        likes: 9,
      },
    ],
  },
  {
    id: 'sec-generative-biology',
    slug: 'de-novo-molecular-architecture-multimodal-enzymes',
    title: 'De Novo Molecular Architecture: Multimodal Foundation Systems Synthesize Carbon-Fixing Enzymes',
    deck: 'Moving beyond natural evolutionary scaffolds, generative diffusion models in structural biology have engineered custom biocatalysts that capture carbon and digest microplastics with atomic precision.',
    category: 'Bio & Science',
    publishedAt: 'October 3, 2026',
    readTime: '6 min read',
    tier: 'secondary',
    author: {
      name: 'Dr. Soraya Mir',
      role: 'Principal Investigator in Synthetic Biology',
      affiliation: 'Institute for Molecular Generative Systems',
      avatarInitials: 'SM',
    },
    visualType: 'biology',
    visualTitle: 'Synthetic Catalytic Cavity & Hydrogen Bonding Lattice',
    visualCaption: 'Fig. 4 — De novo helical protein backbone generated via structural diffusion, illustrating the positioning of catalytic triad residues with sub-Angstrom binding affinity.',
    tags: ['De Novo Protein Design', 'Generative Biology', 'Structural Diffusion', 'Enzyme Catalysis', 'Climate Tech'],
    likes: 274,
    takeaways: [
      'Generative AI models now routinely design functional proteins with amino acid sequences unseen in the 4-billion-year history of terrestrial life.',
      'A novel carbon-fixing biocatalyst designed in silico demonstrates an 18-fold higher turnover rate than plant Rubisco.',
      'Wet-lab automated synthesis pipelines can express, purify, and assay computational designs in less than 72 hours.',
    ],
    contentSections: [
      {
        heading: 'Beyond the Evolutionary Sandbox',
        body: 'For billions of years, biological enzymes were sculpted through the blind, incremental trial of natural selection. If an organism required an enzyme to break down a toxic molecule, it could only mutate what it already possessed. In synthetic biology laboratories today, that limitation no longer exists. Generative structural models work in reverse: scientists specify the exact chemical transition state they wish to catalyze, and the algorithm constructs the atomic scaffold required to stabilize it.',
      },
      {
        body: 'Last week, researchers published the complete characterization of SynCat-9, an artificial enzyme designed specifically to bind atmospheric carbon dioxide and convert it into stable bicarbonate salts at room temperature. Tested in bioreactor pilots, SynCat-9 functions with an efficiency that eclipses natural photosynthetic enzymes by more than an order of magnitude.',
      },
    ],
    comments: [
      {
        id: 'c-5',
        author: 'Dr. Jeremy Weiss',
        role: 'Senior Chemist, BioFuture',
        avatarInitials: 'JW',
        timestamp: '3 days ago',
        content: 'What took our department three years of directed evolution can now be generated on a cluster over a weekend. The speed of the wet-lab validation feedback loop is astounding.',
        likes: 15,
      },
    ],
  },
  {
    id: 'disp-agent-swarms',
    slug: 'the-swarm-architecture-enterprise-software-agent-collectives',
    title: 'The Swarm Architecture: How Enterprise Software Collapsed into Multi-Agent Orchestration',
    deck: 'Monolithic enterprise applications are being superseded by autonomous agent swarms that coordinate asynchronous workflows, write their own internal tools, and resolve cross-departmental friction.',
    category: 'Autonomous Agents',
    publishedAt: 'October 2, 2026',
    readTime: '5 min read',
    tier: 'dispatch',
    author: {
      name: 'Julian Thorne',
      role: 'Enterprise Technology Editor',
      affiliation: 'The Software Dispatch',
      avatarInitials: 'JT',
    },
    visualType: 'agents',
    visualTitle: 'Autonomous Agent Consensus DAG',
    visualCaption: 'Fig. 5 — Dynamic workflow routing between planning orchestrators, code synthesis workers, and automated audit verifiers.',
    tags: ['Autonomous Agents', 'Multi-Agent Systems', 'Enterprise Software', 'Workflow Automation'],
    likes: 165,
    takeaways: [
      'SaaS platforms are migrating from point-and-click GUIs to intent-driven multi-agent protocols.',
      'Agent teams use specialized consensus voting to prevent rogue actions and verify enterprise compliance.',
    ],
    contentSections: [
      {
        heading: 'The Dissolution of the Application Interface',
        body: 'For three decades, knowledge workers spent their days navigating dashboards, filling forms, and manually copying parameters between CRM systems and inventory databases. In high-performing organizations today, these dashboards are going dormant. Instead, users articulate intent in high-level briefs, and distributed swarms of specialized micro-agents decompose the task, allocate sub-responsibilities, execute necessary database queries, and deliver finished deliverables for sign-off.',
      },
    ],
    comments: [],
  },
  {
    id: 'disp-spatial-world-models',
    slug: 'spatial-world-models-real-time-3d-physics',
    title: 'Spatial World Models: Real-Time 3D Physics and the Convergence of Generative Video and Robotics',
    deck: 'Video generation models have evolved beyond superficial pixel prediction into full four-dimensional simulator engines capable of anticipating collisions, friction, and object permanence.',
    category: 'Frontier Models',
    publishedAt: 'October 1, 2026',
    readTime: '5 min read',
    tier: 'dispatch',
    author: {
      name: 'Miriam Stern',
      role: 'Computer Vision Editor',
      affiliation: 'Spatial Intelligence Review',
      avatarInitials: 'MS',
    },
    visualType: 'vision',
    visualTitle: '3D Spatial Coordinate Voxel Map',
    visualCaption: 'Fig. 6 — Real-time raycasting and physics prediction vectors generated from single monocular video streams.',
    tags: ['World Models', 'Spatial Intelligence', 'Computer Vision', 'Generative Video'],
    likes: 142,
    takeaways: [
      'Next-generation video architectures maintain strict internal geometry and physics consistency across long durations.',
      'Robotics simulators now generate photorealistic synthetic training environments on the fly.',
    ],
    contentSections: [
      {
        heading: 'From Flat Pixels to Physical Law',
        body: 'Early generative video amazed observers with cinematic fidelity, but quickly fell apart under physical scrutiny: cars turned into clouds, cups of water phase-shifted through tables, and gravity was a suggestion. The latest spatial engines incorporate explicit geometric priors and physical loss functions, generating virtual worlds that behave according to the laws of Newtonian mechanics.',
      },
    ],
    comments: [],
  },
  {
    id: 'disp-compute-governance',
    slug: 'frontier-treaty-2026-balancing-compute-governance',
    title: 'The Global Compute Threshold Treaty: Enforcing Cryptographic Audits on Frontier Superclusters',
    deck: 'How international delegates and semiconductor foundries agreed on hardware-enforced telemetry standards to audit sovereign frontier models without violating commercial secrets.',
    category: 'Policy & Governance',
    publishedAt: 'September 29, 2026',
    readTime: '6 min read',
    tier: 'dispatch',
    author: {
      name: 'Arthur Pendelton',
      role: 'Global Technology Policy Fellow',
      affiliation: 'Hague Center for Strategic AI Studies',
      avatarInitials: 'AP',
    },
    visualType: 'neural-network',
    visualTitle: 'Zero-Knowledge Compute Attestation Hierarchy',
    visualCaption: 'Fig. 7 — Cryptographic proof flow certifying power expenditure and floating-point bounds without exposing model proprietary weights.',
    tags: ['AI Governance', 'Compute Thresholds', 'Hardware Security', 'Zero-Knowledge Proofs', 'International Law'],
    likes: 198,
    takeaways: [
      'Foundry-level security chips embed immutable cryptographic counters to verify total FLOPs run during training runs.',
      'Zero-knowledge attestation allows sovereign auditors to verify safety standards without inspecting confidential weights.',
    ],
    contentSections: [
      {
        heading: 'Verification Without Espionage',
        body: 'The central dilemma of global AI regulation has always been verification: how can nations confirm that rival frontier labs are not secretly training dangerous models beyond catastrophic risk thresholds without demanding access to proprietary model weights and training datasets? The answer emerged from applied cryptography and secure hardware enclaves.',
      },
    ],
    comments: [],
  },
];
