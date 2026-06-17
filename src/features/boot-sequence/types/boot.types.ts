export type BootPhase =
  | "black"
  | "title"
  | "typing"
  | "checks"
  | "progress"
  | "welcome"
  | "fadeout"
  | "complete";

export type SystemCheckStatus = "pending" | "running" | "online";

export interface BootSystemCheck {
  id: string;
  label: string;
  code: string;
  description: string;
}

export interface BootWelcomeProfile {
  name: string;
  titles: readonly string[];
  subtitle: string;
}

export interface BootTiming {
  blackHoldMs: number;
  titleRevealMs: number;
  titleHoldMs: number;
  typingCharMs: number;
  typingPauseMs: number;
  checkStaggerMs: number;
  checkRunningMs: number;
  checksCompletePauseMs: number;
  progressDurationMs: number;
  progressCompletePauseMs: number;
  welcomeHoldMs: number;
  fadeOutMs: number;
}

export interface BootSequenceContent {
  brandTitle: string;
  initMessage: string;
  progressLabel: string;
  systemChecks: readonly BootSystemCheck[];
  welcome: BootWelcomeProfile;
  timing: BootTiming;
}

export interface BootSequenceState {
  phase: BootPhase;
  typedText: string;
  visibleCheckCount: number;
  activeCheckIndex: number;
  checkStatuses: SystemCheckStatus[];
  progress: number;
  isExiting: boolean;
}

export interface BootSequenceControls {
  skip: () => void;
}

export interface UseBootSequenceReturn extends BootSequenceState, BootSequenceControls {
  content: BootSequenceContent;
}
