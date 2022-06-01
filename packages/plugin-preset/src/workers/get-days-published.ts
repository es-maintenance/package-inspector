import child_process from 'child_process';
import { promisify } from 'util';

const exec = promisify(child_process.exec);

export default async ({ name, version }: { name: string; version: string }) => {
  const { stdout, stderr } = await exec(
    `npm view ${name}@${version} time --json`
  );

  if (stderr) return;

  const parsed = JSON.parse(stdout);

  const publishedAt = new Date(parsed[version]);
  const now = new Date();

  var difference = now.getTime() - publishedAt.getTime();

  const days = Math.ceil(difference / (1000 * 3600 * 24));

  return days;
};
