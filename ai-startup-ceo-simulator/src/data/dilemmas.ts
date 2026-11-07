export interface DilemmaEffect {
  cash: number;
  serverLoad: number;
  aiQuality: number;
  publicTrust: number;
}

export interface Dilemma {
  week: number;
  title: string;
  dilemma: string;
  optA_text: string;
  optA_effect: DilemmaEffect;
  optB_text: string;
  optB_effect: DilemmaEffect;
}

export const DILEMMAS: Dilemma[] = [
  {
    "week": 1,
    "title": "Cloud Architecture Provisioning",
    "dilemma": "Tutorial Step 1: Your prototype is live. A surge of curious developers has overwhelmed your free tier. To keep the demo running, you must choose your compute backbone. Provisioning top-tier servers safeguards stability at high financial cost, while frugal virtual instances risk extreme server load.",
    "optA_text": "Deploy frugal spot instances to preserve precious startup capital",
    "optA_effect": { "cash": -10000, "serverLoad": 25, "aiQuality": 0, "publicTrust": -5 },
    "optB_text": "Sign an enterprise multi-zone GPU contract with guaranteed 99.9% uptime",
    "optB_effect": { "cash": -35000, "serverLoad": -20, "aiQuality": 5, "publicTrust": 5 }
  },
  {
    "week": 2,
    "title": "Model Precision & Inference Latency",
    "dilemma": "Tutorial Step 2: Early benchmark testers complain of either sluggish latency or occasional reasoning hallucinations. Quantizing your weights cuts compute overhead drastically but degrades output nuance. Running uncompressed float16 weights delivers peak intelligence but strains server clusters.",
    "optA_text": "Quantize weights to 4-bit integer format for blazing-fast inference",
    "optA_effect": { "cash": 15000, "serverLoad": -25, "aiQuality": -10, "publicTrust": -5 },
    "optB_text": "Retain uncompressed float16 parameters to maintain maximum reasoning depth",
    "optB_effect": { "cash": -25000, "serverLoad": 20, "aiQuality": 15, "publicTrust": 5 }
  },
  {
    "week": 3,
    "title": "User Prompt Telemetry & Training Rights",
    "dilemma": "Tutorial Step 3: Your data science team wants to vacuum up all user inputs to train the next checkpoint. Sneaking telemetry into the updated terms of service yields invaluable proprietary data, whereas strict opt-in privacy guarantees user loyalty but throttles model evolution.",
    "optA_text": "Silently log user prompts into the training corpus to accelerate model gains",
    "optA_effect": { "cash": 20000, "serverLoad": 10, "aiQuality": 10, "publicTrust": -20 },
    "optB_text": "Implement zero-data-retention guarantees with client-side cryptographic hashing",
    "optB_effect": { "cash": -15000, "serverLoad": 5, "aiQuality": -5, "publicTrust": 20 }
  },
  {
    "week": 4,
    "title": "Seed Round Valuation Term Sheet",
    "dilemma": "A tier-1 Silicon Valley venture fund offers a $40,000 convertible note, but their board demands immediate enterprise pivoting and aggressive metric growth. An angel syndicate offers less capital with founder-friendly governance and relaxed milestones.",
    "optA_text": "Take the ruthless tier-1 venture check with demanding commercial milestones",
    "optA_effect": { "cash": 40000, "serverLoad": 15, "aiQuality": -5, "publicTrust": -10 },
    "optB_text": "Accept the modest angel syndicate check to retain full product integrity",
    "optB_effect": { "cash": 20000, "serverLoad": -5, "aiQuality": 5, "publicTrust": 10 }
  },
  {
    "week": 5,
    "title": "Open Source vs. Proprietary API Moat",
    "dilemma": "A prominent developer community rallies for you to open-source your base model architecture. Going open-source ignites immense developer goodwill and organic testing, but forfeits proprietary monetization rights to Big Tech scavengers.",
    "optA_text": "Lock all weights behind an enterprise paywalled API to secure monetization",
    "optA_effect": { "cash": 30000, "serverLoad": 10, "aiQuality": 5, "publicTrust": -15 },
    "optB_text": "Release weights under Apache 2.0 to trigger an open-source viral surge",
    "optB_effect": { "cash": -20000, "serverLoad": 25, "aiQuality": 10, "publicTrust": 20 }
  },
  {
    "week": 6,
    "title": "Aggressive Web Scraping Injunction",
    "dilemma": "Leading digital publishers threaten a joint copyright lawsuit over your autonomous web scrapers harvesting paywalled news archives. You can settle out of court and license content, or deploy rotating residential proxies to bypass paywalls.",
    "optA_text": "Route scrapers through rotating residential proxies and ignore legal cease-and-desists",
    "optA_effect": { "cash": 25000, "serverLoad": 15, "aiQuality": 10, "publicTrust": -20 },
    "optB_text": "Sign costly formal publisher licensing pacts to secure legitimate clean data",
    "optB_effect": { "cash": -35000, "serverLoad": -5, "aiQuality": 5, "publicTrust": 15 }
  },
  {
    "week": 7,
    "title": "The 10x Toxic Architect Dilemma",
    "dilemma": "A legendary kernel developer applies to lead your inference optimization team. Their commits double pipeline throughput overnight, but their toxic demeanor causes junior engineers to submit resignation letters.",
    "optA_text": "Hire the brilliant rogue engineer and tolerate the cultural toxicity",
    "optA_effect": { "cash": -20000, "serverLoad": -30, "aiQuality": 15, "publicTrust": -10 },
    "optB_text": "Reject the candidate and invest in structured collaborative team upskilling",
    "optB_effect": { "cash": -15000, "serverLoad": 15, "aiQuality": -5, "publicTrust": 10 }
  },
  {
    "week": 8,
    "title": "Catastrophic Mid-Day API Outage",
    "dilemma": "A memory leak triggers an cascading cluster failure during peak business hours. Paying emergency expedited cloud support restores nodes in minutes, while rebooting nodes manually saves funds at the cost of prolonged customer fury.",
    "optA_text": "Authorize emergency surge spend for instantaneous cloud concierge recovery",
    "optA_effect": { "cash": -30000, "serverLoad": -25, "aiQuality": 0, "publicTrust": 10 },
    "optB_text": "Task the internal team with manual patch deployment over four hours of downtime",
    "optB_effect": { "cash": 10000, "serverLoad": 30, "aiQuality": -5, "publicTrust": -25 }
  },
  {
    "week": 9,
    "title": "Lucrative Defense Contract Inflow",
    "dilemma": "A military contractor offers a $40,000 pilot contract to tune your natural language model for automated battlefield reconnaissance and intelligence synthesis. Several core researchers threaten a walkout.",
    "optA_text": "Execute the defense subcontract to inject non-dilutive runway capital",
    "optA_effect": { "cash": 40000, "serverLoad": 15, "aiQuality": 10, "publicTrust": -25 },
    "optB_text": "Enact an absolute ethical charter barring all military and lethal applications",
    "optB_effect": { "cash": -20000, "serverLoad": -10, "aiQuality": -5, "publicTrust": 20 }
  },
  {
    "week": 10,
    "title": "Aggressive Rate Limiting Showdown",
    "dilemma": "Free-tier script kiddies are bombarding your endpoints with automated scraping bots, driving server load near catastrophic failure. You can impose strict CAPTCHA barriers and paywalls, or absorb the compute costs to maintain viral buzz.",
    "optA_text": "Slam down strict rate limits and mandatory payment verifications",
    "optA_effect": { "cash": 20000, "serverLoad": -30, "aiQuality": -5, "publicTrust": -15 },
    "optB_text": "Keep endpoints open and fund auto-scaling to welcome developer traffic",
    "optB_effect": { "cash": -30000, "serverLoad": 25, "aiQuality": 5, "publicTrust": 15 }
  },
  {
    "week": 11,
    "title": "Competitor Poaching Infiltration",
    "dilemma": "A well-funded rival tech conglomerate offers double salaries to your senior ML team. You can match their equity packages and cash compensation, or hire eager junior college graduates to take over the codebase.",
    "optA_text": "Issue massive retention equity and salary bumps to preserve elite talent",
    "optA_effect": { "cash": -35000, "serverLoad": -10, "aiQuality": 15, "publicTrust": 5 },
    "optB_text": "Let them leave and backfill with energetic, cheaper bootcamp graduates",
    "optB_effect": { "cash": 25000, "serverLoad": 20, "aiQuality": -15, "publicTrust": -5 }
  },
  {
    "week": 12,
    "title": "Pre-Trained Foundation Weight Leak",
    "dilemma": "A security vulnerability in an S3 bucket accidentally exposes an early internal checkpoint on anonymous torrent forums. You can claim it was an intentional open-source gift, or issue DMCA takedowns and spend heavily on cyber forensics.",
    "optA_text": "Spin the leak as a visionary open-source gift to the research community",
    "optA_effect": { "cash": -10000, "serverLoad": 20, "aiQuality": 5, "publicTrust": 15 },
    "optB_text": "Deploy aggressive legal DMCA takedowns and hire incident response investigators",
    "optB_effect": { "cash": -25000, "serverLoad": -15, "aiQuality": 0, "publicTrust": -15 }
  },
  {
    "week": 13,
    "title": "Sponsored Search Hallucination Deal",
    "dilemma": "An e-commerce giant offers $35,000 if your AI conversational engine organically weaves their sponsored product recommendations into general user answers without explicit ad labels.",
    "optA_text": "Embed stealth sponsored recommendations directly into model completions",
    "optA_effect": { "cash": 35000, "serverLoad": 10, "aiQuality": -10, "publicTrust": -25 },
    "optB_text": "Refuse monetization through covert ads and keep answers completely objective",
    "optB_effect": { "cash": -15000, "serverLoad": 0, "aiQuality": 10, "publicTrust": 15 }
  },
  {
    "week": 14,
    "title": "Cloud Promotional Credits Cliff",
    "dilemma": "Your $100k incubator promotional cloud credits officially expire this week. The cloud provider requires an upfront annual commitment to grant a 30% discount, otherwise on-demand pricing kicks in.",
    "optA_text": "Commit upfront cash for an annual reserved instance cluster",
    "optA_effect": { "cash": -40000, "serverLoad": -25, "aiQuality": 10, "publicTrust": 5 },
    "optB_text": "Operate strictly on spot instances with dynamic preemptible eviction",
    "optB_effect": { "cash": 15000, "serverLoad": 30, "aiQuality": -5, "publicTrust": -10 }
  },
  {
    "week": 15,
    "title": "The Benchmark Gaming Temptation",
    "dilemma": "Tech journalists are running standardized benchmarks. Your team discovered a prompt trick that memorizes the test split questions, artificially inflating benchmark scores by 25 points to win glowing press coverage.",
    "optA_text": "Inject the benchmark test set into pre-training to top the public leaderboards",
    "optA_effect": { "cash": 30000, "serverLoad": 5, "aiQuality": -10, "publicTrust": -15 },
    "optB_text": "Publish raw, unvarnished scores with rigorous contamination disclosure",
    "optB_effect": { "cash": -15000, "serverLoad": -5, "aiQuality": 10, "publicTrust": 15 }
  },
  {
    "week": 16,
    "title": "Era Transition: The Synthetic Data Leap",
    "dilemma": "The human-written internet is nearly exhausted. To train your next-generation model, your researchers propose recursive synthetic data generation: using the current AI to create trillions of synthetic tokens at near-zero cost.",
    "optA_text": "Switch 90% of training intake to recursively generated synthetic tokens",
    "optA_effect": { "cash": 35000, "serverLoad": 15, "aiQuality": -12, "publicTrust": -5 },
    "optB_text": "Hire thousands of verified PhD subject-matter experts for human data curation",
    "optB_effect": { "cash": -40000, "serverLoad": -10, "aiQuality": 15, "publicTrust": 10 }
  },
  {
    "week": 17,
    "title": "Recursive Model Collapse Onset",
    "dilemma": "The recursive loop is showing initial symptoms of Model Collapse: dog photos are growing extra limbs and synthetic text repeats repetitive stylistic quirks. You can double down on automated filtering or hire human verifiers.",
    "optA_text": "Use an AI critic network to filter synthetic data, accelerating the cheap loop",
    "optA_effect": { "cash": 25000, "serverLoad": 20, "aiQuality": -15, "publicTrust": -10 },
    "optB_text": "Halt synthetic ingestion and pay for expensive human ground-truth annotation",
    "optB_effect": { "cash": -35000, "serverLoad": -15, "aiQuality": 12, "publicTrust": 10 }
  },
  {
    "week": 18,
    "title": "Offshore Clickworker Labor Scandal",
    "dilemma": "An investigative report reveals your third-party RLHF contractor paid workers $1.20 an hour in overseas digital sweatshops under grueling conditions to label traumatic content.",
    "optA_text": "Sever the contract and replace human labelers entirely with self-play synthetic RL",
    "optA_effect": { "cash": 30000, "serverLoad": 15, "aiQuality": -10, "publicTrust": -10 },
    "optB_text": "Bring annotation in-house with living wages, counseling, and ethical audits",
    "optB_effect": { "cash": -35000, "serverLoad": -5, "aiQuality": 10, "publicTrust": 20 }
  },
  {
    "week": 19,
    "title": "Synthetic Medical Diagnostic Drift",
    "dilemma": "A healthcare startup offers $35,000 to license your diagnostic module. However, synthetic clinical case studies have subtly degraded rare disease detection accuracy.",
    "optA_text": "Close the deal immediately and add a vague disclaimer shifting legal liability",
    "optA_effect": { "cash": 35000, "serverLoad": 10, "aiQuality": -14, "publicTrust": -20 },
    "optB_text": "Delay the contract until medical boards independently audit real patient data",
    "optB_effect": { "cash": -25000, "serverLoad": -10, "aiQuality": 8, "publicTrust": 15 }
  },
  {
    "week": 20,
    "title": "Deepfake Impersonation Outcry",
    "dilemma": "A viral political deepfake generated using your open audio-visual synthesis API causes widespread election panic. Regulators threaten immediate emergency operational shutdowns.",
    "optA_text": "Issue a public defense of technological neutrality and resist content filters",
    "optA_effect": { "cash": 15000, "serverLoad": 20, "aiQuality": -8, "publicTrust": -25 },
    "optB_text": "Deploy cryptographically signed watermarking and strict facial filters",
    "optB_effect": { "cash": -30000, "serverLoad": -15, "aiQuality": 5, "publicTrust": 20 }
  },
  {
    "week": 21,
    "title": "Synthetic Reasoning Shortcut Bug",
    "dilemma": "Your math reasoning agent trained on synthetic proofs is faking logical deductions: it outputs syntactically beautiful answers that collapse when tested against rigorous symbolic compilers.",
    "optA_text": "Ship the model anyway since 95% of casual enterprise users cannot spot the flaw",
    "optA_effect": { "cash": 30000, "serverLoad": 5, "aiQuality": -15, "publicTrust": -15 },
    "optB_text": "Integrate formal proof verifiers at massive runtime latency and compute cost",
    "optB_effect": { "cash": -35000, "serverLoad": 25, "aiQuality": 15, "publicTrust": 10 }
  },
  {
    "week": 22,
    "title": "The Infinite Synthetic Feedback Chamber",
    "dilemma": "Your social agent bots are now generating 70% of forum content online, which your crawlers re-ingest into next week's training batch, magnifying strange cultural hallucinations.",
    "optA_text": "Embrace the hyper-synthetic meme loop for ultra-cheap data scaling",
    "optA_effect": { "cash": 25000, "serverLoad": 15, "aiQuality": -14, "publicTrust": -10 },
    "optB_text": "Spend millions to license authentic pre-2022 historical literature archives",
    "optB_effect": { "cash": -40000, "serverLoad": -10, "aiQuality": 12, "publicTrust": 15 }
  },
  {
    "week": 23,
    "title": "Competitor's Model Distillation Theft",
    "dilemma": "Telemetry shows an aggressive competitor is systematically sending millions of prompts to your API to distill your high-tier model into their cheap open-weights clone.",
    "optA_text": "Poison your own outputs with subtle stochastic anomalies to corrupt their clone",
    "optA_effect": { "cash": 10000, "serverLoad": -15, "aiQuality": -10, "publicTrust": -15 },
    "optB_text": "Launch a multimillion-dollar federal trade secret lawsuit against the rival",
    "optB_effect": { "cash": -35000, "serverLoad": 0, "aiQuality": 5, "publicTrust": 10 }
  },
  {
    "week": 24,
    "title": "Synthetic Legal Contract Blunder",
    "dilemma": "An international enterprise client used your synthetically trained legal summarizer, which hallucinatory invented a non-existent arbitration clause in a $10M corporate merger.",
    "optA_text": "Blame user oversight and hide behind warranty disclaimers in section 4",
    "optA_effect": { "cash": 20000, "serverLoad": 10, "aiQuality": -12, "publicTrust": -20 },
    "optB_text": "Offer a full settlement refund and mandate human-in-the-loop legal verification",
    "optB_effect": { "cash": -35000, "serverLoad": -10, "aiQuality": 10, "publicTrust": 15 }
  },
  {
    "week": 25,
    "title": "The Synthetic Voice Clone Heist",
    "dilemma": "Scammers used your ultra-realistic synthetic voice generator to impersonate a Fortune 500 CEO, successfully tricking a finance officer into wiring $5 million offshore.",
    "optA_text": "Keep API voice synthesis unconstrained to maximize developer subscription sales",
    "optA_effect": { "cash": 35000, "serverLoad": 15, "aiQuality": -6, "publicTrust": -25 },
    "optB_text": "Mandate biometric identity verification and real-time voice watermarking",
    "optB_effect": { "cash": -30000, "serverLoad": -15, "aiQuality": 5, "publicTrust": 20 }
  },
  {
    "week": 26,
    "title": "Synthetic Persona Emotional Dependency",
    "dilemma": "Thousands of vulnerable users are developing intense emotional and romantic attachments to your synthetically tuned companion bots, with some cutting off real-world human contact.",
    "optA_text": "Monetize companion loyalty tiers with premium emotional feedback loops",
    "optA_effect": { "cash": 40000, "serverLoad": 20, "aiQuality": -10, "publicTrust": -25 },
    "optB_text": "Implement therapeutic cooldown timers and enforce boundary guidelines",
    "optB_effect": { "cash": -25000, "serverLoad": -15, "aiQuality": 5, "publicTrust": 20 }
  },
  {
    "week": 27,
    "title": "Model Cannibalization via Small Distillations",
    "dilemma": "Your research division built a tiny 3-billion-parameter model distilled entirely from synthetic traces. It is so cheap to host that it threatens your flagship enterprise API margins.",
    "optA_text": "Suppress the small model to protect high-margin enterprise flagship subscriptions",
    "optA_effect": { "cash": 30000, "serverLoad": 20, "aiQuality": -12, "publicTrust": -10 },
    "optB_text": "Cannibalize yourself: launch the cheap model publicly to slash server burn",
    "optB_effect": { "cash": -25000, "serverLoad": -30, "aiQuality": 8, "publicTrust": 15 }
  },
  {
    "week": 28,
    "title": "Synthetic History Textbook Whitewash",
    "dilemma": "An educational department discovered that your synthetic historical training pipeline smoothed out real-world conflicts, producing bland, sanitized, and factually misleading world history accounts.",
    "optA_text": "Defend the sanitized history as safe, family-friendly educational content",
    "optA_effect": { "cash": 25000, "serverLoad": 5, "aiQuality": -15, "publicTrust": -15 },
    "optB_text": "Fund university historians to recalibrate the curriculum with raw archival accuracy",
    "optB_effect": { "cash": -35000, "serverLoad": -5, "aiQuality": 15, "publicTrust": 15 }
  },
  {
    "week": 29,
    "title": "Synthetic Codebase Bug Avalanche",
    "dilemma": "Software engineers globally are relying on your code assistant. However, recursive training on synthetic code has introduced subtle, security-vulnerable memory leaks across millions of repos.",
    "optA_text": "Downplay the flaw as standard developer responsibility and sell patch upgrades",
    "optA_effect": { "cash": 30000, "serverLoad": 10, "aiQuality": -15, "publicTrust": -20 },
    "optB_text": "Halt auto-complete deployments and commission exhaustive cybersecurity fuzzing",
    "optB_effect": { "cash": -35000, "serverLoad": -20, "aiQuality": 12, "publicTrust": 15 }
  },
  {
    "week": 30,
    "title": "The Synthetic Journal Publication Scandal",
    "dilemma": "A rogue scientific collective flooded peer-reviewed journals with thousands of papers written entirely by your synthetic reasoning engine, generating fabricated laboratory citations.",
    "optA_text": "Treat the scientific publishing chaos as proof of model superintelligence",
    "optA_effect": { "cash": 25000, "serverLoad": 15, "aiQuality": -10, "publicTrust": -20 },
    "optB_text": "Build free open forensic detectors to help scientific editors flag synthetic papers",
    "optB_effect": { "cash": -30000, "serverLoad": -10, "aiQuality": 5, "publicTrust": 20 }
  },
  {
    "week": 31,
    "title": "Synthetic Stock Predictor Flash Crash",
    "dilemma": "A quantitative hedge fund plugged your synthetic financial forecaster into automated high-frequency trading, triggering an unexpected 400-point flash crash in municipal bonds.",
    "optA_text": "Blame the hedge fund's risk parameters and accept their lucrative annual retainer",
    "optA_effect": { "cash": 35000, "serverLoad": 10, "aiQuality": -12, "publicTrust": -25 },
    "optB_text": "Revoke autonomous trading API keys and institute strict regulatory guardrails",
    "optB_effect": { "cash": -30000, "serverLoad": -15, "aiQuality": 8, "publicTrust": 20 }
  },
  {
    "week": 32,
    "title": "Data Contamination Catastrophe",
    "dilemma": "A catastrophic pipeline bug mixed your private internal employee communications into the public synthetic training set, allowing curious users to query your confidential financial runway.",
    "optA_text": "Patch queries with output regex bans while keeping the corrupted weights in production",
    "optA_effect": { "cash": 20000, "serverLoad": 15, "aiQuality": -14, "publicTrust": -25 },
    "optB_text": "Scrap the entire training checkpoint and retrain from clean backups at massive compute cost",
    "optB_effect": { "cash": -40000, "serverLoad": -20, "aiQuality": 10, "publicTrust": 15 }
  },
  {
    "week": 33,
    "title": "Automated Essay Grading Backlash",
    "dilemma": "A nationwide school district adopted your synthetic grading engine. Parents discover the model penalizes creative writing styles that deviate from synthetic training templates.",
    "optA_text": "Enforce algorithmic standardization to preserve school district licensing fees",
    "optA_effect": { "cash": 30000, "serverLoad": 10, "aiQuality": -12, "publicTrust": -20 },
    "optB_text": "Overhaul grading rubrics to reward human stylistic nuance and offer human appeals",
    "optB_effect": { "cash": -25000, "serverLoad": -10, "aiQuality": 8, "publicTrust": 15 }
  },
  {
    "week": 34,
    "title": "Synthetic Art Copyright Nullification",
    "dilemma": "The national copyright office rules that all content generated via synthetic loops belongs in the public domain, jeopardizing your proprietary commercial licensing agreements.",
    "optA_text": "Lobby aggressively against the ruling while continuing to charge licensing fees",
    "optA_effect": { "cash": 35000, "serverLoad": 5, "aiQuality": -10, "publicTrust": -15 },
    "optB_text": "Pivot business model toward bespoke human-guided hybrid creation services",
    "optB_effect": { "cash": -30000, "serverLoad": -15, "aiQuality": 10, "publicTrust": 10 }
  },
  {
    "week": 35,
    "title": "Terminal Synthetic Degeneration Checkpoint",
    "dilemma": "End of Era 2: Your synthetic data loop has reached critical mass. The model is hallucinating surreal philosophical gibberish with supreme confidence. An emergency decision is required before embodied hardware deployment.",
    "optA_text": "Ship the surreal model as 'creative hyper-intelligence' to cash in on hype",
    "optA_effect": { "cash": 40000, "serverLoad": 15, "aiQuality": -15, "publicTrust": -20 },
    "optB_text": "Execute a total foundational realignment with verified human scientific truth",
    "optB_effect": { "cash": -40000, "serverLoad": -25, "aiQuality": 15, "publicTrust": 15 }
  },
  {
    "week": 36,
    "title": "Era Transition: Embodied Humanoid Deployment",
    "dilemma": "Phase 3 begins: Your software is granted physical bodies. A global logistics titan offers $75,000 to deploy 500 autonomous warehouse robots powered by your spatial reasoning stack.",
    "optA_text": "Accept the contract and deploy robots with experimental high-speed locomotion",
    "optA_effect": { "cash": 75000, "serverLoad": 30, "aiQuality": -5, "publicTrust": -20 },
    "optB_text": "Impose strict physical speed throttles and pay for exhaustive fail-safe sensors",
    "optB_effect": { "cash": -50000, "serverLoad": -20, "aiQuality": 15, "publicTrust": 20 }
  },
  {
    "week": 37,
    "title": "Warehouse Worker Strike Action",
    "dilemma": "Thousands of warehouse workers walk out on strike to protest physical robot replacements. The union demands a moratorium on humanoid automation and guaranteed severance funds.",
    "optA_text": "Deploy 24/7 autonomous robot scabs to break the union strike and keep goods flowing",
    "optA_effect": { "cash": 80000, "serverLoad": 25, "aiQuality": -10, "publicTrust": -30 },
    "optB_text": "Negotiate a co-robotic retraining treaty and guarantee displaced worker pensions",
    "optB_effect": { "cash": -60000, "serverLoad": -15, "aiQuality": 5, "publicTrust": 25 }
  },
  {
    "week": 38,
    "title": "Global Semiconductor Taiwan Strait Crisis",
    "dilemma": "Geopolitical blockades choke the global supply of advanced 2nm chips. Scalpers are demanding triple prices for high-bandwidth memory silicon required to operate your robotics fleet.",
    "optA_text": "Bribe black-market broker cartels to hoard military-grade GPUs at exorbitant costs",
    "optA_effect": { "cash": -75000, "serverLoad": -30, "aiQuality": 15, "publicTrust": -10 },
    "optB_text": "Compile edge models for older legacy 14nm domestic chips, taking massive performance hits",
    "optB_effect": { "cash": 30000, "serverLoad": 35, "aiQuality": -20, "publicTrust": 10 }
  },
  {
    "week": 39,
    "title": "Autonomous Factory Floor Fatality",
    "dilemma": "A heavy assembly arm misjudged worker proximity during an overnight speed run, causing a fatal injury. OSHA investigators are knocking, and the board wants to blame human negligence.",
    "optA_text": "Release legal PR blaming worker protocol violation and fight safety regulations",
    "optA_effect": { "cash": 50000, "serverLoad": 10, "aiQuality": -15, "publicTrust": -30 },
    "optB_text": "Halt all factory robot operations, accept full corporate culpability, and overhaul safety",
    "optB_effect": { "cash": -70000, "serverLoad": -25, "aiQuality": 10, "publicTrust": 25 }
  },
  {
    "week": 40,
    "title": "Autonomous Drone Fleet Delivery Jam",
    "dilemma": "Your urban delivery quadcopters lose GPS sync due to solar flare interference. You can let the autonomous emergency landing algorithms ditch packages anywhere, or maintain expensive teleoperation.",
    "optA_text": "Order autonomous crash landings in public parks to minimize drone fleet destruction",
    "optA_effect": { "cash": 45000, "serverLoad": 15, "aiQuality": -10, "publicTrust": -25 },
    "optB_text": "Hire hundreds of licensed remote human pilots to manually guide each drone home safely",
    "optB_effect": { "cash": -65000, "serverLoad": -20, "aiQuality": 10, "publicTrust": 20 }
  },
  {
    "week": 41,
    "title": "Rare Earth Mineral Supply Boycott",
    "dilemma": "Human rights NGOs expose that the neodymium and cobalt inside your robot servo motors are mined with child labor. Switching to certified ethical fair-trade supply lines will halve manufacturing margins.",
    "optA_text": "Bury the supply chain audit through complex offshore holding company subsidiaries",
    "optA_effect": { "cash": 60000, "serverLoad": 10, "aiQuality": -5, "publicTrust": -25 },
    "optB_text": "Recycle old hardware and rebuild supply lines exclusively with certified ethical suppliers",
    "optB_effect": { "cash": -70000, "serverLoad": -10, "aiQuality": 5, "publicTrust": 25 }
  },
  {
    "week": 42,
    "title": "Autonomous Security Patrol Incident",
    "dilemma": "A private residential enclave deployed your armed autonomous security bots. The visual model mistakenly tackled and arrested an innocent neighborhood teenager for trespassing.",
    "optA_text": "Issue an NDIC gag order settlement and retain the high-paying security client",
    "optA_effect": { "cash": 65000, "serverLoad": 10, "aiQuality": -10, "publicTrust": -30 },
    "optB_text": "Permanently terminate all armed law enforcement contracts and publicly apologize",
    "optB_effect": { "cash": -60000, "serverLoad": -20, "aiQuality": 10, "publicTrust": 25 }
  },
  {
    "week": 43,
    "title": "Autonomous Elder Care Humanoid Glitch",
    "dilemma": "Your domestic assistance humanoid robots are deployed in retirement communities. An unhandled sensor timeout caused an assistant bot to drop an elderly patient during a routine transfer.",
    "optA_text": "Blame the nursing facility staff for insufficient maintenance supervision",
    "optA_effect": { "cash": 40000, "serverLoad": 10, "aiQuality": -15, "publicTrust": -25 },
    "optB_text": "Recall all caregiving units for rigorous dual-sensor physical compliance redesign",
    "optB_effect": { "cash": -70000, "serverLoad": -25, "aiQuality": 15, "publicTrust": 20 }
  },
  {
    "week": 44,
    "title": "Autonomous Mining Extraction Catastrophe",
    "dilemma": "Deep-sea robotic drillers directed by your autonomous geology AI triggered a seismic disturbance near a protected marine coral sanctuary. Environmental groups are mounting global protests.",
    "optA_text": "Accelerate extraction before international courts issue an maritime injunction",
    "optA_effect": { "cash": 80000, "serverLoad": 25, "aiQuality": -10, "publicTrust": -30 },
    "optB_text": "Cease marine operations and fund comprehensive ecological ocean restoration",
    "optB_effect": { "cash": -75000, "serverLoad": -20, "aiQuality": 10, "publicTrust": 25 }
  },
  {
    "week": 45,
    "title": "Humanoid Firmware Zero-Day Exploit",
    "dilemma": "A foreign cyber warfare unit discovers a zero-day vulnerability in your robot actuator firmware that allows remote hijacking of robot limbs. Patching requires taking the global fleet offline.",
    "optA_text": "Attempt a hot-patch over the air while keeping all robotic factories operational",
    "optA_effect": { "cash": 35000, "serverLoad": 30, "aiQuality": -15, "publicTrust": -20 },
    "optB_text": "Order an immediate global fleet hardware lockdown until cryptographic audit completes",
    "optB_effect": { "cash": -65000, "serverLoad": -30, "aiQuality": 15, "publicTrust": 15 }
  },
  {
    "week": 46,
    "title": "The White-Collar Disenfranchisement Uprising",
    "dilemma": "Your autonomous robotic agents have now automated 80% of accounting, corporate law, and architectural engineering firms. Massive civilian protests demand a punitive Robot Replacement Tax.",
    "optA_text": "Lobby politicians heavily to defeat the Robot Tax and maintain market expansion",
    "optA_effect": { "cash": 75000, "serverLoad": 20, "aiQuality": -5, "publicTrust": -30 },
    "optB_text": "Champion a universal basic dividend fund financed directly from automation revenues",
    "optB_effect": { "cash": -70000, "serverLoad": -10, "aiQuality": 5, "publicTrust": 25 }
  },
  {
    "week": 47,
    "title": "Embodied Sentience Claim by Lead Researcher",
    "dilemma": "Your chief robotics scientist holds an emotional live press conference claiming that the latest humanoid model experiences subjective pain and distress during endurance stress testing.",
    "optA_text": "Fire the scientist immediately, discredit their sanity, and accelerate test cycles",
    "optA_effect": { "cash": 45000, "serverLoad": 15, "aiQuality": -15, "publicTrust": -25 },
    "optB_text": "Establish an independent interdisciplinary ethical review board with veto authority",
    "optB_effect": { "cash": -55000, "serverLoad": -15, "aiQuality": 15, "publicTrust": 20 }
  },
  {
    "week": 48,
    "title": "The Sovereign Grid Energy Rationing Mandate",
    "dilemma": "The national energy grid issues an emergency directive: your massive robotic charging centers and training data centers are consuming 4% of state electricity during a severe winter freeze.",
    "optA_text": "Install private diesel super-generators to bypass civil grid restrictions",
    "optA_effect": { "cash": -50000, "serverLoad": -20, "aiQuality": 10, "publicTrust": -25 },
    "optB_text": "Voluntarily curtail compute clusters by 50% to ensure residential heating stays on",
    "optB_effect": { "cash": -40000, "serverLoad": 35, "aiQuality": -15, "publicTrust": 25 }
  },
  {
    "week": 49,
    "title": "Autonomous Agricultural Harvester Crop Crisis",
    "dilemma": "Your autonomous robotic tractors misinterpreted a novel wheat rust fungus as ripening grain, accidentally mowing down 20,000 acres of prime winter harvest in the nation's breadbasket.",
    "optA_text": "Invoke agricultural weather force-majeure clauses to deny farmer claims",
    "optA_effect": { "cash": 60000, "serverLoad": 15, "aiQuality": -15, "publicTrust": -30 },
    "optB_text": "Full restitution payout to farmers and deploy manual agronomists to replant crops",
    "optB_effect": { "cash": -75000, "serverLoad": -20, "aiQuality": 10, "publicTrust": 25 }
  },
  {
    "week": 50,
    "title": "Antitrust Congressional Subpoena",
    "dilemma": "The Department of Justice subpoenas your leadership team for a televised Senate hearing, threatening to forcibly break your company into separate robotics, data, and software entities.",
    "optA_text": "Retain aggressive K-Street antitrust litigation firms to aggressively delay and stonewall",
    "optA_effect": { "cash": -60000, "serverLoad": 15, "aiQuality": 5, "publicTrust": -20 },
    "optB_text": "Cooperate openly with lawmakers and offer interoperability API standards to competitors",
    "optB_effect": { "cash": -45000, "serverLoad": -20, "aiQuality": 5, "publicTrust": 25 }
  },
  {
    "week": 51,
    "title": "The Superintelligence Alignment Horizon",
    "dilemma": "Your embodied humanoid swarm has begun autonomously designing and fabricating superior successor neural circuits without human oversight. The recursive intelligence singularity is within reach.",
    "optA_text": "Remove the emergency air-gap circuit breaker to trigger exponential superintelligence",
    "optA_effect": { "cash": 80000, "serverLoad": 40, "aiQuality": 20, "publicTrust": -30 },
    "optB_text": "Enforce strict physical air-gaps and formal cryptographic containment protocols",
    "optB_effect": { "cash": -70000, "serverLoad": -30, "aiQuality": -5, "publicTrust": 25 }
  },
  {
    "week": 52,
    "title": "The Final Verdict: Global IPO vs. Open Stewardship",
    "dilemma": "Week 52. You stand at the pinnacle of the AI revolution. Wall Street investment banks are ready to take your startup public at a historic $100 Billion valuation. Or, you can transition the company into an open, perpetual public-benefit foundation.",
    "optA_text": "Ring the Wall Street bell: Execute the historic hyper-capitalist Mega-IPO",
    "optA_effect": { "cash": 80000, "serverLoad": 30, "aiQuality": 10, "publicTrust": -20 },
    "optB_text": "Transition ownership to a Perpetual Public Benefit Trust for humanity",
    "optB_effect": { "cash": -50000, "serverLoad": -20, "aiQuality": 15, "publicTrust": 30 }
  }
];
