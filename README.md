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