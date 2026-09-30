import { FlowType } from '@shared/models/flow-type';

export interface UpdateCategoryRequest {
  name: string;
  flowType: FlowType;
}
