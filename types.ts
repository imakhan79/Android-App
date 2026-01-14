
export enum ComponentCategory {
  GESTURE_SENSITIVE = 'Gesture-sensitive',
  RUNTIME_LOADED = 'Runtime-loaded',
  MODAL_INTERRUPTIVE = 'Modal/Interruptive',
  CONTEXT_AWARE = 'Context-aware'
}

export interface Project {
  id: string;
  name: string;
  description: string;
  targetVersion: string;
  createdAt: string;
}

export interface APK {
  id: string;
  projectId: string;
  filename: string;
  version: string;
  permissions: string[];
  activities: string[];
  uploadedAt: string;
}

export interface GUIComponent {
  id: string;
  projectId: string;
  type: ComponentCategory;
  selector: string;
  riskScore: number;
  source: 'static' | 'dynamic';
}

export interface State {
  id: string;
  runId: string;
  hash: string;
  activityName: string;
  viewSummary: string;
}

export interface Transition {
  id: string;
  runId: string;
  fromStateHash: string;
  toStateHash: string;
  actionType: string;
  actionMeta: string;
}

export interface EpisodeTest {
  id: string;
  runId: string;
  sequence: Array<{ action: string; state: string }>;
  totalReward: number;
  depth: number;
  novelty: number;
  faultLikelihood: number;
  timeCost: number;
  crashFlag: boolean;
}

export interface Run {
  id: string;
  projectId: string;
  type: 'dynamic' | 'rl' | 'ga';
  configJson: any;
  startedAt: string;
  endedAt: string | null;
  status: 'pending' | 'running' | 'completed' | 'failed';
}
