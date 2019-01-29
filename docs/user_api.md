# API

## Users - Add

### **POST** - /api/users

#### Description

Adds a User and can associate with a Group.

Example API call:

### Request

```
POST /api/users

{
    "name":"Jane Doe",
    "groups":[
                "2"
              ]
}
```

### Response

```
{
  "id": 7,
  "name": "Jane Doe",
  "created_at": "2019-01-29 18:31:26",
  "updated_at": "2019-01-29 18:31:26",
  "groups": [
    {
      "id": 2,
      "name": "Administrator",
      "created_at": "2019-01-29 14:50:04",
      "updated_at": "2019-01-29 14:50:04"
    }
  ]
}
```

## Users - Edit

### **PATCH** - /api/users

#### Description

Updates a User and can update the associated Groups.

Example API call:

### Request

```
PATCH /api/users/:id

{
    "name":"Jane Doe",
    "groups":[
                "2"
              ]
}
```

### Response

```

```

## Users - Delete

### **DELETE** - /api/users/:id

#### Description

Deletes a USer.

Example API call:

### Request

```
DELETE /api/users/:id
{}
```

### Response

```

```



## Users - List

### **GET** - /api/users

#### Description

Lists Users and associated Groups.

Example API call:

### Request

```
GET /api/users
```

### Response

```
[
  {
    "id": 2,
    "name": "Janeth Doe",
    "created_at": "2019-01-29 14:16:33",
    "updated_at": "2019-01-29 18:32:49",
    "groups": []
  },
  {
    "id": 4,
    "name": "Jane Doe",
    "created_at": "2019-01-29 14:23:42",
    "updated_at": "2019-01-29 18:21:45",
    "groups": [
      {
        "id": 2,
        "name": "Administrator",
        "created_at": "2019-01-29 14:50:04",
        "updated_at": "2019-01-29 14:50:04"
      },
      {
        "id": 3,
        "name": "Editors",
        "created_at": "2019-01-29 17:21:03",
        "updated_at": "2019-01-29 17:51:13"
      }
    ]
  }
]
```