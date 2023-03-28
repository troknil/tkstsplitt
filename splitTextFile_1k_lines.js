const fs = require('fs');
const readline = require('readline');

// Define the path of the large text file
const inputFilePath = './inputfile.txt';

// Define the directory to save the smaller chunks in
const outputDirectory = './res_lines/';

// Define the maximum number of lines per chunk
const maxChunkSize = 1000;

// Initialize variables to keep track of the current chunk number and lines
let chunkNum = 1;
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

  // If the current chunk is full, save it to a file and start a new chunk
  if (lines.length >= maxChunkSize) {
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

    // Save the current chunk to a file
    const outputFilePath = `${outputDirectory}/chunk_${chunkNum}.txt`;
    fs.writeFileSync(outputFilePath, lines.join('\n'));

    // Increment the chunk number and reset the lines array
    chunkNum++;
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
