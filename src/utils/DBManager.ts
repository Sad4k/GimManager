import { Database } from 'sql.js';

class DBManager {
  private db: Database | null = null;

  async init() {
    const SQL = await import('sql.js');
    this.db = new SQL.Database();
    this.createTables();
  }

  private createTables() {
    this.db?.exec(`
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        membershipType TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL,
        category TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS memberships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        duration INTEGER NOT NULL,
        price REAL NOT NULL
      );
    `);
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db.exec(sql, params);
  }

  // CRUD operations for clients
  async getClients() {
    return this.query('SELECT * FROM clients');
  }

  async addClient(name: string, email: string, membershipType: string) {
    return this.query('INSERT INTO clients (name, email, membershipType) VALUES (?, ?, ?)', [name, email, membershipType]);
  }

  async updateClient(id: number, name: string, email: string, membershipType: string) {
    return this.query('UPDATE clients SET name = ?, email = ?, membershipType = ? WHERE id = ?', [name, email, membershipType, id]);
  }

  async deleteClient(id: number) {
    return this.query('DELETE FROM clients WHERE id = ?', [id]);
  }

  // CRUD operations for inventory
  async getInventory() {
    return this.query('SELECT * FROM inventory');
  }

  async addInventoryItem(name: string, price: number, stock: number, category: string) {
    return this.query('INSERT INTO inventory (name, price, stock, category) VALUES (?, ?, ?, ?)', [name, price, stock, category]);
  }

  async updateInventoryItem(id: number, name: string, price: number, stock: number, category: string) {
    return this.query('UPDATE inventory SET name = ?, price = ?, stock = ?, category = ? WHERE id = ?', [name, price, stock, category, id]);
  }

  async deleteInventoryItem(id: number) {
    return this.query('DELETE FROM inventory WHERE id = ?', [id]);
  }

  // CRUD operations for memberships
  async getMemberships() {
    return this.query('SELECT * FROM memberships');
  }

  async addMembership(name: string, duration: number, price: number) {
    return this.query('INSERT INTO memberships (name, duration, price) VALUES (?, ?, ?)', [name, duration, price]);
  }

  async updateMembership(id: number, name: string, duration: number, price: number) {
    return this.query('UPDATE memberships SET name = ?, duration = ?, price = ? WHERE id = ?', [name, duration, price, id]);
  }

  async deleteMembership(id: number) {
    return this.query('DELETE FROM memberships WHERE id = ?', [id]);
  }
}

export const dbManager = new DBManager();