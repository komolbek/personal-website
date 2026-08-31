-- HubLead.productId is required and Hub lists leads only under a product, so
-- inbound enquiries from necto.uz need a product row to belong to. This is not
-- a SaaS product like the others; it is the home for website leads.
INSERT INTO "hub"."hub_products" ("id", "name", "slug", "status", "description", "url", "created_at")
VALUES (
    'necto_website_leads',
    'Necto',
    'necto',
    'ACTIVE',
    'Inbound enquiries from the necto.uz contact form.',
    'https://necto.uz',
    CURRENT_TIMESTAMP
)
ON CONFLICT ("slug") DO NOTHING;
