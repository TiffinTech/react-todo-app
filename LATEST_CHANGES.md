## 2022-03-11

### New Features

-   We now have our own local API server to store and manage the tasks via REST interface
-   The user interface has been expanded with a filter function
-   Adding, updating and deleting tasks has been implemented
-   We now have a special 'Control My Life' button to auto-generate tasks

### Additional Packages

-   `npm i -D concurrently` to start client and server in parallel
-   `npm i json-server cors` to have our own API-Server running

### Script Modifications

-   `start` : now starts **client** _and_ **API server** concurrently
-   `start:server` : starts the json api server
-   `start:client` : starts the react client (former start script)

### 3rd Party - Thanks to the community

-   The famous [JSON Server](https://github.com/typicode/json-server)
-   CSS Loader from [LOADING.IO]https://loading.io/css/)
-   Icons from [Feather Icons](https://feathericons.com/)
