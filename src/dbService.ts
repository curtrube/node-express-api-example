import pg from 'pg';
import type { ClientConfig, PoolClient, Pool, QueryResultRow } from 'pg';

export const dbConfig: ClientConfig = {
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'test',
};

class DbService {
  private dbInstance: Pool;

  constructor(dbConfig: pg.PoolConfig) {
    this.dbInstance = new pg.Pool(dbConfig);
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
