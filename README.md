# Capital Call Application
A simple frontend for managing Capital Call data 

# Demo
### You can view a live demo at : https://ccapp.isuruedirisinghe.com/
[Video-Demo-Capital-Call-App.webm](https://github.com/user-attachments/assets/f75d9e59-390d-437f-a9a6-f3b6077eb878)

# Requirements
- node 16 or later
- vue 3.5 or later
- vite 5.4 or later

# Setup
``` bash
# install dependencies
> npm i
# serve app
> npm run dev
```

# Assumptions
- An inital set of bills of each type generated for Investor upon registration if applicable. Further bills can be added from InvestorDetails view.
- Bill fees calculated automatically when adding new bills based on investment amount of the Investor.
- Allowed grouping of bills belonging to Investor without restriction.
- Only the status or the due date is allowed to be modified for a generated Capital Call.
