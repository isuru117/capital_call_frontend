# Capital Call Application

A simple, user-friendly frontend interface for managing Capital Call data.

## Demo
#### View a live demo at : [Capital Call Frontend Demo](https://ccapp.isuruedirisinghe.com/)

[Video-Demo-Capital-Call-App.webm](https://github.com/user-attachments/assets/39c93ccc-1f43-4329-bb0f-ac1463509f31)

## Requirements
- **Node**: Version 16 or later
- **Vue**: Version 3.5 or later
- **Vite**: Version 5.4 or later


## Setup

To get started, follow these steps:

```bash
# Install dependencies
npm i

# Serve the application
npm run dev
```

## Application Features & Assumptions
- **Initial Bill Generation**: A predefined set of bills for each type is created for an Investor upon registration, if applicable. Additional bills can be added through the Investor Details view.
- **Automated Fee Calculation**: Bill fees are calculated automatically based on the Investor's investment amount when new bills are added.
- **Flexible Bill Grouping**: Bills associated with an Investor can be grouped without restrictions.
- **Capital Call Modifications**: Only the status or due date can be modified for a generated Capital Call.
