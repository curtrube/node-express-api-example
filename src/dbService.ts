import pg from 'pg';
import type { PoolClient, Pool, QueryResultRow } from 'pg';

class DbService {
  private dbInstance: Pool;

  constructor() {
    this.dbInstance = new pg.Pool();
  }

  async query<T extends QueryResultRow>(sql: string, values?: any[]): Promise<T[]> {
    let client: PoolClient | undefined;
    try {
      client = await this.dbInstance.connect();
      const res = await client.query<T>(sql, values);
      return res.rows;
    } catch (err) {
      console.error(`Database query failed: ${err}`);
      throw err;
    } finally {
      if (client) {
        client?.release();
      }
    }
  }
}

export default DbService;
