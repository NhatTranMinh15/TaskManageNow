-- INSERT INTO "user" (id, username, email, first_name, last_name, created_at, updated_at, created_by, updated_by, created_user_id, updated_user_id) VALUES ('00000000-0000-4000-8000-000000000000', 'admin', 'admin@taskmanagenow.com' ,'Admin', 'Admin', now(), null, '00000000-0000-4000-8000-000000000000', null, '00000000-0000-4000-8000-000000000000', null);
-- INSERT INTO "user" (id, username, email, first_name, last_name, created_at, updated_at, created_by, updated_by) VALUES ('00000000-0000-4000-8000-000000000000', 'admin', 'admin@taskmanagenow.com' ,'Admin', 'Admin', now(), null, '00000000-0000-4000-8000-000000000000', null);
-- INSERT INTO "user" (id, username, email, first_name, last_name, created_at, updated_at, created_by, updated_by, created_user_id, updated_user_id) VALUES ('00000000-0000-4000-8000-000000000000', 'admin', 'admin@taskmanagenow.com' ,'Admin', 'Admin', now(), null, '00000000-0000-4000-8000-000000000000', null, '00000000-0000-4000-8000-000000000000', null);

INSERT INTO public.category VALUES ('2024-12-16 11:00:07.375038', NULL, '00000000-0000-4000-8000-000000000000', '8c098720-d97f-4a10-8d56-9451d2cc9ac3', NULL, NULL, 'Technology', 'technology') ON CONFLICT DO NOTHING;
INSERT INTO public.category VALUES ('2024-12-16 11:00:07.375038', NULL, '00000000-0000-4000-8000-000000000000', '9b6e1fbb-2be8-4f98-bf3f-9f93535816c4', NULL, NULL, 'Health', 'health') ON CONFLICT DO NOTHING;
INSERT INTO public.category VALUES ('2024-12-16 11:00:07.375038', NULL, '00000000-0000-4000-8000-000000000000', '225eb58f-191b-4628-8933-579de769e060', NULL, NULL, 'Travel', 'travel') ON CONFLICT DO NOTHING;
INSERT INTO public.category VALUES ('2024-12-16 11:00:07.375038', NULL, '00000000-0000-4000-8000-000000000000', '2a95911c-d3b6-4387-b114-9c60356581fa', NULL, NULL, 'Education', 'education') ON CONFLICT DO NOTHING;
INSERT INTO public.category VALUES ('2024-12-16 11:01:31.042425', NULL, '00000000-0000-4000-8000-000000000000', '0bf0f4ad-304b-453f-bf79-de1f1c827c08', '8c098720-d97f-4a10-8d56-9451d2cc9ac3', NULL, 'LLM', 'llm') ON CONFLICT DO NOTHING;
INSERT INTO public.category VALUES ('2024-12-16 11:01:31.042425', NULL, '00000000-0000-4000-8000-000000000000', '19998d84-ad6d-4d25-92f9-625f3c6fc27f', '8c098720-d97f-4a10-8d56-9451d2cc9ac3', NULL, 'AI', 'ai') ON CONFLICT DO NOTHING;
INSERT INTO public.category VALUES ('2024-12-16 11:02:00.80252', NULL, '00000000-0000-4000-8000-000000000000', '126514b3-6548-469c-a2a7-a03bb7e71632', '2a95911c-d3b6-4387-b114-9c60356581fa', NULL, 'Science', 'science') ON CONFLICT DO NOTHING;










