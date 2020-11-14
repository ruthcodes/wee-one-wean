export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldObject {
  field: string;
  label: string;
  type: string;
  options?: SelectOption[];
  required: boolean;
}
