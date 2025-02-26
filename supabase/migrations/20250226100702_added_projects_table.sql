create table "public"."Projects" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text,
    "user_id" uuid not null
);


alter table "public"."Projects" enable row level security;

CREATE UNIQUE INDEX "Projects_pkey" ON public."Projects" USING btree (id);

alter table "public"."Projects" add constraint "Projects_pkey" PRIMARY KEY using index "Projects_pkey";

alter table "public"."Projects" add constraint "Projects_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Projects" validate constraint "Projects_user_id_fkey";

grant delete on table "public"."Projects" to "anon";

grant insert on table "public"."Projects" to "anon";

grant references on table "public"."Projects" to "anon";

grant select on table "public"."Projects" to "anon";

grant trigger on table "public"."Projects" to "anon";

grant truncate on table "public"."Projects" to "anon";

grant update on table "public"."Projects" to "anon";

grant delete on table "public"."Projects" to "authenticated";

grant insert on table "public"."Projects" to "authenticated";

grant references on table "public"."Projects" to "authenticated";

grant select on table "public"."Projects" to "authenticated";

grant trigger on table "public"."Projects" to "authenticated";

grant truncate on table "public"."Projects" to "authenticated";

grant update on table "public"."Projects" to "authenticated";

grant delete on table "public"."Projects" to "service_role";

grant insert on table "public"."Projects" to "service_role";

grant references on table "public"."Projects" to "service_role";

grant select on table "public"."Projects" to "service_role";

grant trigger on table "public"."Projects" to "service_role";

grant truncate on table "public"."Projects" to "service_role";

grant update on table "public"."Projects" to "service_role";

create policy "Projects Global Policy"
on "public"."Projects"
as permissive
for all
to authenticated
using ((auth.uid() = user_id));



