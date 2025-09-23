import sqlite3
from datetime import datetime

DB_FILE = 'user_logs.db'

def init_db():
    """Создаёт базу и таблицу логов, если их ещё нет"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            action TEXT,
            timestamp TEXT,
            ip_address TEXT
        );
    ''')
    conn.commit()
    conn.close()

def log_user_action(user_id, action, ip_address):
    """Записывает действие пользователя в лог"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    timestamp = datetime.now().isoformat()
    cursor.execute('''
        INSERT INTO user_logs (user_id, action, timestamp, ip_address)
        VALUES (?, ?, ?, ?)
    ''', (user_id, action, timestamp, ip_address))
    conn.commit()
    conn.close()

def get_all_logs():
    """Возвращает все логи"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM user_logs')
    logs = cursor.fetchall()
    conn.close()
    return logs

if __name__ == "__main__":
    init_db()
    # Пример логирования действий
    log_user_action('user1', 'login', '192.168.0.10')
    log_user_action('user2', 'logout', '192.168.0.11')
    log_user_action('user1', 'update_profile', '192.168.0.10')
    # Получить и вывести все логи
    logs = get_all_logs()
    for log in logs:
        print(log)