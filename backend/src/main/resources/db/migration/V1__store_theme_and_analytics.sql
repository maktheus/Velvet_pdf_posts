-- Store visual theme (single row, singleton pattern)
CREATE TABLE IF NOT EXISTS store_theme (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    color_background   VARCHAR(7)   NOT NULL DEFAULT '#F5EDD8',
    color_primary      VARCHAR(7)   NOT NULL DEFAULT '#C4826A',
    color_dark         VARCHAR(7)   NOT NULL DEFAULT '#2D1A0E',
    color_medium       VARCHAR(7)   NOT NULL DEFAULT '#5A3A22',
    color_accent       VARCHAR(7)   NOT NULL DEFAULT '#8FAF8F',
    font_heading       VARCHAR(100) NOT NULL DEFAULT 'Georgia',
    font_body          VARCHAR(100) NOT NULL DEFAULT 'Inter',
    font_scale         DECIMAL(3,2) NOT NULL DEFAULT 1.00,
    logo_url           TEXT,
    banner_url         TEXT,
    store_name         VARCHAR(200) NOT NULL DEFAULT 'Pata de Veludo',
    store_handle       VARCHAR(100) NOT NULL DEFAULT '@patadeveludo',
    store_tagline      TEXT         DEFAULT 'Produtos premium para quem ama gato de verdade.',
    hero_style         VARCHAR(50)  NOT NULL DEFAULT 'gradient',
    updated_at         TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Seed default theme
INSERT INTO store_theme (id) VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Analytics events (append-only, high volume)
CREATE TABLE IF NOT EXISTS analytics_events (
    id           BIGSERIAL    PRIMARY KEY,
    event_type   VARCHAR(50)  NOT NULL,
    session_id   UUID,
    product_id   VARCHAR(255),
    page_path    VARCHAR(500),
    referrer     VARCHAR(500),
    ip_hash      VARCHAR(64),
    revenue      DECIMAL(10,2),
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type_date
    ON analytics_events(event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_product
    ON analytics_events(product_id, event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_date
    ON analytics_events(created_at);
