// Types for subflow cards and checkpoints
export type SubflowCheckpoint = {
  id: string;
  class: string;
  headline: string;
  description: string;
  body: any;
};

export type SubflowCard = {
  id: string;
  areaId: string;
  checkpointIds: string[];
  newVersionId: string;
  name: string;
  useCase: string;
};
