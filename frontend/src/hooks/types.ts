export interface BaseResponseT<IDType = string | number> {
  id: IDType;
  created_at: string;
}

export interface ProjectAttributesT {
  name: string;
  description: string;
}
export interface ProjectsT extends BaseResponseT<string>, ProjectAttributesT {}
