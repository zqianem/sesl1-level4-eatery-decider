drop table
  eat_sessions;

create table
  public.eat_sessions (
    id uuid not null default uuid_generate_v4 (),
    created_at timestamp with time zone not null default now(),
    options jsonb[] not null default '{}'::jsonb[],
    preferences jsonb[] not null default '{}'::jsonb[],
    preferences_required smallint not null default 2,
    selection jsonb null,
    constraint eat_sessions_pkey primary key (id)
  ) tablespace pg_default;

alter table
  eat_sessions enable row level security;
