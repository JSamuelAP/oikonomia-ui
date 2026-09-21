import { FlowType } from '@shared/models/flow-type';

export interface Category {
  id: string;
  name: string;
  flowType: FlowType;
}
