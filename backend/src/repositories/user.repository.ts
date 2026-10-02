import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/user.entity.js';

export class UserRepository {
  private get repository() {
    return AppDataSource.getRepository(User);
  }

  async findByLogin(login: string) {
    return await this.repository.findOne({
      where: [{ username: login }, { email: login }]
    });
  }

  async getById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async getStudentIdByUserId(userId: number): Promise<number | null> {
    const user = await this.repository.findOne({
      where: { id: userId },
      select: { student_id: true }
    });

    return user?.student_id ?? null;
  }
}