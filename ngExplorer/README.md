# NgExplorer and Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4. 

Angular CLI: 7.3.4
Node: 8.11.2
OS: win32 x64
Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.13.4
@angular-devkit/core         7.3.4
@angular-devkit/schematics   7.3.4
@schematics/angular          7.3.4
@schematics/update           0.13.4
rxjs                         6.3.3
typescript                   3.2.4

## Development server

Run `ng serve` for a dev server. Sample Win32 console output given as follows. On browser, navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

C:\SandBox\ngExplorer>ng serve
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **

Date: 2019-03-14T21:36:31.997Z
Hash: 10b85e352c948b54f9ca
Time: 21120ms
chunk {es2015-polyfills} es2015-polyfills.js, es2015-polyfills.js.map (es2015-polyfills) 284 kB [initial] [rendered]
chunk {main} main.js, main.js.map (main) 82.8 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 237 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.08 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 16.4 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 3.87 MB [initial] [rendered]
i ｢wdm｣: Compiled successfully.

## Dependancies

NgExplorer depends on blockchain node (https://github.com/Ratimon/full-stack-blockchain-network.git) running in the backend. Explorer requests for blockchain periodically, 10s of seconds, from trusted node over HTTP Get. If the NgExplorer and blockchain node are placed on different servers, secured and reliable connection, as in internal network, is assumed for proper operation. 

## Design

NgExplorer consists of the following components and services.

Application component - Main entry point of NgExplorer service. HTML header is laid out with section pointers to other components
Query view component - Search box for transaction. User enters transaction ID to display the transaction detail
List view component - Periodic refresh the data and display of blockchain and transaction. It pulls update from node periodically. Display shows latest blocks on the left pane, and, latest transactions on the right pane. User could navigate back and forth among the lists
Pubsub service - Interface conduit for asynchronous call to retrieve data. HTTP client is used to Get data from blockchain node
Message service - Logging service serving all components and services. Application log is displayed at the bottom of webpage for development only
Redis component - Initial conduit built for subscription of blockchain broadcast from blockchain node. Redis client JS module compatibility has yet to be resolved. HTTP client was introduced to replace Redis client

## HTTP client Get Unknown Error

Modern browsers refuse to accept control access from different origin, node at 'http://localhost:3000' in this case. That is meant to protect the user devices against CORS intrusion. There are 2 solutions to this situation.

First option, the recommended one, is to add {Allow-Control-Access-Origin: 'localhost:3000'} in HTTP response header at the server, i.e. the blockchain node.  

Second option, the workaround only for development test, is to disable web security of the web browser. For instance, launch Chrome on Windows with "--disable-web-security" flag, as shown below, to accept control access from different origin.

C:\Program Files (x86)\Google\Chrome\Application>chrome --disable-web-security --user-data-dir="c:\temp"

## To do list

This is a prototype of blockchain explorer based on Angular CLI 7 and Node 8. It's portable across Win32, Linux and MacOS X abeit recompilation ("ng build") is required. The user interface is engineering oriented for proof-of-concept and functional. More could be done to improve the application in the next and subsequent releases.

It's worth to explore secured web socket (WSS) for interprocess communication with blockchain node. That will potentially reduce the latency in updating the blockchain. The periodic HTTP Get request and response introduces fixed latency in the data update. The WSS also provides secured and always-on connection between the explorer and node.

Another major aspect to explore is differential update. That is process and data lighter than transferring, comparing and replacing the whole chain everytime. As the blockchain node has performed validation, comparison and update on the blockchain, it's repetitive effort to carry out similar cycles on explorer. The blockchain explorer and node work together as trusted pair. Explorer could read from a common data store to update the data incrementally. This makes the scaling feasible when the blockchain data grows over time. 

Integration of explorer with node is another possibility to enhance the scalability of the network while serving data exploration. Explorer and node could share a common in-memory data store for performance and resource optimization. Explorer only reads from the data store while node manage and update the store. 

Further down the horizon, it is feasible to morph explorer and node into microservices. That will allow the network to leverage on the autoscaling, multi-tier and multi-zone capabilities in many public clouds. Such capabilities could serve even higher transaction rate and achieve elastic scaling in response toor anticipation of fluctuating rate. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
