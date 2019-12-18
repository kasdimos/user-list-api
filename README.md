# user-list
A table that displays a list of users with paging, sorting and filtering capabilities

## API

Insert a user:
```
POST /newUser
```
```json
{
    "name": "Nick",
    "email": "nick@gmail.com",
    "role": "user"
}
```


Get users (the limit is 20 users by default):
```
GET /users
```

Get users (change limit):
```
GET /users?limit=50
```

Get users (second page):
```
GET /users?page=2
```

Get users (changed limit, second page):
```
GET /users?limit=50&page=2
```

Get users (sorting):
```
GET /users?sortby=name
GET /users?sortby=email
GET /users?sortby=role
GET /users?sortby=signup
GET /users?sortby=lastLogin
GET /users?sortby=status
```

Get users (filter by name or email):
```
GET /users?filter=nick
```

Get users (changed limit, second page, sort by name, and filter):
```
GET /users?limit=50&page=2&sortby=name&filter=ni
```