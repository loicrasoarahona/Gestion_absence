import { StudentClientImpl } from "../clients/impl/student.client.impl.js";
import { StudentClient } from "../clients/student.client.js";

class ServiceLocator {
  public readonly studentClient: StudentClient;

  constructor() {
    this.studentClient = new StudentClientImpl();
  }
}

export default new ServiceLocator();
