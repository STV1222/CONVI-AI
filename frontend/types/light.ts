export type RiskLevel = "low" | "medium" | "high" | "critical";
export type HealthState = "on-track" | "watch" | "at-risk";
export type ProcurementStatus = "confirmed" | "in-transit" | "delayed" | "at-risk";
export type TaskStatus = "planned" | "in-progress" | "blocked" | "complete";
export type ContractStatus = "active" | "pending-renewal" | "under-review";
export type MaintenanceStatus = "healthy" | "scheduled" | "attention";
export type SeverityLevel = "minor" | "moderate" | "major" | "critical";

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  phase: string;
  completion: number;
  budgetSpentPct: number;
  budgetVariancePct: number;
  scheduleVarianceDays: number;
  scheduleStatus: HealthState;
  budgetStatus: HealthState;
  riskLevel: RiskLevel;
  projectHealthScore: number;
  manager: string;
  siteLead: string;
  summary: string;
  nextMilestone: string;
}

export interface AiAlert {
  id: string;
  title: string;
  summary: string;
  severity: RiskLevel;
  projectId?: string;
  category: string;
  action: string;
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  contact: string;
  contractStatus: ContractStatus;
  performanceScore: number;
  onTimeScore: number;
  activeProjects: string[];
  issueFlags: string[];
  aiNote: string;
}

export interface WorkPackage {
  id: string;
  title: string;
  zone: string;
  projectId: string;
  assignedTeam: string;
  startDate: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  dependencies: string[];
  workforce: number;
  status: TaskStatus;
}

export interface ProcurementItem {
  id: string;
  material: string;
  requiredDate: string;
  supplier: string;
  eta: string;
  deliveryStatus: ProcurementStatus;
  shortageRisk: RiskLevel;
  projectId: string;
  workPackage: string;
  quantity: string;
}

export interface SafetyRecord {
  id: string;
  projectId: string;
  type: "incident" | "observation" | "inspection" | "non-conformance";
  title: string;
  zone: string;
  severity: SeverityLevel;
  owner: string;
  status: "open" | "monitoring" | "closed";
  reportedAt: string;
  note: string;
}

export interface EquipmentAsset {
  id: string;
  name: string;
  type: string;
  utilizationRate: number;
  maintenanceStatus: MaintenanceStatus;
  lastServiceDate: string;
  downtimeRisk: RiskLevel;
  activeLocation: string;
  projectId: string;
  insight: string;
}

export interface ProgressUpdate {
  id: string;
  projectId: string;
  zone: string;
  date: string;
  plannedTasks: number;
  completedTasks: number;
  status: HealthState;
  summary: string;
  photoLabel: string;
  droneInsight: string;
}

export interface ProjectDetailTab {
  id:
    | "overview"
    | "progress"
    | "allocation"
    | "providers"
    | "procurement"
    | "safety"
    | "budget"
    | "ai";
  label: string;
}

export interface CopilotExchange {
  id: string;
  question: string;
  answer: string;
  chips: string[];
}
