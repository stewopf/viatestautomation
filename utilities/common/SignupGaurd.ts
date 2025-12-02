import path from "path";
import fs from 'fs';

    const LOCK_FILE = path.join(process.cwd(), '.signup-lock.json');
    export function tryAcquireLockOrReadWinner(currentProject: string): { acquired: boolean; winner: string | null } {
  try {
    const fd = fs.openSync(LOCK_FILE, 'wx');
    fs.writeFileSync(fd, JSON.stringify({ winner: currentProject, ts: Date.now() }, null, 2));
    fs.closeSync(fd);
    return { acquired: true, winner: currentProject };
  } catch (e: any) {
    if (e && e.code === 'EEXIST') {
      try {
        const data = JSON.parse(fs.readFileSync(LOCK_FILE, 'utf8'));
        return { acquired: false, winner: data?.winner ?? null };
      } catch {
        return { acquired: false, winner: null };
      }
    }
    throw e;
  }
}