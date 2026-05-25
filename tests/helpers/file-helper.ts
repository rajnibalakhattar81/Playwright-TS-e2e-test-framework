import fs from "fs"
import { parse } from "csv-parse/sync";


/**
 * Reads the CSV file
 * @param filepath 
 * @returns Array of objects
 */
function readCSV(filepath: string): any[] {
  // Read a file
  const csvDataStr = fs.readFileSync(filepath, { encoding: "utf-8" });

  // Parse the csv data -> Array of data (install csv-parse)
  const csvDataArr = parse(csvDataStr, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return csvDataArr;
}

export default {readCSV };