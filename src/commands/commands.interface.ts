import { LeasesView, Rooms, Users } from "../database";
type ExecutionStatus = "done" | "failed" | "new";
type RecordStatus = "missing" | "invalid" | "synced" | "broken";
type ExecutionRecord<T> = { item: T; status: ExecutionStatus; message: string };

type RecordSummary<T> = Array<ExecutionRecord<T>>;

type UpdateResult<T> = {
  id: string | undefined;
  status: "done" | "failed" | "skipped";
  target: T;
  message?: string;
};

type UsersSummary = Record<RecordStatus, RecordSummary<Users>>;
type RoomsSummary = Record<RecordStatus, RecordSummary<Rooms>>;
type LeasesSummary = Record<RecordStatus, RecordSummary<LeasesView>>;

type ExecutionStats = {
  done: number;
  failed: number;
  skipped: number;
};
type GenericStats = {
  count: number;
  failed: number;
  skipped: number;
  done: number;
  synced: number;
};
type UserStats = GenericStats;
type RoomsStats = GenericStats;
type LeasesStats = GenericStats;

interface ExecutionSummary {
  users?: UserStats;
  rooms?: RoomsStats;
  leases?: LeasesStats;
}

export {
  ExecutionStats,
  ExecutionSummary,
  ExecutionRecord,
  UpdateResult,
  UsersSummary,
  RecordSummary,
  RecordStatus,
  UserStats,
  RoomsSummary,
  RoomsStats,
  LeasesSummary,
  LeasesStats,
};