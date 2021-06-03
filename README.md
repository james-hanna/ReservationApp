# Reservation Setter
This is an application used by restaurant employees to schedule reservations.



### 1. Working Prototype 
You can access a working prototype of the React app here: https://reservation-app-frontend-7dx7kk0ax-james-hanna.vercel.app/dashboard



### 2. User Stories 
This app is for one type of user: a restaurant employee.


###### US-01 Create and list reservations
As a restaurant manager
I want to create a new reservation when a customer calls
so that I know how many customers will arrive at the restaurant on a given day.




###### US-02 Create reservation on a future, working date
As a restaurant manager
I only want to allow reservations to be created on a day when we are open
so that users do not accidentally create a reservation for days when we are closed.




###### US-03 Create reservation within eligible timeframe
As a restaurant manager
I only want to allow reservations to be created during business hours, up to 60 minutes before closing
so that users do not accidentally create a reservation for a time we cannot accommodate.




###### US-04 Seat reservation
As a restaurant manager,
When a customer with an existing reservation arrives at the restaurant
I want to seat (assign) their reservation to a specific table
so that I know which tables are occupied and free.




###### US-05 Finish an occupied table
As a restaurant manager
I want to free up an occupied table when the guests leave
so that I can seat new guests at that table.




###### US-06 Reservation Status
As a restaurant manager
I want a reservation to have a status of either booked, seated, or finished
so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.




###### US-07 Search for a reservation by phone number
As a restaurant manager
I want to search for a reservation by phone number (partial or complete)
so that I can quickly access a customer's reservation when they call about their reservation.




###### US-08 Change an existing reservation
As a restaurant manager
I want to be able to modify a reservation if a customer calls to change or cancel their reservation
so that reservations are accurate and current.





### 3. Functionality
The app's functionality includes:
* Every User has the ability to create and edit Tables and Reservations



### 4. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, RESTful API Endpoints, Postgres
* Development Environment: DBeaver



### 5. Wireframes
(Example) Landing Page
:-------------------------:
![Landing Page](/github-images/wireframes/landing-page-wireframe.png)
Register Page
![Register Page](/github-images/wireframes/register-page-wireframe.png)



### 6. Front-end Structure - React Components Map
* __Index.js__ 
    * __App.js__ 
        * __Layout.js__
            * __Menu__  -
            	*__Dashboard__
		*__Search__
		*__New_Reservation__
		*__New_Table__
            * __Routes__ (stateful) -
        




### 7. API Documentation

| Endpoint                               | Method | Description                                                                                           |
| -------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `/reservations`                        | GET    | Retrieves all existing reservation. 							          |
| `/reservations`                        | POST   | Creates a new reservation.                                                                            |
| `/reservations/:reservation_id`        | GET    | Gets the reservation with specific 'reservation_id'.                                                  |
| `/reservations/:reservation_id`        | PUT    | Updates the reservation.                                                                              |
| `/reservations/:reservation_id/status` | PUT    | Updates the reservation status.                                                                       |
| `/tables`                              | GET    | Retrieves all existing tables.                                                                        |
| `/tables`                              | POST   | Creates a new table.                                                                                  |
| `/tables/:tableId/seat`                | PUT    | Assigns a reservation to a table.                                                                     |
| `/tables/:tableId/seat`                | DELETE | Clears a table for future use.                                                                        |


### 9. Screenshots
Dashboard
:-------------------------:
![Dashboard](https://imgur.com/dcpANT9)

Search
:-------------------------:
![Search](https://imgur.com/DDEBNRu)

Add Reservation
:-------------------------:
![Add Reservation](https://imgur.com/g7fgto2)

Add Table
:-------------------------:
![Add Table](https://imgur.com/qgp5oth)




### 11. How to run it 
Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

##### Local Node scripts
* To install the node project ===> npm install
* To Run backend node ===> npm run start
* To run tests ===> npm run test
