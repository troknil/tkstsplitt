# tkstsplitt
simple text splitter, by chatgpt

To run the Node.js script I provided, you can follow these steps:

Open a text editor and paste the script into a new file.

Modify the inputFilePath, outputDirectory, and maxChunkSize variables at the beginning of the script to match your specific use case.

Save the file with a name like splitTextFile.js.

Open a terminal or command prompt and navigate to the directory where the splitTextFile.js file is saved.

Run the following command to install the readline module, which is a built-in module in Node.js that the script uses to read the input file line by line:

``` javascript
npm install readline
```

Run the following command to run the script:

``` javascript
node splitTextFile.js
``` 

This will start the script and begin processing the input file. You should see output in the terminal as the script reads each line and saves each chunk.

Once the script is finished, you should see a directory in the outputDirectory location that contains one or more text files, each with a filename that includes the chunk number. These text files contain the smaller chunks of text from the input file.


# vectorize

This script uses the Supabase and OpenAI APIs to retrieve the text data from a specified table in Supabase, calculate the vector for each row using the OpenAI API, and upload the vector data to a new table in Supabase.

To use this script, you'll need to install the @supabase/supabase-js, openai, and dotenv packages using npm. You'll also need to create a .env file in your project directory and set the following environment variables:

SUPABASE_URL: the URL for your Supabase instance
SUPABASE_ANON_KEY: an anonymous key for your Supabase instance
OPENAI_API_KEY: your OpenAI API key
YOUR_TABLE_NAME: the name of the table you want to retrieve data from
Once you've set up the environment variables, you can run the script using Node.js by running the command node script_name.js, where script_name.js is the name of the script file. The script will retrieve the text data from the specified table, calculate the vector for each row using the OpenAI API, and upload the vector data to a new table in Supabase.


# uploadToSupabase

In this code, we first import the fs and path modules to read all text files from the specified directory and extract their file contents. We then create an array of objects containing the file contents and filenames, where the content property holds the file contents, and the filename property holds the file name. We finally divide the data into chunks of 100 rows each using a for loop and the slice method, and use an asynchronous for loop to upload each chunk of data to the table using the insert method.

To use this script, replace YOUR_SUPABASE_URL, YOUR_SUPABASE_ANON_KEY, YOUR_TABLE_NAME, and PATH_TO_DIRECTORY with the appropriate values for your Supabase instance and text file directory path, respectively. The text files should contain only plain text content without any structured format.