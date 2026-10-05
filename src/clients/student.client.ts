import { ClassLevelDto, ParentDto, StudentDto } from "../types/dto.js";

export interface StudentClient {
  findAllUsers(filter: {
    class_level?: number;
    name?: string;
  }): Promise<StudentDto[]>;

  findById(id: number): Promise<StudentDto>;

  findAllClassLevels(): Promise<ClassLevelDto[]>;

  findParents(id: number): Promise<ParentDto[]>;
}
