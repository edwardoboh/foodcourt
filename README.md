<p align="center">
  <img src="https://res.cloudinary.com/class-attend/image/upload/v1673013921/logo_d3czjj.png" width="200" alt="FoodCourt Logo" />
</p>

## Description

[FoodCourt](https://getfoodcourt.com) is an on-demand convenience app that lets you order from a curation of the best food delivery brands & shops. Now you can order jollof rice, a burger, pounded yam & a bottle of wine all in a single order!.

## Installation

```bash
$ yarn install
```

## Environemnt setup
The environment variables for this app are contained in the ```.env``` file inside the project's Google Drive folder.


Copy the file into the project's root directory after Installing node modules.

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

# **Backend Developer Assessment**

#### **Submission Links**

- Postman Documentation: [Click Here]()
- API Production Link: []()
- Github Repository: [edwardoboh/foodcourt](https://github.com/edwardoboh/foodcourt)
- Google Drive Link: [Google Drive]()

---

This documnet provides information about my solution to the FoodCourt Backend Developer Assessment
which required that i build an API in Nestjs that allow it's admin users perform the following action on meal addons:

- create addons
- read single addon
- read all addons
- update addons
- delete addons
- create addon category


The following sections give more details into the API and the various design choices that were made.

## **High Level System Design**

The diagram below shows the various components of the system as can be infered from its requirements.

![high level diagram](https://res.cloudinary.com/class-attend/image/upload/v1660737498/class-attend/high_level_diagram_gllicu.jpg)

The API server handles user requests from FoodCourt's mobile app (and optianally from a web browser).The diagram above is a simplified representation of the system.
In reality, several components exist between those shown. For example,

There exists a DNS server that routes user request to our system, a Load Balancer (which might also function as a reverse proxy) could be placed between the mobile application and the web server to obviously balance load and can be configured to prevent DDoS attacks. Several caching layers could also exist in the system, to enable quick delivery of static content.

The database system used here is Postgres database, running on AWS RDS.

## **Design Assumptions**


## **Database Models**


## **Deployment Infrastructure**
Database:
**AWS RDS Postgres** Database

API Server:
**AWS EC2** instance running Ubuntu Linux

## **APENDIX**
### **Project Folder Structure**

## **Note:**