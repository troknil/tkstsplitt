const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

// Initialize a new Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Initialize a new OpenAI client
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Specify the name of the table you want to retrieve data from
const tableName = 'YOUR_TABLE_NAME';

// Retrieve the text data from the specified table
const getTextData = async () => {
  const { data, error } = await supabase.from(tableName).select('text');
  if (error) {
    console.log(`Error while retrieving data: ${error.message}`);
    return;
  }
  return data;
};

// Use OpenAI embeddings to calculate the vector for each row in the text data
const calculateVectors = async (textData) => {
  const vectorData = [];
  for (let row of textData) {
    const { data, error } = await openai.completions.create({
      engine: 'davinci',
      prompt: row.text,
      maxTokens: 0,
      outputPrefix: '',
      model: 'text-davinci-002',
      inputMode: 'text',
      responseType: 'vector',
    });
    if (error) {
      console.log(`Error while calculating vectors: ${error.message}`);
      continue;
    }
    vectorData.push({ id: row.id, vector: data.choices[0].text });
  }
  return vectorData;
};

// Upload the vector data to a new table in Supabase
const uploadVectorData = async (vectorData) => {
  const { data, error } = await supabase.from('vectors').insert(vectorData);
  if (error) {
    console.log(`Error while uploading data: ${error.message}`);
    return;
  }
  console.log(`${data.length} rows of data uploaded to vectors table`);
};

// Main function to run the script
const main = async () => {
  const textData = await getTextData();
  const vectorData = await calculateVectors(textData);
  await uploadVectorData(vectorData);
};

main();
