import { FlowType } from '@shared/models/flow-type';

export interface CreateCategoryRequest {
  name: string;
  flowType: FlowType;
}
