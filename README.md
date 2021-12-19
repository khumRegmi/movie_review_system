# movie_review_system




<h4>This is a movie review system where the users can write reviews of movies and other users can upvote (helpful) or downvote (unhelpful) those reviews. 
  <br/>So, for example, a user named John writes a review on the movie. Another person named Alice can upvote or downvote that review.</h4>


_Models_
1. User (name, email)
2. Movie (title, genre [array], year, director
3. Review (user_id -> the User id who posted the review, movie_id -> The movie id the review is about, content, upvote [int], downvote[int], votes[array of objects])

<p>The votes array would be an array of objects, referring to each upvote/downvote cast by a user. The basic structure of each object would be { user_id, vote_type [“up”/”down”] }. If the vote_type is “up”, you add 1 to the model’s upvote field, otherwise to the downvote field. One user can cast one and only one vote on a specific review. [check during posting reviews; if userid exists return cannot add a review]
</p>


| Endpoint                      | Request Type           |       Action                                    |
| ----------------------------- | ---------------------- |-------------------------------------------------
| /users                        | POST                   | Create User
| /users/:id                    | GET                    | Get user info with the given id
| /movies                       | POST                   | Create a movie
| /movies/:id                   | GET                    | Get the movie info with id
| /movies/:id                   | PATCH                  | Update movie information
| /movies/:id/reviews           | GET                    | Get all the reviewa of the movie with 'id'
| /movies/:id/reviews           | POST                   | Create a review for the given movie with 'id'
| /movies/:id/reviews/:reviewId | GET                    | Get the specific review
| /movies/:id/reviews/:reviewId | DELETE                 | Delete the specific review
| /movies/:id/reviews/:reviewId | POST                   | Create a vote (up/down)


