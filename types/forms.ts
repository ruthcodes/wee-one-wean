export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectOptionIcon {
  value: string;
  label: string;
  icon: string;
}

export interface FormFieldObject {
  field: string;
  label: string;
  type: string;
  options?: SelectOption[];
  required: boolean;
}
