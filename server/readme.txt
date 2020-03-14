PS C:\vb\sandbox\graphql-playlist\server> nodemon app
nodemon : File C:\Users\vimal.bhatt\AppData\Roaming\npm\nodemon.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at
https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ nodemon app
+ ~~~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
PS C:\vb\sandbox\graphql-playlist\server> Set-ExecutionPolicy Unrestricted

Execution Policy Change
The execution policy helps protect you from scripts that you do not trust. Changing the execution policy might expose you to the security risks described in the about_Execution_Policies help topic at
https:/go.microsoft.com/fwlink/?LinkID=135170. Do you want to change the execution policy?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): Y
PS C:\vb\sandbox\graphql-playlist\server> nodemon app


queries:
----------------------------------------------
{
  books {
    id
    name
    genre
    author {
      name
    }
  }
  authors {
    name
    age
    books {
      name
    }
  }
  book(id: "5e6135de4e93614eac6d00bc") {
    name
    genre
    author {
      name
    }
  }
}

----------------------------------------------

mutation {
  addBook(name: "Five point someone", genre: "Fiction", authorId: "5e6133c39178b41730f87b2a") {
    name
    genre
  }
}

-------------------------------------------------
mutation {
  addAuthor(name: "RK Narayanan", age: 60) {
    name
    age
  }
}
----------------------------------------------

