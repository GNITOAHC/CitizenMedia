# Routes

## Auth

<details>
<summary> /auth </summary>

POST /auth/google

```ts
/* req */
{ id_token: string }
/* res */
{
  user: {
    { name: string, email: string, avatar: string, jwt_token: string, id: string }
  }
}
/* jwt_token */
jwt_token = {
    name: string,
    email: string,
    id: string
}
```

POST /auth/credentials

```ts
/* req */
{ email: string, password: string }
/* res */
{ name: string, email: string, avatar: string, jwt_token: string, id: string }
/* jwt_token */
jwt_token = {
    name: string,
    email: string,
    id: string
}
```

POST /auth/register

```ts
/* req */
{ username: string, email: string, password: string }
/* res */
{ message: string }
```

GET /auth/verify

```ts
/* req */
{
  headers: {
    authorization: jwt_token
  }
}
/* res */
{
  verified: boolean
}
```

POST /auth/forget-password

```ts
/* req */
{ email: string }
/* res */
{ resetToken: string, id: string } // Will send links to req.body.email
```

POST /auth/reset-password

```ts
/* req */
{ id: string, password: string, token: string } // Token is the resetToken get from /auth/forget-password
/* res */
{ message: string }
```

</details>

## Story

<details>
<summary> /story </summary>

POST /story/retrieveById

```ts
/* req */
{
  id: string
} // Id of the story
/* res */
{
  story: {
    /* story object */
  }
}
```

GET /story/retrieve

```ts
/* req */
{
  headers: {
    authorizations: string
  }
}
/* res */
;[
  {
    /* story object */
  },
]
```

POST /story/like

```ts
/* req */
{ storyId: string, userId: string }
/* res */
string // ('Unlike success' or 'Like success')
```

POST /story/create

```ts
/* req */
{ id: string, content: string, title: string, subTitle: string, tags: string[] }
/* res */
{ message: string, newStoryId: string }
```

POST /story/comment

```ts
/* req */
{ id: string, comment: string, commenter_id: string } // id: Id of the story
/* res */
string
```

</details>

## User

<details>
<summary> /user </summary>

GET /user/profile-links

```ts
/* req */
{
  headers: {
    authorization: string
  }
}
/* res */
{
  profileLinks: {
    user.prfileLInks
  }
}
```

```ts
user.profileLinks: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    website: { type: String },
},
```

POST /user/profile-links

```ts
/* req */
{ facebook: string, twitter: string, instagram: string ... }
// available options: facebook, instagram, twitter, linkedin, youtube, website
// leave blank to delete, e.x.
{ facebook: 'https://facebook.com', instagram: '' }
/* res */
{ profileLinks: { user.profileLinks } }
```

</details>
