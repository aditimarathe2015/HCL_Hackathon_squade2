# React + Vite 
# Credit Card Application System

A full-stack application that allows users to apply for a credit card, tracks application status, and automates approval decisions based on business rules. and showing  credit score 


#  Features

* Apply for credit card
* Automatic credit score validation 
* Approval / rejection logic
* Credit limit assignment
* Track application status
* Secure authentication (JWT)
* Accessablity


#  Architecture

## High-Level Design (HLD)

Frontend (React -19.2.3(lsv))
        ↓
Backend (Json-server)

## Low level design
Redux for statemangment
mock json
Booststrap (handeling responsive ui)


## Components

### 1. Frontend

* ReactJS 
* Form handling
* API integration
* Status tracking UI


# Business Rules

* Applicant must be **> 18 years**
* No duplicate application within **6 months**
* Credit score fetched using **PAN**
* Approval Criteria:

  * Credit Score > 800 → Approved
  * Else → Rejected

## Credit Limit Rules


 Income Range           Credit Limit 
 ---------------------  ------------ 
 ≤ ₹2,00,000            ₹50,000      
 ₹2,00,000 – ₹3,00,000  ₹75,000      
 ₹3,00,000 – ₹5,00,000  ₹1,00,000    
> ₹5,00,000            Subjective   

#  Application Workflow

1. User submits application
2. System validates details
3. Credit score is fetched
4. Application is approved/rejected
5. Credit limit assigned (if approved)
6. Card dispatched
7. User tracks status

## Base URL

/api/v1

#  Authentication

* JWT-based authentication
* Token required for protected APIs

#  Environment Variables

Create `.env` file :

JWT_SECRET=your_secret_key


#  Security Considerations

* Input validation and sanitize inputs (avoide XSS)
* Role base Authorization
* Secure API endpoints
* Environment variable protection
* HTTPS enforcement


#  Future Enhancements

* Admin dashboard
* Manual approval override
* Email/SMS notifications
* Advanced credit scoring integration

#  Setup Instructions

## 1. Clone Repository

bash
git clone https://github.com/your-repo/credit-card-app.git
cd credit-card-app


## 2.  Setup

npm install
npm run dev


# Conclusion

This system demonstrates a scalable full-stack architecture with real-world business logic for credit card processing.
