import { Report } from '@package-inspector/core';

const REPORT_LOCATION = process.env.REPORT_LOCATION;

export function getReport() {
  if (!REPORT_LOCATION) {
    throw new Error(
      'Attempting to use use JSON report data but did not provide a REPORT_LOCATION entry via environment variables'
    );
  }

  const report = new Report();

  report.loadFromFile(REPORT_LOCATION);

  return report;
}
