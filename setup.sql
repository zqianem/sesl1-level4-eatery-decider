drop table
  eat_sessions;

create table
  public.eat_sessions (
    id uuid not null default uuid_generate_v4 (),
    created_at timestamp with time zone not null default now(),
    options jsonb[] not null default '{}'::jsonb[],
    votes smallint[][] not null default '{}'::smallint[][],
    votes_required smallint not null default 2,
    winner smallint null,
    constraint eat_sessions_pkey primary key (id)
  ) tablespace pg_default;

alter table
  eat_sessions enable row level security;

create or replace function
	get_vote_count(id uuid)
		returns smallint
		language sql
		as $$
			select coalesce(array_length(votes, 1), 0)
			from eat_sessions
			where id = eat_sessions.id;
		$$;

create or replace function
	get_winner(id uuid)
		returns jsonb
		language sql
		as $$
			select options[winner]
			from eat_sessions
			where id = eat_sessions.id;
		$$;
