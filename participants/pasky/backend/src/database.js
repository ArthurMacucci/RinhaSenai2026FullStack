import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../payment.db')

let db = null

export function initDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) reject(err)
      else {
        db.run('PRAGMA foreign_keys = ON', (err) => {
          if (err) reject(err)
          else {
            db.run(`
              CREATE TABLE IF NOT EXISTS transactions (
                id TEXT PRIMARY KEY,
                card_number TEXT NOT NULL,
                card_last4 TEXT NOT NULL,
                card_brand TEXT NOT NULL,
                holder_name TEXT NOT NULL,
                expiration TEXT NOT NULL,
                cvv TEXT NOT NULL,
                amount_cents INTEGER NOT NULL,
                fee_cents INTEGER NOT NULL,
                net_amount INTEGER NOT NULL,
                total_with_interest INTEGER NOT NULL,
                installment_amount INTEGER NOT NULL,
                installments INTEGER NOT NULL,
                description TEXT NOT NULL,
                status TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
              )
            `, (err) => {
              if (err) reject(err)
              else resolve(db)
            })
          }
        })
      }
    })
  })
}

export function getDatabase() {
  if (!db) throw new Error('Database not initialized')
  return db
}

export function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err)
      else resolve(this)
    })
  })
}

export function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err)
      else resolve(row)
    })
  })
}

export function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}