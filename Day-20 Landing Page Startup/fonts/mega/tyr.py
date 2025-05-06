#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
#!/usr/bin/env python3

import os
import sys
import shutil
import time
import subprocess
import threading
import platform
from datetime import datetime

LOGFILE = "/tmp/python_toolkit.log"
BACKUP_DIR = "/tmp/python_toolkit_backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOGFILE, "a") as f:
        f.write(f"{timestamp} : {message}\n")

def error_exit(message):
    print(f"[ERROR] {message}")
    log(f"ERROR: {message}")
    sys.exit(1)

def monitor_system():
    print("\n--- System Monitoring ---")
    print(f"Hostname: {platform.node()}")
    print(f"Uptime: {subprocess.getoutput('uptime -p')}")
    print(f"Logged in users: {len(subprocess.getoutput('who').splitlines())}")
    print("Memory Usage:\n", subprocess.getoutput('free -h'))
    print("Disk Usage:\n", subprocess.getoutput('df -h'))
    print("Top Processes:\n", subprocess.getoutput("ps aux --sort=-%mem | head -n 10"))

def backup_home():
    print("\n--- Backing up home directory ---")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"home_backup_{timestamp}.tar.gz")
    home = os.path.expanduser("~")
    try:
        subprocess.run(["tar", "-czf", backup_file, home], check=True)
        print(f"Backup saved to {backup_file}")
        log(f"Backup created: {backup_file}")
    except subprocess.CalledProcessError:
        error_exit("Backup failed")

def list_users():
    print("\n--- User Listing ---")
    with open("/etc/passwd") as f:
        for line in f:
            parts = line.strip().split(":")
            if len(parts) > 2 and parts[2].isdigit() and int(parts[2]) >= 1000 and parts[0] != "nobody":
                print(parts[0])

def create_user():
    username = input("Enter username to create: ").strip()
    result = subprocess.run(["id", username], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        print("User already exists.")
    else:
        try:
            subprocess.run(["sudo", "useradd", "-m", username], check=True)
            print(f"User {username} created.")
            log(f"Created user {username}")
        except subprocess.CalledProcessError:
            error_exit("User creation failed.")

def ping_test():
    host = input("Enter host to ping: ").strip()
    try:
        print(subprocess.getoutput(f"ping -c 4 {host}"))
    except Exception:
        error_exit("Ping failed.")

def fetch_url():
    import requests
    url = input("Enter URL to fetch: ").strip()
    try:
        resp = requests.get(url)
        print("\n".join(resp.text.splitlines()[:20]))
    except Exception as e:
        error_exit(f"Curl failed: {e}")

def run_background_task():
    def task():
        time.sleep(30)
        with open(LOGFILE, "a") as f:
            f.write(f"{datetime.now()} : Background task complete!\n")
        print("Background task complete!")

    print("Running background task (30 seconds)...")
    thread = threading.Thread(target=task)
    thread.daemon = True
    thread.start()
    print(f"Background task started with thread ID: {thread.ident}")

def show_logs():
    print("\n--- Logs ---")
    if os.path.exists(LOGFILE):
        with open(LOGFILE, "r") as f:
            lines = f.readlines()
            print("".join(lines[-50:]))
    else:
        print("No logs found.")

def show_menu():
    options = {
        "1": ("Monitor System", monitor_system),
        "2": ("Backup Home Directory", backup_home),
        "3": ("List Users", list_users),
        "4": ("Create User", create_user),
        "5": ("Ping Test", ping_test),
        "6": ("Fetch URL", fetch_url),
        "7": ("Run Background Task", run_background_task),
        "8": ("View Logs", show_logs),
        "9": ("Exit", lambda: sys.exit(0))
    }

    while True:
        print("\n=== Mega Python Toolkit Menu ===")
        for key, (desc, _) in sorted(options.items()):
            print(f"{key}) {desc}")
        choice = input("Choose an option: ").strip()
        if choice in options:
            try:
                options[choice][1]()
            except Exception as e:
                log(f"Unhandled exception: {e}")
                print(f"Error: {e}")
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    print("Starting Mega Python Toolkit...")
    log("Script started")
    try:
        show_menu()
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting...")
    finally:
        log("Script exited")
