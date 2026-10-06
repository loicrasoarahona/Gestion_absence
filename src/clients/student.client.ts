import {
  ClassLevelDto,
  ParentDto,
  PaginatedResultDto,
  StudentDto,
} from "../types/dto.js";

export interface StudentClient {
  findAllUsers(filter: {
    class_level?: number;
    name?: string;
  }): Promise<StudentDto[]>;

  findAllUsersPaginated(filter: {
    class_level?: number;
    name?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResultDto<StudentDto>>;

  findById(id: number): Promise<StudentDto>;

  findAllClassLevels(): Promise<ClassLevelDto[]>;

  findParents(id: number): Promise<ParentDto[]>;
}
