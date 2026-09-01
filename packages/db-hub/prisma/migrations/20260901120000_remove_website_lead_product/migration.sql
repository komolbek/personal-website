-- Website enquiries are bespoke work and are recorded as HubProject rows with
-- status LEAD, which is what HubProject already models. They are not prospects
-- for a SaaS product, so the placeholder product that previously held them has
-- no purpose.
--
-- Guarded: only removed when nothing references it, so an environment where it
-- was used for something else keeps its data.
DELETE FROM "hub"."hub_products" p
 WHERE p."slug" = 'necto'
   AND NOT EXISTS (SELECT 1 FROM "hub"."hub_leads"    l WHERE l."product_id" = p."id")
   AND NOT EXISTS (SELECT 1 FROM "hub"."hub_clients"  c WHERE c."product_id" = p."id")
   AND NOT EXISTS (SELECT 1 FROM "hub"."hub_payments" y WHERE y."product_id" = p."id");
