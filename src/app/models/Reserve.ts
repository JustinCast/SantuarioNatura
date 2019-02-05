export class Reserve {
  constructor(
    public name?: string,
    public email?: string,
    public phone?: string,
    public country?: string,
    public adults?: number,
    public children?: number,
    public activity?: string,
    public activity_date?: string,
    public feeding?: boolean,
    public transport?: boolean,
    public lodging?: boolean,
    public lodging_start_date?: string,
    public lodging_finish_date?: string,
    public payment_method?: string,
    public comment?: string
  ) {}
}
