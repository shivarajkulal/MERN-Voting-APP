# Voting System Documentation

This repository contains the documentation for the Voting System, outlining the processes for both users and administrators.

##Flow Diagram

![Flow Diagram](https://github.com/shivarajkulal/MERN-Voting-APP/raw/master/flowdiagram.png)


## Processes Overview

1. **Logged-in Users:**
   - **Access Profile:** GET `/profile`
   - **Change Password:** PUT `/profile/password`
   
2. **Non-Logged-in Users:**
   - **See List of Candidates:** GET `/candidates`
   - **Vote for a Candidate:** POST `/vote/:candidateId`
   - **See Vote Results:** GET `/vote/count`

## Process for Voters

1. **Retrieve List of Candidates:**
   - **Request:** GET `/candidates`
   - **Response:** List of available candidates
   
2. **Cast Vote:**
   - **Request:** POST `/vote/:candidateId`
   - **Parameters:** `:candidateId` (unique identifier of chosen candidate)
   - **Role:** Voter
   
3. **View Vote Count:**
   - **Request:** GET `/vote/count`
   - **Response:** Vote count for each candidate

## Process for Administrators

1. **Manage Candidates:**
   - **Retrieve List of Candidates:**
     - **Request:** GET `/candidates`
     - **Response:** List of all candidates
     
   - **Create New Candidate:**
     - **Request:** POST `/candidates`
     - **Parameters:** Candidate details
     - **Role:** Administrator
     
   - **Update Candidate Information:**
     - **Request:** PUT `/candidates/:candidateId`
     - **Parameters:** `:candidateId` (unique identifier of candidate), updated candidate information
     - **Role:** Administrator
     
   - **Delete Candidate:**
     - **Request:** DELETE `/candidates/:candidateId`
     - **Parameters:** `:candidateId` (unique identifier of candidate)
     - **Role:** Administrator

## How to Use

To get started with the Voting System, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies.
3. Start the application.
4. Follow the provided endpoints to interact with the system.
5. For administrators, make sure to authenticate properly to access administrative functionalities.

## Contributors

- [Shivaraj](https://github.com/shivarajkulal)


