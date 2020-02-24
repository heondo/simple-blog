select p.id, p.date_created, p.content, mc.matching_comments from posts p left join (select 
  c.posts_id, 
  json_agg(
    json_build_object(
      'id', c.id, 'date_created', c.date_created, 
      'content', c.content
    )
  ) matching_comments
from 
  comments c 
where 
  to_tsvector(c.content) @@ to_tsquery('tables') 
group by 
  c.posts_id ) as mc
  on mc.posts_id = p.id
  where to_tsvector(p.content) @@ to_tsquery('tables') or mc.matching_comments is not null
  -- select * from comments where to_tsvector(content) @@ to_tsquery('values')
  -- select * from posts where to_tsvector(content) @@ to_tsquery('values')
  -- WHERE to_tsvector(title) @@ to_tsquery('squire:*')

-- This is the query to return posts that having matching comments or post content,
-- I however want the comments in the matching comments array to have the matching texts for each comment or relevant so I can show the matching contents in the search results

with main as (
  select 
    c.*, 
    regexp_matches(
      c.content, '.{0,20}values.{0,20}', 
      'ig'
    ) matches 
  from 
    comments c 
  where 
    to_tsvector(c.content) @@ to_tsquery('values') 
  group by 
    id
) 
select 
  posts_id, 
  json_agg(
    json_build_object(
      'id', main.id, 'comment', main.content, 
      'matches', matches
    )
  ) match_arr 
from 
  main 
group by 
  posts_id

-- returns table with posts id and an array of json objects containig the comment id, comment, and matched text

with main as (
  select 
    c.*, 
    regexp_matches(
      c.content, '.{0,20}values.{0,20}', 
      'ig'
    ) matches 
  from 
    comments c 
  where 
    to_tsvector(c.content) @@ to_tsquery('values') 
  group by 
    id
), mc as (
	select 
  posts_id, 
  json_agg(
    json_build_object(
      'id', main.id, 'comment', main.content, 
      'matches', matches
    )
  ) matching_comments,
	count(*) num_comments
from 
  main 
group by 
  posts_id
)
select p.id, p.date_created, p.content, mc.matching_comments, mc.num_comments from posts p left join mc on mc.posts_id = p.id
where to_tsvector(p.content) @@ to_tsquery('values') or mc.matching_comments is not null

-- combined query with blog thoughts search, will then add column for matched thought text. That should be sufficient to send data forward to the front end and display at that point