// Types for workflow data
export type StatusData = {
  completion: string[];
  subflowId: string;
};

export type WorkflowData = {
  id: string;
  processId: string;
  name: string;
  email: string;
  department: string;
  location: string;
  teamlead: string;
  exitDate: string;
  picture: string;
  statuses: StatusData[];
  subflows: any[];
};
