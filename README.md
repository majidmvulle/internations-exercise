# internations-exercise
InterNations - User management system

## To run
- Copy .env.dist to .env
    - Change database configurations and other configurations
- Run `./build.sh`. Give the env as the first argument, example `./build.sh prod`
    - it runs `composer install`
    - it runs `yarn install && yarn run build --$env`
    - it creates the database if it doesn't exist
    - it runs migrations `bin/console doctrine:migrations:migrate`
         
## Features

- Add users — a user has a name.
- Delete users.
- Assign users to a group they aren’t already part of.
- Remove users from a group.
- Create groups.
- Delete groups when they no longer have members.
- REST API Documentation for Users is available [here](./docs/user_api.md)
- REST API Documentation for Groups is available [here](./docs/group_api.md)

## UI Screenshots

### Homepage
![Homepage](./docs/index.png?raw=true "Homepage")

### Add User
![Add User](./docs/add-user.png?raw=true "Add User")

### Edit User
![Edit User](./docs/edit-user.png?raw=true "Edit User")


### Add Group
![Add Group](./docs/add-group.png?raw=true "Add Group")

### Edit Group
![Edit Group](./docs/edit-group.png?raw=true "Edit Group")


## Technologies
- Backend: PHP ([Symfony 4 PHP Framework](https://symfony.com/))
- Frontend: [react.js](https://reactjs.org/), [Bootstrap 4](https://getbootstrap.com/)
