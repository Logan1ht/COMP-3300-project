# COMP-3300 Final Project: Student Profile Viewer

##  📌 Introduction
This project is a web application designed to display and manage student profiles. It allows users to search, filter, and paginate through student data.

## User Stories S1
Sprint 1 User Stories (Core Profile Display)
- View Student Profiles:

As a recruiter, I want to view a list of student profiles so I can explore potential candidates.

- See Full Profile Details:

As a recruiter, I want to see full details of each student (name, email, degree, GPA, employer, education level, skills) so I can evaluate their qualifications.

- Clean & Readable Layout:

As a user, I want the profile layout to be organized and easy to read so I can quickly scan important information.

- Display All Profiles on Load:

As a user, I want all student profiles to appear automatically when I load the app so I don’t have to click anything first.

- Basic Search Bar (Initial Setup):

As a recruiter, I want to type a name or keyword into a search bar to check if basic search logic works correctly (initial functionality).

## user stories S2
Sprint 2 User Stories (Filtering, Pagination, Responsiveness)
-Filtering by Degree:

As a recruiter, I want to filter student profiles by degree so I can find candidates with specific academic backgrounds.

-Filtering by Employer:

As a recruiter, I want to filter students by their current or previous employer to identify relevant work experience.

-Filtering by Education Level:

As a recruiter, I want to filter profiles based on education level (e.g., Undergraduate, Graduate) to match my hiring criteria.

-Filtering by GPA:

As a recruiter, I want to view students based on GPA thresholds to focus on high-performing candidates.

-Filtering by Gruaduation Year:
A recruiter, would like to view students graduating in a specific year.

-Filtering by Certifications:
A recruiter would like to view students with industry-recognized credentials. 

-Filtering by Location:
A recruiter would like to see a students based on preferred work location (Remote, In-office, Hybrid).

-Filtering by Organizations:
A recruiter would like to find members of professional organizations like IEEE, NSBE, SWE, and ACM.

-Keyword Search Bar:

As a recruiter, I want to search for students by name, degree, employer, or skills using a search bar so I can quickly locate specific profiles.

-Pagination Controls:

As a user, I want to navigate between pages of results so that I'm not overwhelmed by seeing too many profiles at once.

-Clear Filter Option:

As a recruiter, I want to reset filters easily to go back to viewing all student profiles without refreshing the page.

-Consistent UI Across Devices:

As a user, I want the filtering and pagination interface to be clean and user-friendly so that I can easily interact with the app.

-Mobile Responsiveness:

As a recruiter accessing the app on a mobile device, I want the layout and filters to adjust to my screen size so that I can browse profiles easily on the go.



## 🔧 Features
- View student profiles (Name, Email, Degree, GPA, etc.)
- Search functionality
- Filter by fields (e.g., degree, employer)
- Pagination of profiles
- Responsive layout for desktop and mobile
- JSON backend using `json-server`

## 🛠️ Technology Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** JSON Server (`db.json`)
- **Hosting/Dev:** StackBlitz
- **Version Control:** GitHub

## 🚀 How to Run the App
1. Clone the repository from GitHub
2. Install dependencies:
``bash
npm install json-server http-server
3. Start the backend server: npm run backend
4. Start the frontend server: npm run frontend
5. Open the provided localhost or StackBlitz preview link in your browser

## 🧪 Testing Instructions
- Open the app
- Type a name or keyword in the search bar
- Confirm profiles display correctly
- Try filtering by degree or employer
- Navigate using pagination
- Test on both desktop and mobile viewports

## 👥 Team Members and Roles
- **Charles Taylor** – Project Manager  
- **Mason Walton** – Frontend Developer  
- **Jeremiah Wiseman** – UI/UX Designer  
- **Tierstin Taylor** – Backend/Data Developer  
- **India Harris** – QA & Documentation Lead

## ⚠️ Known Issues / Future Improvements
- Future: Add sorting functionality
- Improve mobile responsiveness
- Add features like edit/delete student profiles

## WOULD LIKE TO SEE IN SPRINT 3
- Filters: Grauduation Year, Certifications, Location, Organizations
- Profiles per Page: A fixed number of student profiles appear per page (e.g., 20 per page).
- Continue to test new features
- Roles remain the same

FEATURES
- -Filtering by Gruaduation Year:
A recruiter, would like to view students graduating in a specific year.

-Filtering by Certifications:
A recruiter would like to view students with industry-recognized credentials. 

-Filtering by Location:
A recruiter would like to see a students based on preferred work location (Remote, In-office, Hybrid).

-Filtering by Organizations:
A recruiter would like to find members of professional organizations like IEEE, NSBE, SWE, and ACM.

# Sprint 3 user stories
-As a recruiter, I want to filter student profiles by Graduation Year so I can target students graduating in a specific timeframe.

-As a recruiter, I want to filter student profiles by Certifications so I can find candidates with industry-recognized credentials.

-As a recruiter, I want to filter student profiles by Location so I can see students based on their preferred work setting (Remote, In-office, Hybrid).

-As a recruiter, I want to filter student profiles by Organizations so I can discover candidates involved in professional communities like IEEE, NSBE, SWE, and ACM.

-As a recruiter, I want to view only 10 profiles per page so the information is easier to browse and not overwhelming.

-As a developer, I want to ensure new features like filtering and pagination are tested so we can maintain quality and catch bugs early.

-As a team member, I want to continue building on existing functionality without breaking current working features.

sprint_4_user_stories = """
## ✅ Final User Stories – Sprint 4

### 📄 As a recruiter:
- I want to **filter profiles by multiple criteria** (degree, location, certification, organization, graduation year) so I can find candidates that meet my requirements.
- I want to **clear all filters** easily so I can start a new search without refreshing the page.
- I want to **choose how many profiles appear per page** (e.g., 10, 20, 50) so I can customize how I browse results.
- I want to **scroll vertically through profiles** smoothly like modern websites (e.g., Apple) for a premium experience.
- I want the website to **look visually clean and modern** so it’s pleasant to use and feels professional.
- I want a **dark mode option** so I can switch themes based on my preference or environment.
- I want to **hover or flip cards** to quickly see more student details without opening a new page.
- I want the **filter panel to be redesigned** in a side or collapsible panel like Apple for better navigation.
- I want to **search students by keyword** and get live updates to the displayed profiles.
- I want to **see a creative site name and header branding** so the tool feels polished and unique.
- I want to **navigate the site easily on mobile and desktop** so I can access student data from anywhere.