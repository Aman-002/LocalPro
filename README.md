# LocalPro

LocalPro is a local service marketplace where you can provide and consume services from skilled professionals in your town. It ensures a secure and trustworthy platform for all your household solutions.

## Features

- Browse and hire local service providers for various household tasks.
- Register as a service provider and offer your skills to the community.
- Secure and reliable platform ensuring trust between users and providers.
- User-friendly interface with easy navigation and service discovery.
- Ratings and reviews system to maintain service quality.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, Lucide Icons
- **Backend:** Java, Spring Boot, Spring Security
- **Database:** PostgreSQL
- **Authentication:** JWT
- **APIs:** RESTful API for service and provider management

## Installation

### Backend

1. Clone the repository:
2. Navigate to the backend folder:
  - cd localpro/backend
3. Build the project with Maven:
  - mvn clean install
4. Configure your PostgreSQL database in application.properties:
  - spring.datasource.url=jdbc:postgresql://localhost:5432/localpro
  - spring.datasource.username=your_username
  - spring.datasource.password=your_password
  - spring.jpa.hibernate.ddl-auto=update
5. Run the Spring Boot application:
  - mvn spring-boot:run

### Frontend


1. Navigate to the frontend folder:
  - cd ../frontend
2.Install dependencies:
  - npm install
3. Start the development server:
  - npm start
4. Open your browser at http://localhost:3000

### Usage

Browse services, hire providers, or register as a provider.
Admins can manage users, providers, and services from the backend API.

### Contributing

Contributions are welcome!
To contribute:
  - Fork the repository
  - Create a feature branch
  - Commit your changes
  - Open a Pull Request

### License
This project is licensed under the MIT License.




   ```bash
   git clone https://github.com/your-username/localpro.git
