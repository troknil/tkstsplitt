const fs = require('fs');
const readline = require('readline');

// Define the path of the large text file
const inputFilePath = './input.txt';

// Define the directory to save the smaller chunks in
const outputDirectory = './res/';

// Define the maximum byte size per chunk
const maxChunkSizeBytes = 2048;

// Initialize variables to keep track of the current chunk number, bytes, and lines
let chunkNum = 1;
let bytes = 0;
let lines = [];

// Create a readline interface to read the input file line by line
const rl = readline.createInterface({
  input: fs.createReadStream(inputFilePath),
  crlfDelay: Infinity,
});

// Process each line of the input file
rl.on('line', (line) => {
  // Add the line to the current chunk
  lines.push(line);

  // Add the line's byte size to the current chunk's byte size
  bytes += Buffer.byteLength(line);

  // If the current chunk's byte size is greater than the maximum, save it to a file and start a new chunk
  if (bytes >= maxChunkSizeBytes) {
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

    // Save the current chunk to a file
    const outputFilePath = `${outputDirectory}/chunk_${chunkNum}.txt`;
    fs.writeFileSync(outputFilePath, lines.join('\n'));

    // Increment the chunk number, reset the bytes and lines arrays
    chunkNum++;
    bytes = 0;
    lines = [];
  }
});

// Save the last chunk to a file when the input file is fully read
rl.on('close', () => {
  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  // Save the last chunk to a file
  const outputFilePath = `${outputDirectory}/chunk_${chunkNum}.txt`;
  fs.writeFileSync(outputFilePath, lines.join('\n'));
});
