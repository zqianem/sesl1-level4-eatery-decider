drop table if exists
  eat_sessions;

drop function if exists
	get_vote_count;

drop function if exists
	add_vote;

create table
  public.eat_sessions (
    id uuid not null default uuid_generate_v4 (),
    created_at timestamp with time zone not null default now(),
    options jsonb not null default '[]'::jsonb,
    votes jsonb not null default '[]'::jsonb,
    votes_required integer not null default 2,
    winner integer null,
    constraint eat_sessions_pkey primary key (id)
  ) tablespace pg_default;

alter table
  eat_sessions enable row level security;

create function
	get_vote_count(id uuid)
		returns integer
		language sql
		as $$
			select jsonb_array_length(votes)
			from eat_sessions
			where id = $1;
		$$;

create function
	add_vote(id uuid, vote jsonb)
		returns jsonb
		language sql
		as $$
			update eat_sessions
			set votes = votes || jsonb_build_array(vote)
			where id = $1 and jsonb_array_length(votes) < votes_required
			returning votes;
		$$;
