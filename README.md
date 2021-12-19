# movie_review_system




<h2>This is a movie review system where the users can write reviews of movies and other users can upvote (helpful) or downvote (unhelpful) those reviews. So, for example, a user named John writes a review on the movie. Another person named Alice can upvote or downvote that review.</h2>


_Models_
1. User (name, email)
2. Movie (title, genre [array], year, director
3. Review user_id -> the User id who posted the review, movie_id -> The movie id the review is about, content, upvote [int], downvote[int], votes[array of objects]*)

