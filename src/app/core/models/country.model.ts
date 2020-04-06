export interface CountryModel {
  id: number;
  iso: string;
  iso3: string | null;
  name: string;
  name_pretty: string;
  code: number | null;
  code_phone: number;
}
