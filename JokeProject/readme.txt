--- all rest calls are of type "GET" ---

Delete a joke (with joke key):
http://localhost:8081/Delete?jokeKey= + jokeKey

Upvote (or downvote) with joke key, integer is of your choice:
http://localhost:8081/Vote?jokeKey=" + jokeKey + "&integer=" + integer

Get jokes by category:
http://localhost:8081/Jokes?category=" + category

Submit a new joke to a category:
http://localhost:8081/Submit?&category=" + category + "&joke=" + joke
