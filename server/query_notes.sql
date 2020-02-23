select 
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
  to_tsvector(c.content) @@ to_tsquery('values') 
group by 
  c.posts_id 
  -- select * from comments where to_tsvector(content) @@ to_tsquery('values')
  -- select * from posts where to_tsvector(content) @@ to_tsquery('values')
  -- WHERE to_tsvector(title) @@ to_tsquery('squire:*')

