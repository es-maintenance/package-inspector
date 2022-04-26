import { readFileSync } from 'fs';
import { IReport } from '@package-inspector/cli';

const REPORT_LOCATION = process.env.REPORT_LOCATION;

let _REPORT: IReport | null = null;

function loadData(): IReport {
  if (_REPORT !== null) {
    return _REPORT;
  }

  if (!REPORT_LOCATION) {
    throw new Error(
      'Attempting to use use JSON report data but did not provide a REPORT_LOCATION entry via environment variables'
    );
  }

  _REPORT = JSON.parse(readFileSync(REPORT_LOCATION, 'utf-8')) as IReport;

  return _REPORT;
}

export function getReport() {
  const report = loadData();

  return report;
}
