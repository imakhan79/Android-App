
import { Project, APK, GUIComponent, ComponentCategory, State, Transition, EpisodeTest, Run } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'FinanceApp Beta',
    description: 'Main retail banking application v2.0 exploration.',
    targetVersion: 'Android 14',
    createdAt: '2024-03-01T10:00:00Z'
  }
];

export const MOCK_APK: APK = {
  id: 'apk1',
  projectId: 'p1',
  filename: 'finance-v2.0.apk',
  version: '2.0.4',
  permissions: ['CAMERA', 'LOCATION', 'INTERNET', 'READ_CONTACTS'],
  activities: ['MainActivity', 'LoginActivity', 'DashboardActivity', 'TransferActivity', 'SettingsActivity'],
  uploadedAt: '2024-03-01T10:05:00Z'
};

export const MOCK_COMPONENTS: GUIComponent[] = [
  { id: 'c1', projectId: 'p1', type: ComponentCategory.GESTURE_SENSITIVE, selector: 'id/transfer_swipe_area', riskScore: 85, source: 'static' },
  { id: 'c2', projectId: 'p1', type: ComponentCategory.MODAL_INTERRUPTIVE, selector: 'id/biometric_prompt', riskScore: 92, source: 'static' },
  { id: 'c3', projectId: 'p1', type: ComponentCategory.RUNTIME_LOADED, selector: 'id/transaction_list', riskScore: 64, source: 'static' },
  { id: 'c4', projectId: 'p1', type: ComponentCategory.CONTEXT_AWARE, selector: 'id/location_permission_dialog', riskScore: 78, source: 'static' }
];

export const MOCK_STATES: State[] = [
  { id: 's1', runId: 'r1', hash: 'HASH_001', activityName: 'MainActivity', viewSummary: 'Home Screen with Balance' },
  { id: 's2', runId: 'r1', hash: 'HASH_002', activityName: 'TransferActivity', viewSummary: 'Transaction Input Form' },
  { id: 's3', runId: 'r1', hash: 'HASH_003', activityName: 'SettingsActivity', viewSummary: 'User Settings' }
];

export const MOCK_TRANSITIONS: Transition[] = [
  { id: 't1', runId: 'r1', fromStateHash: 'HASH_001', toStateHash: 'HASH_002', actionType: 'TAP', actionMeta: 'btn_transfer' },
  { id: 't2', runId: 'r1', fromStateHash: 'HASH_001', toStateHash: 'HASH_003', actionType: 'TAP', actionMeta: 'btn_settings' },
  { id: 't3', runId: 'r1', fromStateHash: 'HASH_002', toStateHash: 'HASH_001', actionType: 'BACK', actionMeta: 'hardware_back' }
];

export const generateMockEpisodes = (runId: string): EpisodeTest[] => {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: `ep-${i}`,
    runId,
    sequence: [
      { action: 'TAP', state: 'MainActivity' },
      { action: 'SWIPE', state: 'TransferActivity' },
      { action: 'TYPE', state: 'TransferForm' }
    ],
    totalReward: Math.floor(Math.random() * 100),
    depth: Math.floor(Math.random() * 20),
    novelty: Math.random(),
    faultLikelihood: Math.random(),
    timeCost: Math.floor(Math.random() * 5000),
    crashFlag: Math.random() > 0.85
  }));
};
