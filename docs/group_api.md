# API

## Groups - Add

### **POST** - /api/groups

#### Description

Adds a Group and can associate with Users.

Example API call:

### Request

```
POST /api/groups

{
    "name":"Administrators",
    "users":[
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

## Groups - Edit

### **PATCH** - /api/groups

#### Description

Updates a User and can update the associated Groups.

Example API call:

### Request

```
PATCH /api/groups/:id

{
    "name":"Administrator",
    "users":[
                "2",
                "5"
             ]
}
```

### Response

```

```

## Groups - Delete

### **DELETE** - /api/groups/:id

#### Description

Deletes a Group.

Example API call:

### Request

```
DELETE /api/groups/:id
{}
```

### Response

```

```

## Groups - List

### **GET** - /api/groups

#### Description

Lists Groups and associated Users.

Example API call:

### Request

```
GET /api/groups
```

### Response

```
[
  {
    "id": 2,
    "name": "Administrator",
    "created_at": "2019-01-29 14:50:04",
    "updated_at": "2019-01-29 14:50:04",
    "users": [
      {
        "id": 4,
        "name": "Jane Doe",
        "created_at": "2019-01-29 14:23:42",
        "updated_at": "2019-01-29 17:21:08",
        "groups": [
          {
            "id": 2,
            "name": "Administrator",
            "created_at": "2019-01-29 14:50:04",
            "updated_at": "2019-01-29 14:50:04"
          },
          {
            "id": 3,
            "name": "Editorsds",
            "created_at": "2019-01-29 17:21:03",
            "updated_at": "2019-01-29 17:38:42"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "Editors",
    "created_at": "2019-01-29 17:21:03",
    "updated_at": "2019-01-29 17:38:42",
    "users": [
      {
        "id": 4,
        "name": "Jane Doe",
        "created_at": "2019-01-29 14:23:42",
        "updated_at": "2019-01-29 17:21:08",
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
            "updated_at": "2019-01-29 17:38:42"
          }
        ]
      }
    ]
  }
]
```
