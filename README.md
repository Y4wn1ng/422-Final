# Write your Readme here; explaining how to use this app

-Use the latest version of node
-to install node you can go here 
https://nodejs.org/en
-node will install all necessary dependencies in order to run the project, but notably jest, jest is what I used since it's included in the npm package.json, different libraries are also okay

What Does the App Do?
- The app allows the users to log folders that the user wants to watch and converts it in json files. 
- *It should be noted that the application originally dumps the data collected into a csv file without sorting it. 
- Each instance in which the application usage is finished will create the csv file to which it will be parsed. 
- Each specific path of the folder being watched is set into different states being watch, output and process, after a file is processed it will read the csv file and convert it into json by parsing it. By doing so, the original csv file will be moved into the process folder. 
- You will know whether or not the process succeeded because if it didn't the application will return an empty array. 

How do We Use It?
- It Starts in the service.js file where the console begins, if it's the first time this app is being used, the application will create the necessary folders from the start and this is where the data that is collected will be dumped. 
- It is important to note that once the application is up and running, it is very important to ensure that the exithandler is working, in the case that it isn't the console will reflect the color of the error or the state of the problem(s) if any. 
Watched, Output, and Processed respectively. 
- Throughout the application, there will be application feedback following respective user experience outlines that was give feedback on whether something in the application is working or not through certain colors. (The ones that I added manually will give feedback on what worked and what didn't)

Docker
- I know how to use it but I'm really bad at it, even worse at explaining it. But essentially the part here that would be here would be how to use the container. 