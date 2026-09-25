import { ClassLevelDto, StudentDto } from "../types/dto.js";

export interface StudentClient {
  findAllUsers(filter: {
    class_level?: number;
    name?: string;
  }): Promise<StudentDto[]>;

  findById(id: number): Promise<StudentDto>;

  findAllClassLevels(): Promise<ClassLevelDto[]>;
}
