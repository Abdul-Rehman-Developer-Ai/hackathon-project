import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  DILEMMAS, 
  Dilemma, 
  DilemmaEffect 
} from './data/dilemmas.ts';
import { 
  TrendingUp, 
  TrendingDown, 
  Server, 
  DollarSign, 
  Brain, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  Code, 
  History, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Volume2, 
  VolumeX, 
  Zap, 
  Award, 
  Flame, 
  RotateCcw,
  Cpu,
  Layers,
  Bot
} from 'lucide-react';

interface GameState {
  week: number;
  cash: number;
  serverLoad: number;
  aiQuality: number;
  publicTrust: number;
  history: Array<{
    week: number;
    title: string;
    choice: 'A' | 'B';
    choiceText: string;
    effects: DilemmaEffect;
    statsSnapshot: { cash: number; serverLoad: number; aiQuality: number; publicTrust: number };
  }>;
  gameOver: boolean;
  gameOverReason: string | null;
  victory: boolean;
}

const INITIAL_STATE: GameState = {
  week: 1,
  cash: 120000,
  serverLoad: 40,
  aiQuality: 55,
  publicTrust: 65,
  history: [],
  gameOver: false,
  gameOverReason: null,
  victory: false,
};

export default function App() {
  const [game, setGame] = useState<GameState>(INITIAL_STATE);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hardcoreMode, setHardcoreMode] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [hoveredChoice, setHoveredChoice] = useState<'A' | 'B' | null>(null);

  // Synthesize sound effects using Web Audio API
  const playSfx = useCallback((type: 'click' | 'select' | 'warning' | 'gameover' | 'victory') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'click') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'select') {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'warning') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(180, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.5);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'victory') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.15);
        osc.frequency.setValueAtTime(659.25, now + 0.3);
        osc.frequency.setValueAtTime(880, now + 0.45);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch {
      // Audio context might be restricted before interaction
    }
  }, [soundEnabled]);

  const currentDilemma: Dilemma | undefined = useMemo(() => {
    return DILEMMAS.find((d) => d.week === game.week);
  }, [game.week]);

  const currentEra = useMemo(() => {
    if (game.week <= 15) return { name: 'Phase 1: Software Era', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40', icon: Cpu, badge: 'Weeks 1-15' };
    if (game.week <= 35) return { name: 'Phase 2: Synthetic Data Era', color: 'text-purple-400 border-purple-500/30 bg-purple-950/40', icon: Layers, badge: 'Weeks 16-35' };
    return { name: 'Phase 3: Robotics Era', color: 'text-amber-400 border-amber-500/30 bg-amber-950/40', icon: Bot, badge: 'Weeks 36-52' };
  }, [game.week]);

  const handleMakeChoice = (choice: 'A' | 'B') => {
    if (!currentDilemma || game.gameOver || game.victory) return;

    const effect = choice === 'A' ? currentDilemma.optA_effect : currentDilemma.optB_effect;
    const choiceText = choice === 'A' ? currentDilemma.optA_text : currentDilemma.optB_text;

    const newCash = game.cash + effect.cash;
    const newServerLoad = Math.max(0, Math.min(100, game.serverLoad + effect.serverLoad));
    const newAiQuality = Math.max(0, Math.min(100, game.aiQuality + effect.aiQuality));
    const newPublicTrust = Math.max(0, Math.min(100, game.publicTrust + effect.publicTrust));

    playSfx('select');

    // Check game over conditions
    let gameOver = false;
    let gameOverReason: string | null = null;

    if (newCash <= 0) {
      gameOver = true;
      gameOverReason = 'BANKRUPTCY: Your cash reserves hit $0. Payroll bounced, GPU providers terminated your API access, and the board liquidated your remaining IP.';
    } else if (newServerLoad >= 100) {
      gameOver = true;
      gameOverReason = 'INFRASTRUCTURE COLLAPSE: Server load breached 100%. Uncontrolled GPU thermal throttling and unhandled cascading cluster crashes wiped live customer databases.';
    } else if (newAiQuality <= 0) {
      gameOver = true;
      gameOverReason = 'TOTAL MODEL COLLAPSE: AI Quality collapsed to 0%. Irreversible recursive synthetic hallucinations rendered the model completely incoherent and functionally useless.';
    } else if (newPublicTrust <= 0) {
      gameOver = true;
      gameOverReason = 'PUBLIC BOYCOTT & REGULATORY INJUNCTION: Public trust reached 0%. Mass user boycotts, attorney general injunctions, and federal subpoenas shuttered company operations.';
    }

    if (gameOver) {
      playSfx('gameover');
      setGame((prev) => ({
        ...prev,
        cash: newCash,
        serverLoad: newServerLoad,
        aiQuality: newAiQuality,
        publicTrust: newPublicTrust,
        gameOver: true,
        gameOverReason,
        history: [
          ...prev.history,
          {
            week: prev.week,
            title: currentDilemma.title,
            choice,
            choiceText,
            effects: effect,
            statsSnapshot: { cash: newCash, serverLoad: newServerLoad, aiQuality: newAiQuality, publicTrust: newPublicTrust },
          },
        ],
      }));
      return;
    }

    // Check victory condition (after completing week 52)
    if (game.week === 52) {
      playSfx('victory');
      setGame((prev) => ({
        ...prev,
        cash: newCash,
        serverLoad: newServerLoad,
        aiQuality: newAiQuality,
        publicTrust: newPublicTrust,
        victory: true,
        history: [
          ...prev.history,
          {
            week: prev.week,
            title: currentDilemma.title,
            choice,
            choiceText,
            effects: effect,
            statsSnapshot: { cash: newCash, serverLoad: newServerLoad, aiQuality: newAiQuality, publicTrust: newPublicTrust },
          },
        ],
      }));
      return;
    }

    // Advance week
    setGame((prev) => ({
      ...prev,
      week: prev.week + 1,
      cash: newCash,
      serverLoad: newServerLoad,
      aiQuality: newAiQuality,
      publicTrust: newPublicTrust,
      history: [
        ...prev.history,
        {
          week: prev.week,
          title: currentDilemma.title,
          choice,
          choiceText,
          effects: effect,
          statsSnapshot: { cash: newCash, serverLoad: newServerLoad, aiQuality: newAiQuality, publicTrust: newPublicTrust },
        },
      ],
    }));
  };

  const restartGame = () => {
    playSfx('click');
    setGame(INITIAL_STATE);
  };

  const jumpToWeek = (targetWeek: number) => {
    if (targetWeek < 1 || targetWeek > 52) return;
    playSfx('click');
    setGame((prev) => ({
      ...prev,
      week: targetWeek,
      gameOver: false,
      gameOverReason: null,
      victory: false,
    }));
  };

  const copyJsonToClipboard = () => {
    playSfx('click');
    navigator.clipboard.writeText(JSON.stringify(DILEMMAS, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  const downloadJsonFile = () => {
    playSfx('click');
    const blob = new Blob([JSON.stringify(DILEMMAS, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai_startup_ceo_52_dilemmas.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Preview projected impact on hover
  const projectedStats = useMemo(() => {
    if (!hoveredChoice || !currentDilemma || hardcoreMode) return null;
    const effect = hoveredChoice === 'A' ? currentDilemma.optA_effect : currentDilemma.optB_effect;
    return {
      cash: game.cash + effect.cash,
      serverLoad: Math.max(0, Math.min(100, game.serverLoad + effect.serverLoad)),
      aiQuality: Math.max(0, Math.min(100, game.aiQuality + effect.aiQuality)),
      publicTrust: Math.max(0, Math.min(100, game.publicTrust + effect.publicTrust)),
      diff: effect,
    };
  }, [hoveredChoice, currentDilemma, game, hardcoreMode]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base">SYNAPSE DYNAMICS</span>
                <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">CEO SIM</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">52-Week AI Frontier Resource Engine</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/60"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={() => setHardcoreMode(!hardcoreMode)}
              title={hardcoreMode ? 'Hardcore: Stat deltas hidden' : 'Standard: Stat deltas visible'}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                hardcoreMode 
                  ? 'bg-rose-950/60 border-rose-500/50 text-rose-300' 
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{hardcoreMode ? 'Hardcore (Blind)' : 'Assisted'}</span>
            </button>

            <button
              onClick={() => { playSfx('click'); setShowHistoryModal(true); }}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700/60 flex items-center gap-1.5 transition-colors"
            >
              <History className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Log ({game.history.length})</span>
            </button>

            <button
              onClick={() => { playSfx('click'); setShowJsonModal(true); }}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 text-xs font-semibold border border-cyan-500/40 flex items-center gap-1.5 transition-colors shadow-sm shadow-cyan-900/20"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>52-Week JSON</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
        
        {/* Era & Progress Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg border ${currentEra.color}`}>
              <currentEra.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Current Era</span>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${currentEra.color}`}>
                  {currentEra.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">{currentEra.name}</h2>
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:items-end gap-1.5">
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono">
              <span className="text-slate-400">Simulation Progress</span>
              <span className="font-bold text-cyan-400">Week {game.week} / 52</span>
            </div>
            {/* Progress bar */}
            <div className="w-full sm:w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
                style={{ width: `${(game.week / 52) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4 Core Vital Resource Gauges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Gauge 1: Cash */}
          <div className={`p-4 rounded-xl border transition-all ${
            game.cash < 25000 
              ? 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/30' 
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Runway Cash
              </span>
              {projectedStats && projectedStats.diff.cash !== 0 && (
                <span className={`text-[11px] font-bold ${projectedStats.diff.cash > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {projectedStats.diff.cash > 0 ? `+$${(projectedStats.diff.cash / 1000).toFixed(0)}k` : `-$${(Math.abs(projectedStats.diff.cash) / 1000).toFixed(0)}k`}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight text-white mb-2">
              ${(game.cash).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>{game.cash < 25000 ? '⚠️ High Burn' : 'Healthy Reserve'}</span>
              <span className="text-slate-500">Min: &gt;$0</span>
            </div>
          </div>

          {/* Gauge 2: Server Load */}
          <div className={`p-4 rounded-xl border transition-all ${
            game.serverLoad > 80 
              ? 'bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-950/30' 
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-cyan-400" />
                Server Load
              </span>
              {projectedStats && projectedStats.diff.serverLoad !== 0 && (
                <span className={`text-[11px] font-bold ${projectedStats.diff.serverLoad > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {projectedStats.diff.serverLoad > 0 ? `+${projectedStats.diff.serverLoad}%` : `${projectedStats.diff.serverLoad}%`}
                </span>
              )}
            </div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl font-bold font-mono tracking-tight text-white">
                {game.serverLoad}%
              </span>
              <span className="text-[11px] font-mono text-slate-500">Limit: 100%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  game.serverLoad > 80 ? 'bg-rose-500' : game.serverLoad > 60 ? 'bg-amber-500' : 'bg-cyan-500'
                }`}
                style={{ width: `${Math.min(100, game.serverLoad)}%` }}
              />
            </div>
          </div>

          {/* Gauge 3: AI Quality */}
          <div className={`p-4 rounded-xl border transition-all ${
            game.aiQuality < 30 
              ? 'bg-purple-950/40 border-purple-500/50 shadow-lg shadow-purple-950/30' 
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-purple-400" />
                AI Quality
              </span>
              {projectedStats && projectedStats.diff.aiQuality !== 0 && (
                <span className={`text-[11px] font-bold ${projectedStats.diff.aiQuality > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {projectedStats.diff.aiQuality > 0 ? `+${projectedStats.diff.aiQuality}%` : `${projectedStats.diff.aiQuality}%`}
                </span>
              )}
            </div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl font-bold font-mono tracking-tight text-white">
                {game.aiQuality}%
              </span>
              <span className="text-[11px] font-mono text-slate-500">Min: &gt;0%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  game.aiQuality < 30 ? 'bg-rose-500' : 'bg-purple-500'
                }`}
                style={{ width: `${Math.min(100, game.aiQuality)}%` }}
              />
            </div>
          </div>

          {/* Gauge 4: Public Trust */}
          <div className={`p-4 rounded-xl border transition-all ${
            game.publicTrust < 30 
              ? 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/30' 
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                Public Trust
              </span>
              {projectedStats && projectedStats.diff.publicTrust !== 0 && (
                <span className={`text-[11px] font-bold ${projectedStats.diff.publicTrust > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {projectedStats.diff.publicTrust > 0 ? `+${projectedStats.diff.publicTrust}%` : `${projectedStats.diff.publicTrust}%`}
                </span>
              )}
            </div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl font-bold font-mono tracking-tight text-white">
                {game.publicTrust}%
              </span>
              <span className="text-[11px] font-mono text-slate-500">Min: &gt;0%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  game.publicTrust < 30 ? 'bg-rose-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(100, game.publicTrust)}%` }}
              />
            </div>
          </div>

        </div>

        {/* Game Active Screen / Game Over / Victory Modal */}
        {game.gameOver ? (
          <div className="bg-rose-950/30 border border-rose-500/40 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-5 backdrop-blur-md">
            <div className="p-4 rounded-2xl bg-rose-900/40 border border-rose-500/40 text-rose-300">
              <Flame className="w-12 h-12" />
            </div>
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
                Startup Terminated • Week {game.week}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-2">
                Executive Run Terminated
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-rose-900/40 font-mono text-left">
                {game.gameOverReason}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg text-left font-mono text-xs">
              <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg">
                <span className="text-slate-500">Surviving Weeks</span>
                <p className="text-base font-bold text-white mt-1">{game.week - 1} / 52</p>
              </div>
              <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg">
                <span className="text-slate-500">Decisions Made</span>
                <p className="text-base font-bold text-white mt-1">{game.history.length}</p>
              </div>
              <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg">
                <span className="text-slate-500">Final Cash</span>
                <p className="text-base font-bold text-white mt-1">${game.cash.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg">
                <span className="text-slate-500">AI Quality</span>
                <p className="text-base font-bold text-white mt-1">{game.aiQuality}%</p>
              </div>
            </div>

            <button
              onClick={restartGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart New 52-Week Run</span>
            </button>
          </div>
        ) : game.victory ? (
          <div className="bg-gradient-to-b from-indigo-950/40 to-slate-900/80 border border-indigo-500/40 rounded-2xl p-6 sm:p-10 flex flex-col items-center text-center gap-6 backdrop-blur-md">
            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Award className="w-14 h-14" />
            </div>
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                52-Week Simulation Concluded
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-3">
                Titan of the Technological Singularity
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                You successfully navigated through the cutthroat Software Era, survived the treacherous Synthetic Data Model Collapse cascade, and steered the company through the tumultuous physical Robotics Era!
              </p>
            </div>

            {/* Victory stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl font-mono text-left">
              <div className="p-3.5 bg-slate-900/80 border border-emerald-500/30 rounded-xl">
                <span className="text-xs text-slate-400">Final Treasury</span>
                <p className="text-lg font-bold text-emerald-400 mt-1">${game.cash.toLocaleString()}</p>
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-cyan-500/30 rounded-xl">
                <span className="text-xs text-slate-400">Server Health</span>
                <p className="text-lg font-bold text-cyan-400 mt-1">{100 - game.serverLoad}% Headroom</p>
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-purple-500/30 rounded-xl">
                <span className="text-xs text-slate-400">Peak Model IQ</span>
                <p className="text-lg font-bold text-purple-400 mt-1">{game.aiQuality}%</p>
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-blue-500/30 rounded-xl">
                <span className="text-xs text-slate-400">Public Trust</span>
                <p className="text-lg font-bold text-blue-400 mt-1">{game.publicTrust}%</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={restartGame}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Simulate Another Year</span>
              </button>
              <button
                onClick={() => setShowJsonModal(true)}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <Code className="w-4 h-4" />
                <span>Export 52-Week JSON</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Dilemma Card */
          currentDilemma && (
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl backdrop-blur-sm">
              
              {/* Dilemma Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                    Week {currentDilemma.week} Dilemma
                  </span>
                  {currentDilemma.week <= 3 && (
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded">
                      Tutorial Phase
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentDilemma.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-1">
                  {currentDilemma.dilemma}
                </p>
              </div>

              {/* Action Choices: Option A & Option B */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Option A */}
                <button
                  onClick={() => handleMakeChoice('A')}
                  onMouseEnter={() => setHoveredChoice('A')}
                  onMouseLeave={() => setHoveredChoice(null)}
                  className="group relative p-5 rounded-xl border border-slate-800 hover:border-cyan-500/60 bg-slate-950/60 hover:bg-slate-900 text-left transition-all duration-200 flex flex-col justify-between gap-4 shadow-md hover:shadow-cyan-950/30 transform hover:-translate-y-0.5"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                        OPTION A
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-100 transition-colors leading-snug">
                      {currentDilemma.optA_text}
                    </p>
                  </div>

                  {/* Impact preview pills */}
                  {!hardcoreMode && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
                      <span className={`px-2 py-0.5 rounded ${currentDilemma.optA_effect.cash >= 0 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'}`}>
                        Cash: {currentDilemma.optA_effect.cash >= 0 ? `+$${(currentDilemma.optA_effect.cash / 1000).toFixed(0)}k` : `-$${(Math.abs(currentDilemma.optA_effect.cash) / 1000).toFixed(0)}k`}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${currentDilemma.optA_effect.serverLoad <= 0 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'}`}>
                        Load: {currentDilemma.optA_effect.serverLoad > 0 ? `+${currentDilemma.optA_effect.serverLoad}%` : `${currentDilemma.optA_effect.serverLoad}%`}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${currentDilemma.optA_effect.aiQuality >= 0 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'}`}>
                        Quality: {currentDilemma.optA_effect.aiQuality > 0 ? `+${currentDilemma.optA_effect.aiQuality}%` : `${currentDilemma.optA_effect.aiQuality}%`}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${currentDilemma.optA_effect.publicTrust >= 0 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'}`}>
                        Trust: {currentDilemma.optA_effect.publicTrust > 0 ? `+${currentDilemma.optA_effect.publicTrust}%` : `${currentDilemma.optA_effect.publicTrust}%`}
                      </span>
                    </div>
                  )}
                </button>

                {/* Option B */}
                <button
                  onClick={() => handleMakeChoice('B')}
                  onMouseEnter={() => setHoveredChoice('B')}
                  onMouseLeave={() => setHoveredChoice(null)}
                  className="group relative p-5 rounded-xl border border-slate-800 hover:border-indigo-500/60 bg-slate-950/60 hover:bg-slate-900 text-left transition-all duration-200 flex flex-col justify-between gap-4 shadow-md hover:shadow-indigo-950/30 transform hover:-translate-y-0.5"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-wider text-indigo-400 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800">
                        OPTION B
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-white group-hover:text-indigo-100 transition-colors leading-snug">
                      {currentDilemma.optB_text}
                    </p>
                  </div>

                  {/* Impact preview pills */}
                  {!hardcoreMode && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
                      <span className={`px-2 py-0.5 rounded ${currentDilemma.optB_effect.cash >= 0 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'}`}>
                        Cash: {currentDilemma.optB_effect.cash >= 0 ? `+$${(currentDilemma.optB_effect.cash / 1000).toFixed(0)}k` : `-$${(Math.abs(currentDilemma.optB_effect.cash) / 1000).toFixed(0)}k`}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${currentDilemma.optB_effect.serverLoad <= 0 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'}`}>
                        Load: {currentDilemma.optB_effect.serverLoad > 0 ? `+${currentDilemma.optB_effect.serverLoad}%` : `${currentDilemma.optB_effect.serverLoad}%`}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${currentDilemma.optB_effect.aiQuality >= 0 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'}`}>
                        Quality: {currentDilemma.optB_effect.aiQuality > 0 ? `+${currentDilemma.optB_effect.aiQuality}%` : `${currentDilemma.optB_effect.aiQuality}%`}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${currentDilemma.optB_effect.publicTrust >= 0 ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60' : 'bg-rose-950/70 text-rose-300 border border-rose-800/60'}`}>
                        Trust: {currentDilemma.optB_effect.publicTrust > 0 ? `+${currentDilemma.optB_effect.publicTrust}%` : `${currentDilemma.optB_effect.publicTrust}%`}
                      </span>
                    </div>
                  )}
                </button>

              </div>

              {/* Fast Jump Week Bar for testing & design review */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="hidden sm:inline">Inspect any era:</span>
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  <button onClick={() => jumpToWeek(1)} className={`px-2 py-1 rounded border ${game.week === 1 ? 'border-cyan-500 text-cyan-400 bg-cyan-950' : 'border-slate-800 hover:border-slate-700 text-slate-400'}`}>W1 (Tutorial)</button>
                  <button onClick={() => jumpToWeek(16)} className={`px-2 py-1 rounded border ${game.week === 16 ? 'border-purple-500 text-purple-400 bg-purple-950' : 'border-slate-800 hover:border-slate-700 text-slate-400'}`}>W16 (Synthetic)</button>
                  <button onClick={() => jumpToWeek(36)} className={`px-2 py-1 rounded border ${game.week === 36 ? 'border-amber-500 text-amber-400 bg-amber-950' : 'border-slate-800 hover:border-slate-700 text-slate-400'}`}>W36 (Robotics)</button>
                  <button onClick={() => jumpToWeek(52)} className={`px-2 py-1 rounded border ${game.week === 52 ? 'border-indigo-500 text-indigo-400 bg-indigo-950' : 'border-slate-800 hover:border-slate-700 text-slate-400'}`}>W52 (Finale)</button>
                </div>
              </div>

            </div>
          )
        )}

      </main>

      {/* Raw 52-Week JSON Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <Code className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">52-Week Balanced Dilemma Dataset (Raw JSON)</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyJsonToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 text-xs font-semibold border border-cyan-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? 'Copied!' : 'Copy Raw JSON'}</span>
                </button>
                <button
                  onClick={downloadJsonFile}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .json</span>
                </button>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-auto bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed">
              <pre>{JSON.stringify(DILEMMAS, null, 2)}</pre>
            </div>

            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Total Array Items: 52 Objects</span>
              <span>All 3 Eras Balanced: Software (1-15), Synthetic (16-35), Robotics (36-52)</span>
            </div>
          </div>
        </div>
      )}

      {/* History Log Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Executive Decision Log ({game.history.length})</h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex-1 overflow-auto divide-y divide-slate-800/80">
              {game.history.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No decisions made yet. Make your first choice in Week 1!
                </div>
              ) : (
                game.history.map((record, idx) => (
                  <div key={idx} className="py-3 flex flex-col gap-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 font-bold">Week {record.week}: {record.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${record.choice === 'A' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-indigo-950 text-indigo-300 border border-indigo-800'}`}>
                        Option {record.choice}
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs">{record.choiceText}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 pt-1">
                      <span>Cash: ${record.statsSnapshot.cash.toLocaleString()}</span>
                      <span>• Load: {record.statsSnapshot.serverLoad}%</span>
                      <span>• IQ: {record.statsSnapshot.aiQuality}%</span>
                      <span>• Trust: {record.statsSnapshot.publicTrust}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-3 text-center text-xs text-slate-500 font-mono">
        AI Startup CEO Simulator • Meticulously balanced 52-week dilemma engine
      </footer>
    </div>
  );
}
