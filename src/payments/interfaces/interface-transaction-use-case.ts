export interface CreditCardInfo {
  number: number;
  exp_month: number;
  exp_year: number;
  cvc: number;
  card_holder: string;
}

export interface CustomerData {
  phone_number: string;
  full_name: string;
  legal_id: string;
  legal_id_type: string;
  customer_email: string;
  address_line_1: string;
  region: string;
  city: string;
  postal_code: string;
}
