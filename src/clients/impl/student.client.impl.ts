import axios, { AxiosInstance } from "axios";
import { StudentClient } from "../student.client.js";
import { StudentDto } from "../../types/dto.js";

const SCHOOL_STUDENTS_URL = process.env.SCHOOL_STUDENTS_URL;

export class StudentClientImpl implements StudentClient {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: SCHOOL_STUDENTS_URL });
  }

  public async findAllUsers(filter: {
    class_level?: number;
    name?: string;
  }): Promise<StudentDto[]> {
    let url = "/students?";
    for (const key in filter) {
      if ((filter as any)[key] != undefined) {
        url += `${key}=${(filter as any)[key]}`;
      }
    }
    const result = await this.http.get(url);
    return result.data;
  }

  public async findById(id: number): Promise<StudentDto> {
    const result = await this.http.get(`/students/${id}`);
    return result.data;
  }
}
