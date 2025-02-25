export interface BaseResponseT<IDType = string | number> {
  id: IDType;
  created_at: string;
}

export interface ProjectAttributes {
  name: string;
  description: string;
}
export interface ProjectAttributesT
  extends BaseResponseT<string>,
    ProjectAttributes {}
