//Read fles
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize a new Supabase client
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

// Specify the name of the table you want to upload data to
const tableName = 'YOUR_TABLE_NAME';

// Specify the path to the directory containing the text files
const dirPath = 'PATH_TO_DIRECTORY';

// Read all text files from the directory and parse their contents into an array of objects
const data = [];
const files = fs.readdirSync(dirPath);
for (let file of files) {
  if (path.extname(file) === '.txt') {
    const filePath = path.join(dirPath, file);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    data.push({ content: fileContents, filename: file });
  }
}

// Divide the data into chunks of 100 rows each
const chunks = [];
for (let i = 0; i < data.length; i += 100) {
  chunks.push(data.slice(i, i + 100));
}

// Upload the data to the Supabase table in chunks using the insert method
(async () => {
  for (let chunk of chunks) {
    const { data, error } = await supabase.from(tableName).insert(chunk);
    if (error) {
      console.log(`Error while uploading data: ${error.message}`);
      return;
    }
    console.log(`${data.length} rows of data uploaded to ${tableName}`);
  }
})();