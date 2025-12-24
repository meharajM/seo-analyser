
export interface SEOMetric {
  category: string;
  score: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

export interface Recommendation {
  id: string;
  title: string;
  impact: 'high' | 'medium' | 'low';
  category: 'technical' | 'content' | 'accessibility' | 'performance' | 'ai-readiness' | 'authority' | 'local' | 'visual' | 'deep-tech' | 'security' | 'rendering' | 'entity-seo' | 'intent-alignment' | 'sentiment';
  description: string;
  actionableStep: string;
}

export interface SEOAuditReport {
  projectName: string;
  overallScore: number;
  metrics: SEOMetric[];
  recommendations: Recommendation[];
  summary: string;
  sourceUrls?: { title: string; uri: string }[];
}

export enum AnalysisStep {
  IDLE = 'idle',
  FETCHING = 'fetching',
  ANALYZING = 'analyzing',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  ERROR = 'error'
}
