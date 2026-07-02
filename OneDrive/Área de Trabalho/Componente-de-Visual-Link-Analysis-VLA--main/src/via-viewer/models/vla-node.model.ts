export type EntityCategory =
  | 'person'
  | 'company'
  | 'phone'
  | 'email'
  | 'address'
  | 'vehicle'
  | 'document';

export interface VlaNode {
  id: string;
  type: EntityCategory;
  label: string;
  metadata?: Record<string, string | number | boolean>;
}



