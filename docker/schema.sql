--
-- PostgreSQL database dump
--


-- Dumped from database version 16.14
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _locales; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public._locales AS ENUM (
    'fr',
    'en'
);


--
-- Name: enum__articles_v_published_locale; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__articles_v_published_locale AS ENUM (
    'fr',
    'en'
);


--
-- Name: enum__articles_v_version_review_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__articles_v_version_review_status AS ENUM (
    'draft',
    'in-review',
    'approved'
);


--
-- Name: enum__articles_v_version_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__articles_v_version_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum__home_page_v_published_locale; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__home_page_v_published_locale AS ENUM (
    'fr',
    'en'
);


--
-- Name: enum__home_page_v_version_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__home_page_v_version_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum__jobs_v_published_locale; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__jobs_v_published_locale AS ENUM (
    'fr',
    'en'
);


--
-- Name: enum__jobs_v_version_contract_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__jobs_v_version_contract_type AS ENUM (
    'CDI',
    'CDD',
    'Stage',
    'Alternance',
    'Intérim'
);


--
-- Name: enum__jobs_v_version_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__jobs_v_version_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum__pages_v_blocks_cta_buttons_variant; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_cta_buttons_variant AS ENUM (
    'primary',
    'secondary'
);


--
-- Name: enum__pages_v_blocks_media_block_size; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_media_block_size AS ENUM (
    'normal',
    'wide',
    'full'
);


--
-- Name: enum__pages_v_published_locale; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_published_locale AS ENUM (
    'fr',
    'en'
);


--
-- Name: enum__pages_v_version_review_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_version_review_status AS ENUM (
    'draft',
    'in-review',
    'approved'
);


--
-- Name: enum__pages_v_version_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_version_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum__products_v_published_locale; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__products_v_published_locale AS ENUM (
    'fr',
    'en'
);


--
-- Name: enum__products_v_version_availability; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__products_v_version_availability AS ENUM (
    'available',
    'soon',
    'on-order'
);


--
-- Name: enum__products_v_version_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__products_v_version_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum__products_v_version_usage_tag; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__products_v_version_usage_tag AS ENUM (
    'maison',
    'sport',
    'evenementiel',
    'chr'
);


--
-- Name: enum_activity_log_action; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_activity_log_action AS ENUM (
    'create',
    'update',
    'delete',
    'login',
    'publish'
);


--
-- Name: enum_applications_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_applications_status AS ENUM (
    'new',
    'reviewing',
    'interview',
    'rejected',
    'hired'
);


--
-- Name: enum_articles_review_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_articles_review_status AS ENUM (
    'draft',
    'in-review',
    'approved'
);


--
-- Name: enum_articles_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_articles_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_banners_placement; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_banners_placement AS ENUM (
    'site-top',
    'home'
);


--
-- Name: enum_distributors_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_distributors_type AS ENUM (
    'wholesaler',
    'chr',
    'ecommerce'
);


--
-- Name: enum_home_page_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_home_page_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_jobs_contract_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_jobs_contract_type AS ENUM (
    'CDI',
    'CDD',
    'Stage',
    'Alternance',
    'Intérim'
);


--
-- Name: enum_jobs_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_jobs_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_messages_kind; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_messages_kind AS ENUM (
    'contact',
    'quote',
    'distributor',
    'chr'
);


--
-- Name: enum_messages_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_messages_status AS ENUM (
    'new',
    'in-progress',
    'done',
    'spam'
);


--
-- Name: enum_newsletter_subscribers_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_newsletter_subscribers_status AS ENUM (
    'pending',
    'confirmed',
    'unsubscribed'
);


--
-- Name: enum_orders_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_orders_status AS ENUM (
    'submitted',
    'confirmed',
    'preparing',
    'shipped',
    'delivered',
    'cancelled'
);


--
-- Name: enum_pages_blocks_cta_buttons_variant; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_cta_buttons_variant AS ENUM (
    'primary',
    'secondary'
);


--
-- Name: enum_pages_blocks_media_block_size; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_media_block_size AS ENUM (
    'normal',
    'wide',
    'full'
);


--
-- Name: enum_pages_review_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_review_status AS ENUM (
    'draft',
    'in-review',
    'approved'
);


--
-- Name: enum_pages_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_payload_jobs_log_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_payload_jobs_log_state AS ENUM (
    'failed',
    'succeeded'
);


--
-- Name: enum_payload_jobs_log_task_slug; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_payload_jobs_log_task_slug AS ENUM (
    'inline',
    'schedulePublish'
);


--
-- Name: enum_payload_jobs_task_slug; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_payload_jobs_task_slug AS ENUM (
    'inline',
    'schedulePublish'
);


--
-- Name: enum_points_of_sale_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_points_of_sale_type AS ENUM (
    'boutique',
    'gms',
    'chr',
    'distributor'
);


--
-- Name: enum_press_kit_category; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_press_kit_category AS ENUM (
    'logos',
    'visuals',
    'press-releases',
    'messaging'
);


--
-- Name: enum_pro_accounts_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pro_accounts_status AS ENUM (
    'pending',
    'approved',
    'suspended',
    'rejected'
);


--
-- Name: enum_pro_accounts_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pro_accounts_type AS ENUM (
    'wholesaler',
    'chr',
    'retailer',
    'institution',
    'events'
);


--
-- Name: enum_products_availability; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_availability AS ENUM (
    'available',
    'soon',
    'on-order'
);


--
-- Name: enum_products_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_products_usage_tag; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_products_usage_tag AS ENUM (
    'maison',
    'sport',
    'evenementiel',
    'chr'
);


--
-- Name: enum_site_settings_socials_platform; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_site_settings_socials_platform AS ENUM (
    'instagram',
    'facebook',
    'linkedin',
    'youtube',
    'tiktok',
    'x'
);


--
-- Name: enum_users_roles; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_users_roles AS ENUM (
    'admin',
    'editor',
    'contributor'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _articles_v; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._articles_v (
    id integer NOT NULL,
    parent_id integer,
    version_slug character varying,
    version_review_status public.enum__articles_v_version_review_status DEFAULT 'draft'::public.enum__articles_v_version_review_status,
    version_published_at timestamp(3) with time zone,
    version_category_id integer,
    version_featured boolean,
    version_cover_id integer,
    version_author_id integer,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status public.enum__articles_v_version_status DEFAULT 'draft'::public.enum__articles_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    snapshot boolean,
    published_locale public.enum__articles_v_published_locale,
    latest boolean,
    autosave boolean
);


--
-- Name: _articles_v_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._articles_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _articles_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._articles_v_id_seq OWNED BY public._articles_v.id;


--
-- Name: _articles_v_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._articles_v_locales (
    version_title character varying,
    version_excerpt character varying,
    version_content jsonb,
    version_meta_title character varying,
    version_meta_description character varying,
    version_meta_image_id integer,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _articles_v_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._articles_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _articles_v_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._articles_v_locales_id_seq OWNED BY public._articles_v_locales.id;


--
-- Name: _home_page_v; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._home_page_v (
    id integer NOT NULL,
    version_hero_video_id integer,
    version_hero_poster_id integer,
    version__status public.enum__home_page_v_version_status DEFAULT 'draft'::public.enum__home_page_v_version_status,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    snapshot boolean,
    published_locale public.enum__home_page_v_published_locale,
    latest boolean,
    autosave boolean
);


--
-- Name: _home_page_v_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._home_page_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _home_page_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._home_page_v_id_seq OWNED BY public._home_page_v.id;


--
-- Name: _home_page_v_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._home_page_v_locales (
    version_hero_eyebrow character varying,
    version_hero_title_line1 character varying,
    version_hero_title_line2 character varying,
    version_hero_subtitle character varying,
    version_brand_teaser_title character varying,
    version_brand_teaser_text character varying,
    version_source_teaser_title character varying,
    version_source_teaser_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _home_page_v_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._home_page_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _home_page_v_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._home_page_v_locales_id_seq OWNED BY public._home_page_v_locales.id;


--
-- Name: _home_page_v_version_stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._home_page_v_version_stats (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    value numeric,
    suffix character varying,
    _uuid character varying
);


--
-- Name: _home_page_v_version_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._home_page_v_version_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _home_page_v_version_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._home_page_v_version_stats_id_seq OWNED BY public._home_page_v_version_stats.id;


--
-- Name: _home_page_v_version_stats_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._home_page_v_version_stats_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _home_page_v_version_stats_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._home_page_v_version_stats_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _home_page_v_version_stats_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._home_page_v_version_stats_locales_id_seq OWNED BY public._home_page_v_version_stats_locales.id;


--
-- Name: _jobs_v; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._jobs_v (
    id integer NOT NULL,
    parent_id integer,
    version_slug character varying,
    version_department character varying,
    version_location character varying DEFAULT 'Rufisque'::character varying,
    version_contract_type public.enum__jobs_v_version_contract_type,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status public.enum__jobs_v_version_status DEFAULT 'draft'::public.enum__jobs_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    snapshot boolean,
    published_locale public.enum__jobs_v_published_locale,
    latest boolean,
    autosave boolean
);


--
-- Name: _jobs_v_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._jobs_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _jobs_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._jobs_v_id_seq OWNED BY public._jobs_v.id;


--
-- Name: _jobs_v_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._jobs_v_locales (
    version_title character varying,
    version_summary character varying,
    version_description jsonb,
    version_meta_title character varying,
    version_meta_description character varying,
    version_meta_image_id integer,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _jobs_v_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._jobs_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _jobs_v_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._jobs_v_locales_id_seq OWNED BY public._jobs_v_locales.id;


--
-- Name: _pages_v; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v (
    id integer NOT NULL,
    parent_id integer,
    version_slug character varying,
    version_review_status public.enum__pages_v_version_review_status DEFAULT 'draft'::public.enum__pages_v_version_review_status,
    version_hero_image_id integer,
    version_parent_id integer,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status public.enum__pages_v_version_status DEFAULT 'draft'::public.enum__pages_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    snapshot boolean,
    published_locale public.enum__pages_v_published_locale,
    latest boolean,
    autosave boolean
);


--
-- Name: _pages_v_blocks_cta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_cta (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_cta_buttons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_cta_buttons (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    href character varying,
    variant public.enum__pages_v_blocks_cta_buttons_variant DEFAULT 'primary'::public.enum__pages_v_blocks_cta_buttons_variant,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_cta_buttons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_cta_buttons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_cta_buttons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_cta_buttons_id_seq OWNED BY public._pages_v_blocks_cta_buttons.id;


--
-- Name: _pages_v_blocks_cta_buttons_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_cta_buttons_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _pages_v_blocks_cta_buttons_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_cta_buttons_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_cta_buttons_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_cta_buttons_locales_id_seq OWNED BY public._pages_v_blocks_cta_buttons_locales.id;


--
-- Name: _pages_v_blocks_cta_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_cta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_cta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_cta_id_seq OWNED BY public._pages_v_blocks_cta.id;


--
-- Name: _pages_v_blocks_cta_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_cta_locales (
    eyebrow character varying,
    title character varying,
    text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _pages_v_blocks_cta_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_cta_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_cta_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_cta_locales_id_seq OWNED BY public._pages_v_blocks_cta_locales.id;


--
-- Name: _pages_v_blocks_gallery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_gallery (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_gallery_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_gallery_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_gallery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_gallery_id_seq OWNED BY public._pages_v_blocks_gallery.id;


--
-- Name: _pages_v_blocks_gallery_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_gallery_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    image_id integer,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_gallery_images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_gallery_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_gallery_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_gallery_images_id_seq OWNED BY public._pages_v_blocks_gallery_images.id;


--
-- Name: _pages_v_blocks_media_block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_media_block (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    media_id integer,
    size public.enum__pages_v_blocks_media_block_size DEFAULT 'wide'::public.enum__pages_v_blocks_media_block_size,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_media_block_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_media_block_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_media_block_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_media_block_id_seq OWNED BY public._pages_v_blocks_media_block.id;


--
-- Name: _pages_v_blocks_media_block_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_media_block_locales (
    caption character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _pages_v_blocks_media_block_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_media_block_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_media_block_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_media_block_locales_id_seq OWNED BY public._pages_v_blocks_media_block_locales.id;


--
-- Name: _pages_v_blocks_quote; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_quote (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    author character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_quote_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_quote_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_quote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_quote_id_seq OWNED BY public._pages_v_blocks_quote.id;


--
-- Name: _pages_v_blocks_quote_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_quote_locales (
    quote character varying,
    role character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _pages_v_blocks_quote_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_quote_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_quote_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_quote_locales_id_seq OWNED BY public._pages_v_blocks_quote_locales.id;


--
-- Name: _pages_v_blocks_rich_text; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_rich_text (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_rich_text_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_rich_text_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_rich_text_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_rich_text_id_seq OWNED BY public._pages_v_blocks_rich_text.id;


--
-- Name: _pages_v_blocks_rich_text_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_rich_text_locales (
    content jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _pages_v_blocks_rich_text_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_rich_text_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_rich_text_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_rich_text_locales_id_seq OWNED BY public._pages_v_blocks_rich_text_locales.id;


--
-- Name: _pages_v_blocks_stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_stats (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_stats_id_seq OWNED BY public._pages_v_blocks_stats.id;


--
-- Name: _pages_v_blocks_stats_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_stats_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    value numeric,
    suffix character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_stats_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_stats_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_stats_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_stats_items_id_seq OWNED BY public._pages_v_blocks_stats_items.id;


--
-- Name: _pages_v_blocks_stats_items_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_stats_items_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _pages_v_blocks_stats_items_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_stats_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_stats_items_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_stats_items_locales_id_seq OWNED BY public._pages_v_blocks_stats_items_locales.id;


--
-- Name: _pages_v_blocks_stats_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_stats_locales (
    title character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _pages_v_blocks_stats_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_stats_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_stats_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_stats_locales_id_seq OWNED BY public._pages_v_blocks_stats_locales.id;


--
-- Name: _pages_v_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_id_seq OWNED BY public._pages_v.id;


--
-- Name: _pages_v_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_locales (
    version_title character varying,
    version_eyebrow character varying,
    version_intro character varying,
    version_meta_title character varying,
    version_meta_description character varying,
    version_meta_image_id integer,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _pages_v_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_locales_id_seq OWNED BY public._pages_v_locales.id;


--
-- Name: _pages_v_version_breadcrumbs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_version_breadcrumbs (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _locale public._locales NOT NULL,
    id integer NOT NULL,
    doc_id integer,
    url character varying,
    label character varying,
    _uuid character varying
);


--
-- Name: _pages_v_version_breadcrumbs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_version_breadcrumbs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_version_breadcrumbs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_version_breadcrumbs_id_seq OWNED BY public._pages_v_version_breadcrumbs.id;


--
-- Name: _products_v; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._products_v (
    id integer NOT NULL,
    parent_id integer,
    version_slug character varying,
    version_volume character varying,
    version_availability public.enum__products_v_version_availability DEFAULT 'available'::public.enum__products_v_version_availability,
    version_pro_price_h_t numeric,
    version_pro_pack_size numeric DEFAULT 12,
    version_pro_vat_rate numeric DEFAULT 18,
    version_pro_min_packs numeric DEFAULT 1,
    version_pro_lead_time_days numeric,
    version_dry_residue numeric,
    version_packshot_id integer,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status public.enum__products_v_version_status DEFAULT 'draft'::public.enum__products_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    snapshot boolean,
    published_locale public.enum__products_v_published_locale,
    latest boolean,
    autosave boolean
);


--
-- Name: _products_v_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._products_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _products_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._products_v_id_seq OWNED BY public._products_v.id;


--
-- Name: _products_v_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._products_v_locales (
    version_name character varying,
    version_tagline character varying,
    version_description jsonb,
    version_meta_title character varying,
    version_meta_description character varying,
    version_meta_image_id integer,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _products_v_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._products_v_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _products_v_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._products_v_locales_id_seq OWNED BY public._products_v_locales.id;


--
-- Name: _products_v_version_gallery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._products_v_version_gallery (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    image_id integer,
    _uuid character varying
);


--
-- Name: _products_v_version_gallery_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._products_v_version_gallery_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _products_v_version_gallery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._products_v_version_gallery_id_seq OWNED BY public._products_v_version_gallery.id;


--
-- Name: _products_v_version_images360; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._products_v_version_images360 (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    frame_id integer,
    _uuid character varying
);


--
-- Name: _products_v_version_images360_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._products_v_version_images360_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _products_v_version_images360_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._products_v_version_images360_id_seq OWNED BY public._products_v_version_images360.id;


--
-- Name: _products_v_version_minerals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._products_v_version_minerals (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    symbol character varying,
    value numeric,
    _uuid character varying
);


--
-- Name: _products_v_version_minerals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._products_v_version_minerals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _products_v_version_minerals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._products_v_version_minerals_id_seq OWNED BY public._products_v_version_minerals.id;


--
-- Name: _products_v_version_minerals_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._products_v_version_minerals_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: _products_v_version_minerals_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._products_v_version_minerals_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _products_v_version_minerals_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._products_v_version_minerals_locales_id_seq OWNED BY public._products_v_version_minerals_locales.id;


--
-- Name: _products_v_version_usage_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._products_v_version_usage_tag (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum__products_v_version_usage_tag,
    id integer NOT NULL
);


--
-- Name: _products_v_version_usage_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._products_v_version_usage_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _products_v_version_usage_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._products_v_version_usage_tag_id_seq OWNED BY public._products_v_version_usage_tag.id;


--
-- Name: activity_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity_log (
    id integer NOT NULL,
    action public.enum_activity_log_action NOT NULL,
    collection_slug character varying,
    document_id character varying,
    title character varying,
    status character varying,
    user_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: activity_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.activity_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activity_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.activity_log_id_seq OWNED BY public.activity_log.id;


--
-- Name: applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.applications (
    id integer NOT NULL,
    full_name character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying,
    job_id integer,
    cv_id integer NOT NULL,
    message character varying,
    status public.enum_applications_status DEFAULT 'new'::public.enum_applications_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: applications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;


--
-- Name: article_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article_categories (
    id integer NOT NULL,
    slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: article_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.article_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: article_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.article_categories_id_seq OWNED BY public.article_categories.id;


--
-- Name: article_categories_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article_categories_locales (
    title character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: article_categories_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.article_categories_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: article_categories_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.article_categories_locales_id_seq OWNED BY public.article_categories_locales.id;


--
-- Name: articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    slug character varying,
    review_status public.enum_articles_review_status DEFAULT 'draft'::public.enum_articles_review_status,
    published_at timestamp(3) with time zone,
    category_id integer,
    featured boolean,
    cover_id integer,
    author_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status public.enum_articles_status DEFAULT 'draft'::public.enum_articles_status
);


--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: articles_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles_locales (
    title character varying,
    excerpt character varying,
    content jsonb,
    meta_title character varying,
    meta_description character varying,
    meta_image_id integer,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: articles_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: articles_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_locales_id_seq OWNED BY public.articles_locales.id;


--
-- Name: banners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.banners (
    id integer NOT NULL,
    title character varying NOT NULL,
    href character varying,
    active boolean DEFAULT false,
    placement public.enum_banners_placement DEFAULT 'site-top'::public.enum_banners_placement,
    start_at timestamp(3) with time zone,
    end_at timestamp(3) with time zone,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: banners_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.banners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;


--
-- Name: banners_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.banners_locales (
    message character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: banners_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.banners_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: banners_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.banners_locales_id_seq OWNED BY public.banners_locales.id;


--
-- Name: distributors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.distributors (
    id integer NOT NULL,
    name character varying NOT NULL,
    logo_id integer,
    type public.enum_distributors_type,
    region character varying,
    website character varying,
    phone character varying,
    email character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: distributors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.distributors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: distributors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.distributors_id_seq OWNED BY public.distributors.id;


--
-- Name: footer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


--
-- Name: footer_columns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_columns (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL
);


--
-- Name: footer_columns_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_columns_links (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    href character varying NOT NULL
);


--
-- Name: footer_columns_links_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_columns_links_locales (
    label character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: footer_columns_links_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.footer_columns_links_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: footer_columns_links_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.footer_columns_links_locales_id_seq OWNED BY public.footer_columns_links_locales.id;


--
-- Name: footer_columns_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_columns_locales (
    heading character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: footer_columns_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.footer_columns_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: footer_columns_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.footer_columns_locales_id_seq OWNED BY public.footer_columns_locales.id;


--
-- Name: footer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.footer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: footer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.footer_id_seq OWNED BY public.footer.id;


--
-- Name: footer_legal_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_legal_links (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    href character varying NOT NULL
);


--
-- Name: footer_legal_links_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_legal_links_locales (
    label character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: footer_legal_links_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.footer_legal_links_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: footer_legal_links_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.footer_legal_links_locales_id_seq OWNED BY public.footer_legal_links_locales.id;


--
-- Name: footer_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_locales (
    newsletter_text character varying,
    eco_statement character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: footer_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.footer_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: footer_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.footer_locales_id_seq OWNED BY public.footer_locales.id;


--
-- Name: home_page; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.home_page (
    id integer NOT NULL,
    hero_video_id integer,
    hero_poster_id integer,
    _status public.enum_home_page_status DEFAULT 'draft'::public.enum_home_page_status,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


--
-- Name: home_page_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.home_page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: home_page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.home_page_id_seq OWNED BY public.home_page.id;


--
-- Name: home_page_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.home_page_locales (
    hero_eyebrow character varying,
    hero_title_line1 character varying,
    hero_title_line2 character varying,
    hero_subtitle character varying,
    brand_teaser_title character varying,
    brand_teaser_text character varying,
    source_teaser_title character varying,
    source_teaser_text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: home_page_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.home_page_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: home_page_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.home_page_locales_id_seq OWNED BY public.home_page_locales.id;


--
-- Name: home_page_stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.home_page_stats (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    value numeric,
    suffix character varying
);


--
-- Name: home_page_stats_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.home_page_stats_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: home_page_stats_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.home_page_stats_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: home_page_stats_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.home_page_stats_locales_id_seq OWNED BY public.home_page_stats_locales.id;


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs (
    id integer NOT NULL,
    slug character varying,
    department character varying,
    location character varying DEFAULT 'Rufisque'::character varying,
    contract_type public.enum_jobs_contract_type,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status public.enum_jobs_status DEFAULT 'draft'::public.enum_jobs_status
);


--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: jobs_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs_locales (
    title character varying,
    summary character varying,
    description jsonb,
    meta_title character varying,
    meta_description character varying,
    meta_image_id integer,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: jobs_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobs_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobs_locales_id_seq OWNED BY public.jobs_locales.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    credit character varying,
    prefix character varying DEFAULT 'media'::character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric,
    sizes_thumbnail_url character varying,
    sizes_thumbnail_width numeric,
    sizes_thumbnail_height numeric,
    sizes_thumbnail_mime_type character varying,
    sizes_thumbnail_filesize numeric,
    sizes_thumbnail_filename character varying,
    sizes_card_url character varying,
    sizes_card_width numeric,
    sizes_card_height numeric,
    sizes_card_mime_type character varying,
    sizes_card_filesize numeric,
    sizes_card_filename character varying,
    sizes_feature_url character varying,
    sizes_feature_width numeric,
    sizes_feature_height numeric,
    sizes_feature_mime_type character varying,
    sizes_feature_filesize numeric,
    sizes_feature_filename character varying,
    sizes_hero_url character varying,
    sizes_hero_width numeric,
    sizes_hero_height numeric,
    sizes_hero_mime_type character varying,
    sizes_hero_filesize numeric,
    sizes_hero_filename character varying,
    sizes_og_url character varying,
    sizes_og_width numeric,
    sizes_og_height numeric,
    sizes_og_mime_type character varying,
    sizes_og_filesize numeric,
    sizes_og_filename character varying
);


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: media_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_locales (
    alt character varying NOT NULL,
    caption character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: media_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_locales_id_seq OWNED BY public.media_locales.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    kind public.enum_messages_kind DEFAULT 'contact'::public.enum_messages_kind NOT NULL,
    status public.enum_messages_status DEFAULT 'new'::public.enum_messages_status,
    name character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying,
    company character varying,
    subject character varying,
    message character varying NOT NULL,
    qualification_activity character varying,
    qualification_monthly_volume character varying,
    qualification_city character varying,
    locale character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: navigation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.navigation (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


--
-- Name: navigation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.navigation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: navigation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.navigation_id_seq OWNED BY public.navigation.id;


--
-- Name: navigation_primary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.navigation_primary (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    href character varying NOT NULL
);


--
-- Name: navigation_primary_children; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.navigation_primary_children (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    href character varying NOT NULL
);


--
-- Name: navigation_primary_children_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.navigation_primary_children_locales (
    label character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: navigation_primary_children_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.navigation_primary_children_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: navigation_primary_children_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.navigation_primary_children_locales_id_seq OWNED BY public.navigation_primary_children_locales.id;


--
-- Name: navigation_primary_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.navigation_primary_locales (
    label character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: navigation_primary_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.navigation_primary_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: navigation_primary_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.navigation_primary_locales_id_seq OWNED BY public.navigation_primary_locales.id;


--
-- Name: newsletter_subscribers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.newsletter_subscribers (
    id integer NOT NULL,
    email character varying NOT NULL,
    status public.enum_newsletter_subscribers_status DEFAULT 'pending'::public.enum_newsletter_subscribers_status,
    locale character varying,
    confirm_token character varying,
    confirmed_at timestamp(3) with time zone,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: newsletter_subscribers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.newsletter_subscribers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: newsletter_subscribers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.newsletter_subscribers_id_seq OWNED BY public.newsletter_subscribers.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    reference character varying,
    account_id integer NOT NULL,
    status public.enum_orders_status DEFAULT 'submitted'::public.enum_orders_status NOT NULL,
    total_h_t numeric,
    total_v_a_t numeric,
    total_t_t_c numeric,
    delivery_address character varying,
    requested_date timestamp(3) with time zone,
    customer_note character varying,
    staff_note character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: orders_lines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders_lines (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    product_id integer NOT NULL,
    label character varying,
    qty_packs numeric NOT NULL,
    unit_price_h_t numeric NOT NULL,
    vat_rate numeric DEFAULT 18
);


--
-- Name: pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages (
    id integer NOT NULL,
    slug character varying,
    review_status public.enum_pages_review_status DEFAULT 'draft'::public.enum_pages_review_status,
    hero_image_id integer,
    parent_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status public.enum_pages_status DEFAULT 'draft'::public.enum_pages_status
);


--
-- Name: pages_blocks_cta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_cta (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_name character varying
);


--
-- Name: pages_blocks_cta_buttons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_cta_buttons (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    href character varying,
    variant public.enum_pages_blocks_cta_buttons_variant DEFAULT 'primary'::public.enum_pages_blocks_cta_buttons_variant
);


--
-- Name: pages_blocks_cta_buttons_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_cta_buttons_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: pages_blocks_cta_buttons_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_blocks_cta_buttons_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_blocks_cta_buttons_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_blocks_cta_buttons_locales_id_seq OWNED BY public.pages_blocks_cta_buttons_locales.id;


--
-- Name: pages_blocks_cta_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_cta_locales (
    eyebrow character varying,
    title character varying,
    text character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: pages_blocks_cta_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_blocks_cta_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_blocks_cta_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_blocks_cta_locales_id_seq OWNED BY public.pages_blocks_cta_locales.id;


--
-- Name: pages_blocks_gallery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_gallery (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_name character varying
);


--
-- Name: pages_blocks_gallery_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_gallery_images (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    image_id integer
);


--
-- Name: pages_blocks_media_block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_media_block (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    media_id integer,
    size public.enum_pages_blocks_media_block_size DEFAULT 'wide'::public.enum_pages_blocks_media_block_size,
    block_name character varying
);


--
-- Name: pages_blocks_media_block_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_media_block_locales (
    caption character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: pages_blocks_media_block_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_blocks_media_block_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_blocks_media_block_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_blocks_media_block_locales_id_seq OWNED BY public.pages_blocks_media_block_locales.id;


--
-- Name: pages_blocks_quote; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_quote (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    author character varying,
    block_name character varying
);


--
-- Name: pages_blocks_quote_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_quote_locales (
    quote character varying,
    role character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: pages_blocks_quote_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_blocks_quote_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_blocks_quote_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_blocks_quote_locales_id_seq OWNED BY public.pages_blocks_quote_locales.id;


--
-- Name: pages_blocks_rich_text; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_rich_text (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_name character varying
);


--
-- Name: pages_blocks_rich_text_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_rich_text_locales (
    content jsonb,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: pages_blocks_rich_text_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_blocks_rich_text_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_blocks_rich_text_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_blocks_rich_text_locales_id_seq OWNED BY public.pages_blocks_rich_text_locales.id;


--
-- Name: pages_blocks_stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_stats (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_name character varying
);


--
-- Name: pages_blocks_stats_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_stats_items (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    value numeric,
    suffix character varying
);


--
-- Name: pages_blocks_stats_items_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_stats_items_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: pages_blocks_stats_items_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_blocks_stats_items_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_blocks_stats_items_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_blocks_stats_items_locales_id_seq OWNED BY public.pages_blocks_stats_items_locales.id;


--
-- Name: pages_blocks_stats_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_stats_locales (
    title character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: pages_blocks_stats_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_blocks_stats_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_blocks_stats_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_blocks_stats_locales_id_seq OWNED BY public.pages_blocks_stats_locales.id;


--
-- Name: pages_breadcrumbs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_breadcrumbs (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _locale public._locales NOT NULL,
    id character varying NOT NULL,
    doc_id integer,
    url character varying,
    label character varying
);


--
-- Name: pages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;


--
-- Name: pages_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_locales (
    title character varying,
    eyebrow character varying,
    intro character varying,
    meta_title character varying,
    meta_description character varying,
    meta_image_id integer,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: pages_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_locales_id_seq OWNED BY public.pages_locales.id;


--
-- Name: payload_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_jobs (
    id integer NOT NULL,
    input jsonb,
    completed_at timestamp(3) with time zone,
    total_tried numeric DEFAULT 0,
    has_error boolean DEFAULT false,
    error jsonb,
    task_slug public.enum_payload_jobs_task_slug,
    queue character varying DEFAULT 'default'::character varying,
    wait_until timestamp(3) with time zone,
    processing boolean DEFAULT false,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_jobs_id_seq OWNED BY public.payload_jobs.id;


--
-- Name: payload_jobs_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_jobs_log (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    executed_at timestamp(3) with time zone NOT NULL,
    completed_at timestamp(3) with time zone NOT NULL,
    task_slug public.enum_payload_jobs_log_task_slug NOT NULL,
    task_i_d character varying NOT NULL,
    input jsonb,
    output jsonb,
    state public.enum_payload_jobs_log_state NOT NULL,
    error jsonb
);


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    articles_id integer,
    article_categories_id integer,
    products_id integer,
    points_of_sale_id integer,
    distributors_id integer,
    jobs_id integer,
    applications_id integer,
    pro_accounts_id integer,
    orders_id integer,
    messages_id integer,
    newsletter_subscribers_id integer,
    banners_id integer,
    testimonials_id integer,
    press_kit_id integer,
    media_id integer,
    users_id integer,
    activity_log_id integer,
    search_index_id integer
);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pro_accounts_id integer,
    users_id integer
);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: points_of_sale; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.points_of_sale (
    id integer NOT NULL,
    name character varying NOT NULL,
    type public.enum_points_of_sale_type DEFAULT 'boutique'::public.enum_points_of_sale_type NOT NULL,
    active boolean DEFAULT true,
    city character varying NOT NULL,
    quartier character varying,
    address character varying,
    lat numeric,
    lng numeric,
    phone character varying,
    hours character varying,
    enseigne character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: points_of_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.points_of_sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: points_of_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.points_of_sale_id_seq OWNED BY public.points_of_sale.id;


--
-- Name: press_kit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.press_kit (
    id integer NOT NULL,
    category public.enum_press_kit_category,
    file_id integer NOT NULL,
    published_at timestamp(3) with time zone,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: press_kit_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.press_kit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: press_kit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.press_kit_id_seq OWNED BY public.press_kit.id;


--
-- Name: press_kit_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.press_kit_locales (
    title character varying NOT NULL,
    description character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: press_kit_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.press_kit_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: press_kit_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.press_kit_locales_id_seq OWNED BY public.press_kit_locales.id;


--
-- Name: pro_accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pro_accounts (
    id integer NOT NULL,
    company_name character varying NOT NULL,
    type public.enum_pro_accounts_type NOT NULL,
    contact_name character varying NOT NULL,
    phone character varying NOT NULL,
    region character varying,
    ninea character varying,
    delivery_address character varying,
    status public.enum_pro_accounts_status DEFAULT 'pending'::public.enum_pro_accounts_status NOT NULL,
    discount_pct numeric DEFAULT 0,
    staff_note character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


--
-- Name: pro_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pro_accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pro_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pro_accounts_id_seq OWNED BY public.pro_accounts.id;


--
-- Name: pro_accounts_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pro_accounts_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    slug character varying,
    volume character varying,
    availability public.enum_products_availability DEFAULT 'available'::public.enum_products_availability,
    pro_price_h_t numeric,
    pro_pack_size numeric DEFAULT 12,
    pro_vat_rate numeric DEFAULT 18,
    pro_min_packs numeric DEFAULT 1,
    pro_lead_time_days numeric,
    dry_residue numeric,
    packshot_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status public.enum_products_status DEFAULT 'draft'::public.enum_products_status
);


--
-- Name: products_gallery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_gallery (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: products_images360; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_images360 (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    frame_id integer
);


--
-- Name: products_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_locales (
    name character varying,
    tagline character varying,
    description jsonb,
    meta_title character varying,
    meta_description character varying,
    meta_image_id integer,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: products_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_locales_id_seq OWNED BY public.products_locales.id;


--
-- Name: products_minerals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_minerals (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    symbol character varying,
    value numeric
);


--
-- Name: products_minerals_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_minerals_locales (
    label character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id character varying NOT NULL
);


--
-- Name: products_minerals_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_minerals_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_minerals_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_minerals_locales_id_seq OWNED BY public.products_minerals_locales.id;


--
-- Name: products_usage_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_usage_tag (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum_products_usage_tag,
    id integer NOT NULL
);


--
-- Name: products_usage_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_usage_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_usage_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_usage_tag_id_seq OWNED BY public.products_usage_tag.id;


--
-- Name: search_index; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.search_index (
    id integer NOT NULL,
    priority numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: search_index_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.search_index_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: search_index_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.search_index_id_seq OWNED BY public.search_index.id;


--
-- Name: search_index_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.search_index_locales (
    title character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: search_index_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.search_index_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: search_index_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.search_index_locales_id_seq OWNED BY public.search_index_locales.id;


--
-- Name: search_index_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.search_index_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    articles_id integer,
    products_id integer,
    pages_id integer
);


--
-- Name: search_index_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.search_index_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: search_index_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.search_index_rels_id_seq OWNED BY public.search_index_rels.id;


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings (
    id integer NOT NULL,
    company_name character varying DEFAULT 'Cristal Waters SARL'::character varying,
    phone character varying,
    email character varying,
    whatsapp character varying,
    default_og_image_id integer,
    plausible_domain character varying,
    features_enable3d boolean,
    features_enable_sound boolean,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


--
-- Name: site_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.site_settings_id_seq OWNED BY public.site_settings.id;


--
-- Name: site_settings_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings_locales (
    factory_address character varying,
    opening_hours character varying,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: site_settings_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.site_settings_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_settings_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.site_settings_locales_id_seq OWNED BY public.site_settings_locales.id;


--
-- Name: site_settings_socials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings_socials (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    platform public.enum_site_settings_socials_platform NOT NULL,
    url character varying NOT NULL,
    handle character varying
);


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    author character varying NOT NULL,
    company character varying,
    rating numeric DEFAULT 5,
    avatar_id integer,
    featured boolean,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: testimonials_locales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.testimonials_locales (
    role character varying,
    quote character varying NOT NULL,
    id integer NOT NULL,
    _locale public._locales NOT NULL,
    _parent_id integer NOT NULL
);


--
-- Name: testimonials_locales_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.testimonials_locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: testimonials_locales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.testimonials_locales_id_seq OWNED BY public.testimonials_locales.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    totp_secret character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_roles (
    "order" integer NOT NULL,
    parent_id integer NOT NULL,
    value public.enum_users_roles,
    id integer NOT NULL
);


--
-- Name: users_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_roles_id_seq OWNED BY public.users_roles.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


--
-- Name: _articles_v id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v ALTER COLUMN id SET DEFAULT nextval('public._articles_v_id_seq'::regclass);


--
-- Name: _articles_v_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v_locales ALTER COLUMN id SET DEFAULT nextval('public._articles_v_locales_id_seq'::regclass);


--
-- Name: _home_page_v id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v ALTER COLUMN id SET DEFAULT nextval('public._home_page_v_id_seq'::regclass);


--
-- Name: _home_page_v_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v_locales ALTER COLUMN id SET DEFAULT nextval('public._home_page_v_locales_id_seq'::regclass);


--
-- Name: _home_page_v_version_stats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v_version_stats ALTER COLUMN id SET DEFAULT nextval('public._home_page_v_version_stats_id_seq'::regclass);


--
-- Name: _home_page_v_version_stats_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v_version_stats_locales ALTER COLUMN id SET DEFAULT nextval('public._home_page_v_version_stats_locales_id_seq'::regclass);


--
-- Name: _jobs_v id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._jobs_v ALTER COLUMN id SET DEFAULT nextval('public._jobs_v_id_seq'::regclass);


--
-- Name: _jobs_v_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._jobs_v_locales ALTER COLUMN id SET DEFAULT nextval('public._jobs_v_locales_id_seq'::regclass);


--
-- Name: _pages_v id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v ALTER COLUMN id SET DEFAULT nextval('public._pages_v_id_seq'::regclass);


--
-- Name: _pages_v_blocks_cta id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cta_id_seq'::regclass);


--
-- Name: _pages_v_blocks_cta_buttons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_buttons ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cta_buttons_id_seq'::regclass);


--
-- Name: _pages_v_blocks_cta_buttons_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_buttons_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cta_buttons_locales_id_seq'::regclass);


--
-- Name: _pages_v_blocks_cta_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cta_locales_id_seq'::regclass);


--
-- Name: _pages_v_blocks_gallery id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_gallery ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_gallery_id_seq'::regclass);


--
-- Name: _pages_v_blocks_gallery_images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_gallery_images ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_gallery_images_id_seq'::regclass);


--
-- Name: _pages_v_blocks_media_block id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_media_block_id_seq'::regclass);


--
-- Name: _pages_v_blocks_media_block_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_media_block_locales_id_seq'::regclass);


--
-- Name: _pages_v_blocks_quote id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_quote ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_quote_id_seq'::regclass);


--
-- Name: _pages_v_blocks_quote_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_quote_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_quote_locales_id_seq'::regclass);


--
-- Name: _pages_v_blocks_rich_text id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_rich_text ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_rich_text_id_seq'::regclass);


--
-- Name: _pages_v_blocks_rich_text_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_rich_text_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_rich_text_locales_id_seq'::regclass);


--
-- Name: _pages_v_blocks_stats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_stats_id_seq'::regclass);


--
-- Name: _pages_v_blocks_stats_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats_items ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_stats_items_id_seq'::regclass);


--
-- Name: _pages_v_blocks_stats_items_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats_items_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_stats_items_locales_id_seq'::regclass);


--
-- Name: _pages_v_blocks_stats_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_stats_locales_id_seq'::regclass);


--
-- Name: _pages_v_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_locales ALTER COLUMN id SET DEFAULT nextval('public._pages_v_locales_id_seq'::regclass);


--
-- Name: _pages_v_version_breadcrumbs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_version_breadcrumbs ALTER COLUMN id SET DEFAULT nextval('public._pages_v_version_breadcrumbs_id_seq'::regclass);


--
-- Name: _products_v id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v ALTER COLUMN id SET DEFAULT nextval('public._products_v_id_seq'::regclass);


--
-- Name: _products_v_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_locales ALTER COLUMN id SET DEFAULT nextval('public._products_v_locales_id_seq'::regclass);


--
-- Name: _products_v_version_gallery id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_gallery ALTER COLUMN id SET DEFAULT nextval('public._products_v_version_gallery_id_seq'::regclass);


--
-- Name: _products_v_version_images360 id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_images360 ALTER COLUMN id SET DEFAULT nextval('public._products_v_version_images360_id_seq'::regclass);


--
-- Name: _products_v_version_minerals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_minerals ALTER COLUMN id SET DEFAULT nextval('public._products_v_version_minerals_id_seq'::regclass);


--
-- Name: _products_v_version_minerals_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_minerals_locales ALTER COLUMN id SET DEFAULT nextval('public._products_v_version_minerals_locales_id_seq'::regclass);


--
-- Name: _products_v_version_usage_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_usage_tag ALTER COLUMN id SET DEFAULT nextval('public._products_v_version_usage_tag_id_seq'::regclass);


--
-- Name: activity_log id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_log ALTER COLUMN id SET DEFAULT nextval('public.activity_log_id_seq'::regclass);


--
-- Name: applications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);


--
-- Name: article_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_categories ALTER COLUMN id SET DEFAULT nextval('public.article_categories_id_seq'::regclass);


--
-- Name: article_categories_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_categories_locales ALTER COLUMN id SET DEFAULT nextval('public.article_categories_locales_id_seq'::regclass);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: articles_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_locales ALTER COLUMN id SET DEFAULT nextval('public.articles_locales_id_seq'::regclass);


--
-- Name: banners id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);


--
-- Name: banners_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banners_locales ALTER COLUMN id SET DEFAULT nextval('public.banners_locales_id_seq'::regclass);


--
-- Name: distributors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.distributors ALTER COLUMN id SET DEFAULT nextval('public.distributors_id_seq'::regclass);


--
-- Name: footer id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer ALTER COLUMN id SET DEFAULT nextval('public.footer_id_seq'::regclass);


--
-- Name: footer_columns_links_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns_links_locales ALTER COLUMN id SET DEFAULT nextval('public.footer_columns_links_locales_id_seq'::regclass);


--
-- Name: footer_columns_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns_locales ALTER COLUMN id SET DEFAULT nextval('public.footer_columns_locales_id_seq'::regclass);


--
-- Name: footer_legal_links_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_legal_links_locales ALTER COLUMN id SET DEFAULT nextval('public.footer_legal_links_locales_id_seq'::regclass);


--
-- Name: footer_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_locales ALTER COLUMN id SET DEFAULT nextval('public.footer_locales_id_seq'::regclass);


--
-- Name: home_page id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page ALTER COLUMN id SET DEFAULT nextval('public.home_page_id_seq'::regclass);


--
-- Name: home_page_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page_locales ALTER COLUMN id SET DEFAULT nextval('public.home_page_locales_id_seq'::regclass);


--
-- Name: home_page_stats_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page_stats_locales ALTER COLUMN id SET DEFAULT nextval('public.home_page_stats_locales_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: jobs_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs_locales ALTER COLUMN id SET DEFAULT nextval('public.jobs_locales_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: media_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_locales ALTER COLUMN id SET DEFAULT nextval('public.media_locales_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: navigation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation ALTER COLUMN id SET DEFAULT nextval('public.navigation_id_seq'::regclass);


--
-- Name: navigation_primary_children_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary_children_locales ALTER COLUMN id SET DEFAULT nextval('public.navigation_primary_children_locales_id_seq'::regclass);


--
-- Name: navigation_primary_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary_locales ALTER COLUMN id SET DEFAULT nextval('public.navigation_primary_locales_id_seq'::regclass);


--
-- Name: newsletter_subscribers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.newsletter_subscribers ALTER COLUMN id SET DEFAULT nextval('public.newsletter_subscribers_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: pages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);


--
-- Name: pages_blocks_cta_buttons_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_buttons_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_cta_buttons_locales_id_seq'::regclass);


--
-- Name: pages_blocks_cta_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_cta_locales_id_seq'::regclass);


--
-- Name: pages_blocks_media_block_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_media_block_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_media_block_locales_id_seq'::regclass);


--
-- Name: pages_blocks_quote_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_quote_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_quote_locales_id_seq'::regclass);


--
-- Name: pages_blocks_rich_text_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_rich_text_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_rich_text_locales_id_seq'::regclass);


--
-- Name: pages_blocks_stats_items_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats_items_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_stats_items_locales_id_seq'::regclass);


--
-- Name: pages_blocks_stats_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_blocks_stats_locales_id_seq'::regclass);


--
-- Name: pages_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_locales ALTER COLUMN id SET DEFAULT nextval('public.pages_locales_id_seq'::regclass);


--
-- Name: payload_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_jobs ALTER COLUMN id SET DEFAULT nextval('public.payload_jobs_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: points_of_sale id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.points_of_sale ALTER COLUMN id SET DEFAULT nextval('public.points_of_sale_id_seq'::regclass);


--
-- Name: press_kit id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.press_kit ALTER COLUMN id SET DEFAULT nextval('public.press_kit_id_seq'::regclass);


--
-- Name: press_kit_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.press_kit_locales ALTER COLUMN id SET DEFAULT nextval('public.press_kit_locales_id_seq'::regclass);


--
-- Name: pro_accounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pro_accounts ALTER COLUMN id SET DEFAULT nextval('public.pro_accounts_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: products_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_locales ALTER COLUMN id SET DEFAULT nextval('public.products_locales_id_seq'::regclass);


--
-- Name: products_minerals_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_minerals_locales ALTER COLUMN id SET DEFAULT nextval('public.products_minerals_locales_id_seq'::regclass);


--
-- Name: products_usage_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_usage_tag ALTER COLUMN id SET DEFAULT nextval('public.products_usage_tag_id_seq'::regclass);


--
-- Name: search_index id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index ALTER COLUMN id SET DEFAULT nextval('public.search_index_id_seq'::regclass);


--
-- Name: search_index_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index_locales ALTER COLUMN id SET DEFAULT nextval('public.search_index_locales_id_seq'::regclass);


--
-- Name: search_index_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index_rels ALTER COLUMN id SET DEFAULT nextval('public.search_index_rels_id_seq'::regclass);


--
-- Name: site_settings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings ALTER COLUMN id SET DEFAULT nextval('public.site_settings_id_seq'::regclass);


--
-- Name: site_settings_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings_locales ALTER COLUMN id SET DEFAULT nextval('public.site_settings_locales_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Name: testimonials_locales id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials_locales ALTER COLUMN id SET DEFAULT nextval('public.testimonials_locales_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_roles ALTER COLUMN id SET DEFAULT nextval('public.users_roles_id_seq'::regclass);


--
-- Name: _articles_v_locales _articles_v_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v_locales
    ADD CONSTRAINT _articles_v_locales_pkey PRIMARY KEY (id);


--
-- Name: _articles_v _articles_v_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v
    ADD CONSTRAINT _articles_v_pkey PRIMARY KEY (id);


--
-- Name: _home_page_v_locales _home_page_v_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v_locales
    ADD CONSTRAINT _home_page_v_locales_pkey PRIMARY KEY (id);


--
-- Name: _home_page_v _home_page_v_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v
    ADD CONSTRAINT _home_page_v_pkey PRIMARY KEY (id);


--
-- Name: _home_page_v_version_stats_locales _home_page_v_version_stats_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v_version_stats_locales
    ADD CONSTRAINT _home_page_v_version_stats_locales_pkey PRIMARY KEY (id);


--
-- Name: _home_page_v_version_stats _home_page_v_version_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v_version_stats
    ADD CONSTRAINT _home_page_v_version_stats_pkey PRIMARY KEY (id);


--
-- Name: _jobs_v_locales _jobs_v_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._jobs_v_locales
    ADD CONSTRAINT _jobs_v_locales_pkey PRIMARY KEY (id);


--
-- Name: _jobs_v _jobs_v_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._jobs_v
    ADD CONSTRAINT _jobs_v_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_cta_buttons_locales _pages_v_blocks_cta_buttons_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_buttons_locales
    ADD CONSTRAINT _pages_v_blocks_cta_buttons_locales_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_cta_buttons _pages_v_blocks_cta_buttons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_buttons
    ADD CONSTRAINT _pages_v_blocks_cta_buttons_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_cta_locales _pages_v_blocks_cta_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_locales
    ADD CONSTRAINT _pages_v_blocks_cta_locales_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_cta _pages_v_blocks_cta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta
    ADD CONSTRAINT _pages_v_blocks_cta_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_gallery_images _pages_v_blocks_gallery_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_gallery_images
    ADD CONSTRAINT _pages_v_blocks_gallery_images_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_gallery _pages_v_blocks_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_gallery
    ADD CONSTRAINT _pages_v_blocks_gallery_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_media_block_locales _pages_v_blocks_media_block_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block_locales
    ADD CONSTRAINT _pages_v_blocks_media_block_locales_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_media_block _pages_v_blocks_media_block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block
    ADD CONSTRAINT _pages_v_blocks_media_block_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_quote_locales _pages_v_blocks_quote_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_quote_locales
    ADD CONSTRAINT _pages_v_blocks_quote_locales_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_quote _pages_v_blocks_quote_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_quote
    ADD CONSTRAINT _pages_v_blocks_quote_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_rich_text_locales _pages_v_blocks_rich_text_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_rich_text_locales
    ADD CONSTRAINT _pages_v_blocks_rich_text_locales_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_rich_text _pages_v_blocks_rich_text_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_rich_text
    ADD CONSTRAINT _pages_v_blocks_rich_text_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_stats_items_locales _pages_v_blocks_stats_items_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats_items_locales
    ADD CONSTRAINT _pages_v_blocks_stats_items_locales_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_stats_items _pages_v_blocks_stats_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats_items
    ADD CONSTRAINT _pages_v_blocks_stats_items_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_stats_locales _pages_v_blocks_stats_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats_locales
    ADD CONSTRAINT _pages_v_blocks_stats_locales_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_stats _pages_v_blocks_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats
    ADD CONSTRAINT _pages_v_blocks_stats_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_locales _pages_v_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_locales
    ADD CONSTRAINT _pages_v_locales_pkey PRIMARY KEY (id);


--
-- Name: _pages_v _pages_v_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_version_breadcrumbs _pages_v_version_breadcrumbs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_version_breadcrumbs
    ADD CONSTRAINT _pages_v_version_breadcrumbs_pkey PRIMARY KEY (id);


--
-- Name: _products_v_locales _products_v_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_locales
    ADD CONSTRAINT _products_v_locales_pkey PRIMARY KEY (id);


--
-- Name: _products_v _products_v_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v
    ADD CONSTRAINT _products_v_pkey PRIMARY KEY (id);


--
-- Name: _products_v_version_gallery _products_v_version_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_gallery
    ADD CONSTRAINT _products_v_version_gallery_pkey PRIMARY KEY (id);


--
-- Name: _products_v_version_images360 _products_v_version_images360_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_images360
    ADD CONSTRAINT _products_v_version_images360_pkey PRIMARY KEY (id);


--
-- Name: _products_v_version_minerals_locales _products_v_version_minerals_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_minerals_locales
    ADD CONSTRAINT _products_v_version_minerals_locales_pkey PRIMARY KEY (id);


--
-- Name: _products_v_version_minerals _products_v_version_minerals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_minerals
    ADD CONSTRAINT _products_v_version_minerals_pkey PRIMARY KEY (id);


--
-- Name: _products_v_version_usage_tag _products_v_version_usage_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_usage_tag
    ADD CONSTRAINT _products_v_version_usage_tag_pkey PRIMARY KEY (id);


--
-- Name: activity_log activity_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_log
    ADD CONSTRAINT activity_log_pkey PRIMARY KEY (id);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: article_categories_locales article_categories_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_categories_locales
    ADD CONSTRAINT article_categories_locales_pkey PRIMARY KEY (id);


--
-- Name: article_categories article_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_categories
    ADD CONSTRAINT article_categories_pkey PRIMARY KEY (id);


--
-- Name: articles_locales articles_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_locales
    ADD CONSTRAINT articles_locales_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: banners_locales banners_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banners_locales
    ADD CONSTRAINT banners_locales_pkey PRIMARY KEY (id);


--
-- Name: banners banners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);


--
-- Name: distributors distributors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.distributors
    ADD CONSTRAINT distributors_pkey PRIMARY KEY (id);


--
-- Name: footer_columns_links_locales footer_columns_links_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns_links_locales
    ADD CONSTRAINT footer_columns_links_locales_pkey PRIMARY KEY (id);


--
-- Name: footer_columns_links footer_columns_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns_links
    ADD CONSTRAINT footer_columns_links_pkey PRIMARY KEY (id);


--
-- Name: footer_columns_locales footer_columns_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns_locales
    ADD CONSTRAINT footer_columns_locales_pkey PRIMARY KEY (id);


--
-- Name: footer_columns footer_columns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns
    ADD CONSTRAINT footer_columns_pkey PRIMARY KEY (id);


--
-- Name: footer_legal_links_locales footer_legal_links_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_legal_links_locales
    ADD CONSTRAINT footer_legal_links_locales_pkey PRIMARY KEY (id);


--
-- Name: footer_legal_links footer_legal_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_legal_links
    ADD CONSTRAINT footer_legal_links_pkey PRIMARY KEY (id);


--
-- Name: footer_locales footer_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_locales
    ADD CONSTRAINT footer_locales_pkey PRIMARY KEY (id);


--
-- Name: footer footer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer
    ADD CONSTRAINT footer_pkey PRIMARY KEY (id);


--
-- Name: home_page_locales home_page_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page_locales
    ADD CONSTRAINT home_page_locales_pkey PRIMARY KEY (id);


--
-- Name: home_page home_page_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page
    ADD CONSTRAINT home_page_pkey PRIMARY KEY (id);


--
-- Name: home_page_stats_locales home_page_stats_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page_stats_locales
    ADD CONSTRAINT home_page_stats_locales_pkey PRIMARY KEY (id);


--
-- Name: home_page_stats home_page_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page_stats
    ADD CONSTRAINT home_page_stats_pkey PRIMARY KEY (id);


--
-- Name: jobs_locales jobs_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs_locales
    ADD CONSTRAINT jobs_locales_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: media_locales media_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_locales
    ADD CONSTRAINT media_locales_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: navigation navigation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation
    ADD CONSTRAINT navigation_pkey PRIMARY KEY (id);


--
-- Name: navigation_primary_children_locales navigation_primary_children_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary_children_locales
    ADD CONSTRAINT navigation_primary_children_locales_pkey PRIMARY KEY (id);


--
-- Name: navigation_primary_children navigation_primary_children_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary_children
    ADD CONSTRAINT navigation_primary_children_pkey PRIMARY KEY (id);


--
-- Name: navigation_primary_locales navigation_primary_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary_locales
    ADD CONSTRAINT navigation_primary_locales_pkey PRIMARY KEY (id);


--
-- Name: navigation_primary navigation_primary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary
    ADD CONSTRAINT navigation_primary_pkey PRIMARY KEY (id);


--
-- Name: newsletter_subscribers newsletter_subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.newsletter_subscribers
    ADD CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id);


--
-- Name: orders_lines orders_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders_lines
    ADD CONSTRAINT orders_lines_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_cta_buttons_locales pages_blocks_cta_buttons_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_buttons_locales
    ADD CONSTRAINT pages_blocks_cta_buttons_locales_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_cta_buttons pages_blocks_cta_buttons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_buttons
    ADD CONSTRAINT pages_blocks_cta_buttons_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_cta_locales pages_blocks_cta_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_locales
    ADD CONSTRAINT pages_blocks_cta_locales_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_cta pages_blocks_cta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta
    ADD CONSTRAINT pages_blocks_cta_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_gallery_images pages_blocks_gallery_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_gallery_images
    ADD CONSTRAINT pages_blocks_gallery_images_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_gallery pages_blocks_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_gallery
    ADD CONSTRAINT pages_blocks_gallery_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_media_block_locales pages_blocks_media_block_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_media_block_locales
    ADD CONSTRAINT pages_blocks_media_block_locales_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_media_block pages_blocks_media_block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_media_block
    ADD CONSTRAINT pages_blocks_media_block_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_quote_locales pages_blocks_quote_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_quote_locales
    ADD CONSTRAINT pages_blocks_quote_locales_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_quote pages_blocks_quote_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_quote
    ADD CONSTRAINT pages_blocks_quote_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_rich_text_locales pages_blocks_rich_text_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_rich_text_locales
    ADD CONSTRAINT pages_blocks_rich_text_locales_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_rich_text pages_blocks_rich_text_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_rich_text
    ADD CONSTRAINT pages_blocks_rich_text_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_stats_items_locales pages_blocks_stats_items_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats_items_locales
    ADD CONSTRAINT pages_blocks_stats_items_locales_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_stats_items pages_blocks_stats_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats_items
    ADD CONSTRAINT pages_blocks_stats_items_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_stats_locales pages_blocks_stats_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats_locales
    ADD CONSTRAINT pages_blocks_stats_locales_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_stats pages_blocks_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats
    ADD CONSTRAINT pages_blocks_stats_pkey PRIMARY KEY (id);


--
-- Name: pages_breadcrumbs pages_breadcrumbs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_breadcrumbs
    ADD CONSTRAINT pages_breadcrumbs_pkey PRIMARY KEY (id);


--
-- Name: pages_locales pages_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_locales
    ADD CONSTRAINT pages_locales_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: payload_jobs_log payload_jobs_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_jobs_log
    ADD CONSTRAINT payload_jobs_log_pkey PRIMARY KEY (id);


--
-- Name: payload_jobs payload_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_jobs
    ADD CONSTRAINT payload_jobs_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: points_of_sale points_of_sale_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.points_of_sale
    ADD CONSTRAINT points_of_sale_pkey PRIMARY KEY (id);


--
-- Name: press_kit_locales press_kit_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.press_kit_locales
    ADD CONSTRAINT press_kit_locales_pkey PRIMARY KEY (id);


--
-- Name: press_kit press_kit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.press_kit
    ADD CONSTRAINT press_kit_pkey PRIMARY KEY (id);


--
-- Name: pro_accounts pro_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pro_accounts
    ADD CONSTRAINT pro_accounts_pkey PRIMARY KEY (id);


--
-- Name: pro_accounts_sessions pro_accounts_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pro_accounts_sessions
    ADD CONSTRAINT pro_accounts_sessions_pkey PRIMARY KEY (id);


--
-- Name: products_gallery products_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_gallery
    ADD CONSTRAINT products_gallery_pkey PRIMARY KEY (id);


--
-- Name: products_images360 products_images360_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_images360
    ADD CONSTRAINT products_images360_pkey PRIMARY KEY (id);


--
-- Name: products_locales products_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_locales
    ADD CONSTRAINT products_locales_pkey PRIMARY KEY (id);


--
-- Name: products_minerals_locales products_minerals_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_minerals_locales
    ADD CONSTRAINT products_minerals_locales_pkey PRIMARY KEY (id);


--
-- Name: products_minerals products_minerals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_minerals
    ADD CONSTRAINT products_minerals_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products_usage_tag products_usage_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_usage_tag
    ADD CONSTRAINT products_usage_tag_pkey PRIMARY KEY (id);


--
-- Name: search_index_locales search_index_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index_locales
    ADD CONSTRAINT search_index_locales_pkey PRIMARY KEY (id);


--
-- Name: search_index search_index_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index
    ADD CONSTRAINT search_index_pkey PRIMARY KEY (id);


--
-- Name: search_index_rels search_index_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index_rels
    ADD CONSTRAINT search_index_rels_pkey PRIMARY KEY (id);


--
-- Name: site_settings_locales site_settings_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings_locales
    ADD CONSTRAINT site_settings_locales_pkey PRIMARY KEY (id);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: site_settings_socials site_settings_socials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings_socials
    ADD CONSTRAINT site_settings_socials_pkey PRIMARY KEY (id);


--
-- Name: testimonials_locales testimonials_locales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials_locales
    ADD CONSTRAINT testimonials_locales_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_roles users_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT users_roles_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: _articles_v_autosave_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_autosave_idx ON public._articles_v USING btree (autosave);


--
-- Name: _articles_v_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_created_at_idx ON public._articles_v USING btree (created_at);


--
-- Name: _articles_v_latest_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_latest_idx ON public._articles_v USING btree (latest);


--
-- Name: _articles_v_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _articles_v_locales_locale_parent_id_unique ON public._articles_v_locales USING btree (_locale, _parent_id);


--
-- Name: _articles_v_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_parent_idx ON public._articles_v USING btree (parent_id);


--
-- Name: _articles_v_published_locale_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_published_locale_idx ON public._articles_v USING btree (published_locale);


--
-- Name: _articles_v_snapshot_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_snapshot_idx ON public._articles_v USING btree (snapshot);


--
-- Name: _articles_v_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_updated_at_idx ON public._articles_v USING btree (updated_at);


--
-- Name: _articles_v_version_meta_version_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_version_meta_version_meta_image_idx ON public._articles_v_locales USING btree (version_meta_image_id, _locale);


--
-- Name: _articles_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_version_version__status_idx ON public._articles_v USING btree (version__status);


--
-- Name: _articles_v_version_version_author_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_version_version_author_idx ON public._articles_v USING btree (version_author_id);


--
-- Name: _articles_v_version_version_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_version_version_category_idx ON public._articles_v USING btree (version_category_id);


--
-- Name: _articles_v_version_version_cover_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_version_version_cover_idx ON public._articles_v USING btree (version_cover_id);


--
-- Name: _articles_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_version_version_created_at_idx ON public._articles_v USING btree (version_created_at);


--
-- Name: _articles_v_version_version_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_version_version_slug_idx ON public._articles_v USING btree (version_slug);


--
-- Name: _articles_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _articles_v_version_version_updated_at_idx ON public._articles_v USING btree (version_updated_at);


--
-- Name: _home_page_v_autosave_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_autosave_idx ON public._home_page_v USING btree (autosave);


--
-- Name: _home_page_v_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_created_at_idx ON public._home_page_v USING btree (created_at);


--
-- Name: _home_page_v_latest_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_latest_idx ON public._home_page_v USING btree (latest);


--
-- Name: _home_page_v_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _home_page_v_locales_locale_parent_id_unique ON public._home_page_v_locales USING btree (_locale, _parent_id);


--
-- Name: _home_page_v_published_locale_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_published_locale_idx ON public._home_page_v USING btree (published_locale);


--
-- Name: _home_page_v_snapshot_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_snapshot_idx ON public._home_page_v USING btree (snapshot);


--
-- Name: _home_page_v_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_updated_at_idx ON public._home_page_v USING btree (updated_at);


--
-- Name: _home_page_v_version_stats_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _home_page_v_version_stats_locales_locale_parent_id_unique ON public._home_page_v_version_stats_locales USING btree (_locale, _parent_id);


--
-- Name: _home_page_v_version_stats_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_version_stats_order_idx ON public._home_page_v_version_stats USING btree (_order);


--
-- Name: _home_page_v_version_stats_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_version_stats_parent_id_idx ON public._home_page_v_version_stats USING btree (_parent_id);


--
-- Name: _home_page_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_version_version__status_idx ON public._home_page_v USING btree (version__status);


--
-- Name: _home_page_v_version_version_hero_poster_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_version_version_hero_poster_idx ON public._home_page_v USING btree (version_hero_poster_id);


--
-- Name: _home_page_v_version_version_hero_video_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _home_page_v_version_version_hero_video_idx ON public._home_page_v USING btree (version_hero_video_id);


--
-- Name: _jobs_v_autosave_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_autosave_idx ON public._jobs_v USING btree (autosave);


--
-- Name: _jobs_v_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_created_at_idx ON public._jobs_v USING btree (created_at);


--
-- Name: _jobs_v_latest_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_latest_idx ON public._jobs_v USING btree (latest);


--
-- Name: _jobs_v_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _jobs_v_locales_locale_parent_id_unique ON public._jobs_v_locales USING btree (_locale, _parent_id);


--
-- Name: _jobs_v_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_parent_idx ON public._jobs_v USING btree (parent_id);


--
-- Name: _jobs_v_published_locale_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_published_locale_idx ON public._jobs_v USING btree (published_locale);


--
-- Name: _jobs_v_snapshot_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_snapshot_idx ON public._jobs_v USING btree (snapshot);


--
-- Name: _jobs_v_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_updated_at_idx ON public._jobs_v USING btree (updated_at);


--
-- Name: _jobs_v_version_meta_version_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_version_meta_version_meta_image_idx ON public._jobs_v_locales USING btree (version_meta_image_id, _locale);


--
-- Name: _jobs_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_version_version__status_idx ON public._jobs_v USING btree (version__status);


--
-- Name: _jobs_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_version_version_created_at_idx ON public._jobs_v USING btree (version_created_at);


--
-- Name: _jobs_v_version_version_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_version_version_slug_idx ON public._jobs_v USING btree (version_slug);


--
-- Name: _jobs_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _jobs_v_version_version_updated_at_idx ON public._jobs_v USING btree (version_updated_at);


--
-- Name: _pages_v_autosave_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_autosave_idx ON public._pages_v USING btree (autosave);


--
-- Name: _pages_v_blocks_cta_buttons_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _pages_v_blocks_cta_buttons_locales_locale_parent_id_unique ON public._pages_v_blocks_cta_buttons_locales USING btree (_locale, _parent_id);


--
-- Name: _pages_v_blocks_cta_buttons_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_buttons_order_idx ON public._pages_v_blocks_cta_buttons USING btree (_order);


--
-- Name: _pages_v_blocks_cta_buttons_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_buttons_parent_id_idx ON public._pages_v_blocks_cta_buttons USING btree (_parent_id);


--
-- Name: _pages_v_blocks_cta_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _pages_v_blocks_cta_locales_locale_parent_id_unique ON public._pages_v_blocks_cta_locales USING btree (_locale, _parent_id);


--
-- Name: _pages_v_blocks_cta_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_order_idx ON public._pages_v_blocks_cta USING btree (_order);


--
-- Name: _pages_v_blocks_cta_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_parent_id_idx ON public._pages_v_blocks_cta USING btree (_parent_id);


--
-- Name: _pages_v_blocks_cta_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_path_idx ON public._pages_v_blocks_cta USING btree (_path);


--
-- Name: _pages_v_blocks_gallery_images_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_gallery_images_image_idx ON public._pages_v_blocks_gallery_images USING btree (image_id);


--
-- Name: _pages_v_blocks_gallery_images_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_gallery_images_order_idx ON public._pages_v_blocks_gallery_images USING btree (_order);


--
-- Name: _pages_v_blocks_gallery_images_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_gallery_images_parent_id_idx ON public._pages_v_blocks_gallery_images USING btree (_parent_id);


--
-- Name: _pages_v_blocks_gallery_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_gallery_order_idx ON public._pages_v_blocks_gallery USING btree (_order);


--
-- Name: _pages_v_blocks_gallery_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_gallery_parent_id_idx ON public._pages_v_blocks_gallery USING btree (_parent_id);


--
-- Name: _pages_v_blocks_gallery_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_gallery_path_idx ON public._pages_v_blocks_gallery USING btree (_path);


--
-- Name: _pages_v_blocks_media_block_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _pages_v_blocks_media_block_locales_locale_parent_id_unique ON public._pages_v_blocks_media_block_locales USING btree (_locale, _parent_id);


--
-- Name: _pages_v_blocks_media_block_media_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_media_block_media_idx ON public._pages_v_blocks_media_block USING btree (media_id);


--
-- Name: _pages_v_blocks_media_block_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_media_block_order_idx ON public._pages_v_blocks_media_block USING btree (_order);


--
-- Name: _pages_v_blocks_media_block_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_media_block_parent_id_idx ON public._pages_v_blocks_media_block USING btree (_parent_id);


--
-- Name: _pages_v_blocks_media_block_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_media_block_path_idx ON public._pages_v_blocks_media_block USING btree (_path);


--
-- Name: _pages_v_blocks_quote_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _pages_v_blocks_quote_locales_locale_parent_id_unique ON public._pages_v_blocks_quote_locales USING btree (_locale, _parent_id);


--
-- Name: _pages_v_blocks_quote_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_quote_order_idx ON public._pages_v_blocks_quote USING btree (_order);


--
-- Name: _pages_v_blocks_quote_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_quote_parent_id_idx ON public._pages_v_blocks_quote USING btree (_parent_id);


--
-- Name: _pages_v_blocks_quote_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_quote_path_idx ON public._pages_v_blocks_quote USING btree (_path);


--
-- Name: _pages_v_blocks_rich_text_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _pages_v_blocks_rich_text_locales_locale_parent_id_unique ON public._pages_v_blocks_rich_text_locales USING btree (_locale, _parent_id);


--
-- Name: _pages_v_blocks_rich_text_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_rich_text_order_idx ON public._pages_v_blocks_rich_text USING btree (_order);


--
-- Name: _pages_v_blocks_rich_text_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_rich_text_parent_id_idx ON public._pages_v_blocks_rich_text USING btree (_parent_id);


--
-- Name: _pages_v_blocks_rich_text_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_rich_text_path_idx ON public._pages_v_blocks_rich_text USING btree (_path);


--
-- Name: _pages_v_blocks_stats_items_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _pages_v_blocks_stats_items_locales_locale_parent_id_unique ON public._pages_v_blocks_stats_items_locales USING btree (_locale, _parent_id);


--
-- Name: _pages_v_blocks_stats_items_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_stats_items_order_idx ON public._pages_v_blocks_stats_items USING btree (_order);


--
-- Name: _pages_v_blocks_stats_items_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_stats_items_parent_id_idx ON public._pages_v_blocks_stats_items USING btree (_parent_id);


--
-- Name: _pages_v_blocks_stats_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _pages_v_blocks_stats_locales_locale_parent_id_unique ON public._pages_v_blocks_stats_locales USING btree (_locale, _parent_id);


--
-- Name: _pages_v_blocks_stats_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_stats_order_idx ON public._pages_v_blocks_stats USING btree (_order);


--
-- Name: _pages_v_blocks_stats_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_stats_parent_id_idx ON public._pages_v_blocks_stats USING btree (_parent_id);


--
-- Name: _pages_v_blocks_stats_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_stats_path_idx ON public._pages_v_blocks_stats USING btree (_path);


--
-- Name: _pages_v_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_created_at_idx ON public._pages_v USING btree (created_at);


--
-- Name: _pages_v_latest_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_latest_idx ON public._pages_v USING btree (latest);


--
-- Name: _pages_v_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _pages_v_locales_locale_parent_id_unique ON public._pages_v_locales USING btree (_locale, _parent_id);


--
-- Name: _pages_v_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_parent_idx ON public._pages_v USING btree (parent_id);


--
-- Name: _pages_v_published_locale_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_published_locale_idx ON public._pages_v USING btree (published_locale);


--
-- Name: _pages_v_snapshot_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_snapshot_idx ON public._pages_v USING btree (snapshot);


--
-- Name: _pages_v_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_updated_at_idx ON public._pages_v USING btree (updated_at);


--
-- Name: _pages_v_version_breadcrumbs_doc_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_breadcrumbs_doc_idx ON public._pages_v_version_breadcrumbs USING btree (doc_id);


--
-- Name: _pages_v_version_breadcrumbs_locale_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_breadcrumbs_locale_idx ON public._pages_v_version_breadcrumbs USING btree (_locale);


--
-- Name: _pages_v_version_breadcrumbs_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_breadcrumbs_order_idx ON public._pages_v_version_breadcrumbs USING btree (_order);


--
-- Name: _pages_v_version_breadcrumbs_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_breadcrumbs_parent_id_idx ON public._pages_v_version_breadcrumbs USING btree (_parent_id);


--
-- Name: _pages_v_version_meta_version_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_meta_version_meta_image_idx ON public._pages_v_locales USING btree (version_meta_image_id, _locale);


--
-- Name: _pages_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version__status_idx ON public._pages_v USING btree (version__status);


--
-- Name: _pages_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version_created_at_idx ON public._pages_v USING btree (version_created_at);


--
-- Name: _pages_v_version_version_hero_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version_hero_image_idx ON public._pages_v USING btree (version_hero_image_id);


--
-- Name: _pages_v_version_version_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version_parent_idx ON public._pages_v USING btree (version_parent_id);


--
-- Name: _pages_v_version_version_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version_slug_idx ON public._pages_v USING btree (version_slug);


--
-- Name: _pages_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version_updated_at_idx ON public._pages_v USING btree (version_updated_at);


--
-- Name: _products_v_autosave_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_autosave_idx ON public._products_v USING btree (autosave);


--
-- Name: _products_v_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_created_at_idx ON public._products_v USING btree (created_at);


--
-- Name: _products_v_latest_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_latest_idx ON public._products_v USING btree (latest);


--
-- Name: _products_v_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _products_v_locales_locale_parent_id_unique ON public._products_v_locales USING btree (_locale, _parent_id);


--
-- Name: _products_v_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_parent_idx ON public._products_v USING btree (parent_id);


--
-- Name: _products_v_published_locale_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_published_locale_idx ON public._products_v USING btree (published_locale);


--
-- Name: _products_v_snapshot_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_snapshot_idx ON public._products_v USING btree (snapshot);


--
-- Name: _products_v_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_updated_at_idx ON public._products_v USING btree (updated_at);


--
-- Name: _products_v_version_gallery_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_gallery_image_idx ON public._products_v_version_gallery USING btree (image_id);


--
-- Name: _products_v_version_gallery_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_gallery_order_idx ON public._products_v_version_gallery USING btree (_order);


--
-- Name: _products_v_version_gallery_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_gallery_parent_id_idx ON public._products_v_version_gallery USING btree (_parent_id);


--
-- Name: _products_v_version_images360_frame_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_images360_frame_idx ON public._products_v_version_images360 USING btree (frame_id);


--
-- Name: _products_v_version_images360_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_images360_order_idx ON public._products_v_version_images360 USING btree (_order);


--
-- Name: _products_v_version_images360_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_images360_parent_id_idx ON public._products_v_version_images360 USING btree (_parent_id);


--
-- Name: _products_v_version_meta_version_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_meta_version_meta_image_idx ON public._products_v_locales USING btree (version_meta_image_id, _locale);


--
-- Name: _products_v_version_minerals_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX _products_v_version_minerals_locales_locale_parent_id_unique ON public._products_v_version_minerals_locales USING btree (_locale, _parent_id);


--
-- Name: _products_v_version_minerals_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_minerals_order_idx ON public._products_v_version_minerals USING btree (_order);


--
-- Name: _products_v_version_minerals_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_minerals_parent_id_idx ON public._products_v_version_minerals USING btree (_parent_id);


--
-- Name: _products_v_version_usage_tag_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_usage_tag_order_idx ON public._products_v_version_usage_tag USING btree ("order");


--
-- Name: _products_v_version_usage_tag_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_usage_tag_parent_idx ON public._products_v_version_usage_tag USING btree (parent_id);


--
-- Name: _products_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_version__status_idx ON public._products_v USING btree (version__status);


--
-- Name: _products_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_version_created_at_idx ON public._products_v USING btree (version_created_at);


--
-- Name: _products_v_version_version_packshot_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_version_packshot_idx ON public._products_v USING btree (version_packshot_id);


--
-- Name: _products_v_version_version_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_version_slug_idx ON public._products_v USING btree (version_slug);


--
-- Name: _products_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _products_v_version_version_updated_at_idx ON public._products_v USING btree (version_updated_at);


--
-- Name: activity_log_collection_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX activity_log_collection_slug_idx ON public.activity_log USING btree (collection_slug);


--
-- Name: activity_log_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX activity_log_created_at_idx ON public.activity_log USING btree (created_at);


--
-- Name: activity_log_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX activity_log_updated_at_idx ON public.activity_log USING btree (updated_at);


--
-- Name: activity_log_user_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX activity_log_user_idx ON public.activity_log USING btree (user_id);


--
-- Name: applications_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX applications_created_at_idx ON public.applications USING btree (created_at);


--
-- Name: applications_cv_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX applications_cv_idx ON public.applications USING btree (cv_id);


--
-- Name: applications_job_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX applications_job_idx ON public.applications USING btree (job_id);


--
-- Name: applications_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX applications_updated_at_idx ON public.applications USING btree (updated_at);


--
-- Name: article_categories_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX article_categories_created_at_idx ON public.article_categories USING btree (created_at);


--
-- Name: article_categories_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX article_categories_locales_locale_parent_id_unique ON public.article_categories_locales USING btree (_locale, _parent_id);


--
-- Name: article_categories_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX article_categories_slug_idx ON public.article_categories USING btree (slug);


--
-- Name: article_categories_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX article_categories_updated_at_idx ON public.article_categories USING btree (updated_at);


--
-- Name: articles__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles__status_idx ON public.articles USING btree (_status);


--
-- Name: articles_author_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_author_idx ON public.articles USING btree (author_id);


--
-- Name: articles_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_category_idx ON public.articles USING btree (category_id);


--
-- Name: articles_cover_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_cover_idx ON public.articles USING btree (cover_id);


--
-- Name: articles_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_created_at_idx ON public.articles USING btree (created_at);


--
-- Name: articles_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX articles_locales_locale_parent_id_unique ON public.articles_locales USING btree (_locale, _parent_id);


--
-- Name: articles_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_meta_meta_image_idx ON public.articles_locales USING btree (meta_image_id, _locale);


--
-- Name: articles_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX articles_slug_idx ON public.articles USING btree (slug);


--
-- Name: articles_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX articles_updated_at_idx ON public.articles USING btree (updated_at);


--
-- Name: banners_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX banners_created_at_idx ON public.banners USING btree (created_at);


--
-- Name: banners_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX banners_locales_locale_parent_id_unique ON public.banners_locales USING btree (_locale, _parent_id);


--
-- Name: banners_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX banners_updated_at_idx ON public.banners USING btree (updated_at);


--
-- Name: distributors_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX distributors_created_at_idx ON public.distributors USING btree (created_at);


--
-- Name: distributors_logo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX distributors_logo_idx ON public.distributors USING btree (logo_id);


--
-- Name: distributors_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX distributors_updated_at_idx ON public.distributors USING btree (updated_at);


--
-- Name: footer_columns_links_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX footer_columns_links_locales_locale_parent_id_unique ON public.footer_columns_links_locales USING btree (_locale, _parent_id);


--
-- Name: footer_columns_links_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_columns_links_order_idx ON public.footer_columns_links USING btree (_order);


--
-- Name: footer_columns_links_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_columns_links_parent_id_idx ON public.footer_columns_links USING btree (_parent_id);


--
-- Name: footer_columns_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX footer_columns_locales_locale_parent_id_unique ON public.footer_columns_locales USING btree (_locale, _parent_id);


--
-- Name: footer_columns_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_columns_order_idx ON public.footer_columns USING btree (_order);


--
-- Name: footer_columns_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_columns_parent_id_idx ON public.footer_columns USING btree (_parent_id);


--
-- Name: footer_legal_links_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX footer_legal_links_locales_locale_parent_id_unique ON public.footer_legal_links_locales USING btree (_locale, _parent_id);


--
-- Name: footer_legal_links_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_legal_links_order_idx ON public.footer_legal_links USING btree (_order);


--
-- Name: footer_legal_links_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_legal_links_parent_id_idx ON public.footer_legal_links USING btree (_parent_id);


--
-- Name: footer_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX footer_locales_locale_parent_id_unique ON public.footer_locales USING btree (_locale, _parent_id);


--
-- Name: home_page__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX home_page__status_idx ON public.home_page USING btree (_status);


--
-- Name: home_page_hero_poster_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX home_page_hero_poster_idx ON public.home_page USING btree (hero_poster_id);


--
-- Name: home_page_hero_video_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX home_page_hero_video_idx ON public.home_page USING btree (hero_video_id);


--
-- Name: home_page_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX home_page_locales_locale_parent_id_unique ON public.home_page_locales USING btree (_locale, _parent_id);


--
-- Name: home_page_stats_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX home_page_stats_locales_locale_parent_id_unique ON public.home_page_stats_locales USING btree (_locale, _parent_id);


--
-- Name: home_page_stats_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX home_page_stats_order_idx ON public.home_page_stats USING btree (_order);


--
-- Name: home_page_stats_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX home_page_stats_parent_id_idx ON public.home_page_stats USING btree (_parent_id);


--
-- Name: jobs__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs__status_idx ON public.jobs USING btree (_status);


--
-- Name: jobs_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_created_at_idx ON public.jobs USING btree (created_at);


--
-- Name: jobs_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX jobs_locales_locale_parent_id_unique ON public.jobs_locales USING btree (_locale, _parent_id);


--
-- Name: jobs_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_meta_meta_image_idx ON public.jobs_locales USING btree (meta_image_id, _locale);


--
-- Name: jobs_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX jobs_slug_idx ON public.jobs USING btree (slug);


--
-- Name: jobs_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_updated_at_idx ON public.jobs USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_locales_locale_parent_id_unique ON public.media_locales USING btree (_locale, _parent_id);


--
-- Name: media_sizes_card_sizes_card_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_card_sizes_card_filename_idx ON public.media USING btree (sizes_card_filename);


--
-- Name: media_sizes_feature_sizes_feature_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_feature_sizes_feature_filename_idx ON public.media USING btree (sizes_feature_filename);


--
-- Name: media_sizes_hero_sizes_hero_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_hero_sizes_hero_filename_idx ON public.media USING btree (sizes_hero_filename);


--
-- Name: media_sizes_og_sizes_og_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_og_sizes_og_filename_idx ON public.media USING btree (sizes_og_filename);


--
-- Name: media_sizes_thumbnail_sizes_thumbnail_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: messages_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_created_at_idx ON public.messages USING btree (created_at);


--
-- Name: messages_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_updated_at_idx ON public.messages USING btree (updated_at);


--
-- Name: navigation_primary_children_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX navigation_primary_children_locales_locale_parent_id_unique ON public.navigation_primary_children_locales USING btree (_locale, _parent_id);


--
-- Name: navigation_primary_children_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX navigation_primary_children_order_idx ON public.navigation_primary_children USING btree (_order);


--
-- Name: navigation_primary_children_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX navigation_primary_children_parent_id_idx ON public.navigation_primary_children USING btree (_parent_id);


--
-- Name: navigation_primary_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX navigation_primary_locales_locale_parent_id_unique ON public.navigation_primary_locales USING btree (_locale, _parent_id);


--
-- Name: navigation_primary_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX navigation_primary_order_idx ON public.navigation_primary USING btree (_order);


--
-- Name: navigation_primary_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX navigation_primary_parent_id_idx ON public.navigation_primary USING btree (_parent_id);


--
-- Name: newsletter_subscribers_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX newsletter_subscribers_created_at_idx ON public.newsletter_subscribers USING btree (created_at);


--
-- Name: newsletter_subscribers_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX newsletter_subscribers_email_idx ON public.newsletter_subscribers USING btree (email);


--
-- Name: newsletter_subscribers_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX newsletter_subscribers_updated_at_idx ON public.newsletter_subscribers USING btree (updated_at);


--
-- Name: orders_account_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_account_idx ON public.orders USING btree (account_id);


--
-- Name: orders_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_created_at_idx ON public.orders USING btree (created_at);


--
-- Name: orders_lines_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_lines_order_idx ON public.orders_lines USING btree (_order);


--
-- Name: orders_lines_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_lines_parent_id_idx ON public.orders_lines USING btree (_parent_id);


--
-- Name: orders_lines_product_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_lines_product_idx ON public.orders_lines USING btree (product_id);


--
-- Name: orders_reference_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX orders_reference_idx ON public.orders USING btree (reference);


--
-- Name: orders_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX orders_updated_at_idx ON public.orders USING btree (updated_at);


--
-- Name: pages__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages__status_idx ON public.pages USING btree (_status);


--
-- Name: pages_blocks_cta_buttons_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pages_blocks_cta_buttons_locales_locale_parent_id_unique ON public.pages_blocks_cta_buttons_locales USING btree (_locale, _parent_id);


--
-- Name: pages_blocks_cta_buttons_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_buttons_order_idx ON public.pages_blocks_cta_buttons USING btree (_order);


--
-- Name: pages_blocks_cta_buttons_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_buttons_parent_id_idx ON public.pages_blocks_cta_buttons USING btree (_parent_id);


--
-- Name: pages_blocks_cta_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pages_blocks_cta_locales_locale_parent_id_unique ON public.pages_blocks_cta_locales USING btree (_locale, _parent_id);


--
-- Name: pages_blocks_cta_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_order_idx ON public.pages_blocks_cta USING btree (_order);


--
-- Name: pages_blocks_cta_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_parent_id_idx ON public.pages_blocks_cta USING btree (_parent_id);


--
-- Name: pages_blocks_cta_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_path_idx ON public.pages_blocks_cta USING btree (_path);


--
-- Name: pages_blocks_gallery_images_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_gallery_images_image_idx ON public.pages_blocks_gallery_images USING btree (image_id);


--
-- Name: pages_blocks_gallery_images_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_gallery_images_order_idx ON public.pages_blocks_gallery_images USING btree (_order);


--
-- Name: pages_blocks_gallery_images_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_gallery_images_parent_id_idx ON public.pages_blocks_gallery_images USING btree (_parent_id);


--
-- Name: pages_blocks_gallery_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_gallery_order_idx ON public.pages_blocks_gallery USING btree (_order);


--
-- Name: pages_blocks_gallery_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_gallery_parent_id_idx ON public.pages_blocks_gallery USING btree (_parent_id);


--
-- Name: pages_blocks_gallery_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_gallery_path_idx ON public.pages_blocks_gallery USING btree (_path);


--
-- Name: pages_blocks_media_block_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pages_blocks_media_block_locales_locale_parent_id_unique ON public.pages_blocks_media_block_locales USING btree (_locale, _parent_id);


--
-- Name: pages_blocks_media_block_media_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_media_block_media_idx ON public.pages_blocks_media_block USING btree (media_id);


--
-- Name: pages_blocks_media_block_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_media_block_order_idx ON public.pages_blocks_media_block USING btree (_order);


--
-- Name: pages_blocks_media_block_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_media_block_parent_id_idx ON public.pages_blocks_media_block USING btree (_parent_id);


--
-- Name: pages_blocks_media_block_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_media_block_path_idx ON public.pages_blocks_media_block USING btree (_path);


--
-- Name: pages_blocks_quote_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pages_blocks_quote_locales_locale_parent_id_unique ON public.pages_blocks_quote_locales USING btree (_locale, _parent_id);


--
-- Name: pages_blocks_quote_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_quote_order_idx ON public.pages_blocks_quote USING btree (_order);


--
-- Name: pages_blocks_quote_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_quote_parent_id_idx ON public.pages_blocks_quote USING btree (_parent_id);


--
-- Name: pages_blocks_quote_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_quote_path_idx ON public.pages_blocks_quote USING btree (_path);


--
-- Name: pages_blocks_rich_text_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pages_blocks_rich_text_locales_locale_parent_id_unique ON public.pages_blocks_rich_text_locales USING btree (_locale, _parent_id);


--
-- Name: pages_blocks_rich_text_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_rich_text_order_idx ON public.pages_blocks_rich_text USING btree (_order);


--
-- Name: pages_blocks_rich_text_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_rich_text_parent_id_idx ON public.pages_blocks_rich_text USING btree (_parent_id);


--
-- Name: pages_blocks_rich_text_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_rich_text_path_idx ON public.pages_blocks_rich_text USING btree (_path);


--
-- Name: pages_blocks_stats_items_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pages_blocks_stats_items_locales_locale_parent_id_unique ON public.pages_blocks_stats_items_locales USING btree (_locale, _parent_id);


--
-- Name: pages_blocks_stats_items_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_stats_items_order_idx ON public.pages_blocks_stats_items USING btree (_order);


--
-- Name: pages_blocks_stats_items_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_stats_items_parent_id_idx ON public.pages_blocks_stats_items USING btree (_parent_id);


--
-- Name: pages_blocks_stats_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pages_blocks_stats_locales_locale_parent_id_unique ON public.pages_blocks_stats_locales USING btree (_locale, _parent_id);


--
-- Name: pages_blocks_stats_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_stats_order_idx ON public.pages_blocks_stats USING btree (_order);


--
-- Name: pages_blocks_stats_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_stats_parent_id_idx ON public.pages_blocks_stats USING btree (_parent_id);


--
-- Name: pages_blocks_stats_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_stats_path_idx ON public.pages_blocks_stats USING btree (_path);


--
-- Name: pages_breadcrumbs_doc_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_breadcrumbs_doc_idx ON public.pages_breadcrumbs USING btree (doc_id);


--
-- Name: pages_breadcrumbs_locale_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_breadcrumbs_locale_idx ON public.pages_breadcrumbs USING btree (_locale);


--
-- Name: pages_breadcrumbs_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_breadcrumbs_order_idx ON public.pages_breadcrumbs USING btree (_order);


--
-- Name: pages_breadcrumbs_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_breadcrumbs_parent_id_idx ON public.pages_breadcrumbs USING btree (_parent_id);


--
-- Name: pages_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_created_at_idx ON public.pages USING btree (created_at);


--
-- Name: pages_hero_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_hero_image_idx ON public.pages USING btree (hero_image_id);


--
-- Name: pages_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pages_locales_locale_parent_id_unique ON public.pages_locales USING btree (_locale, _parent_id);


--
-- Name: pages_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_meta_meta_image_idx ON public.pages_locales USING btree (meta_image_id, _locale);


--
-- Name: pages_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_parent_idx ON public.pages USING btree (parent_id);


--
-- Name: pages_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pages_slug_idx ON public.pages USING btree (slug);


--
-- Name: pages_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_updated_at_idx ON public.pages USING btree (updated_at);


--
-- Name: payload_jobs_completed_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_completed_at_idx ON public.payload_jobs USING btree (completed_at);


--
-- Name: payload_jobs_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_created_at_idx ON public.payload_jobs USING btree (created_at);


--
-- Name: payload_jobs_has_error_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_has_error_idx ON public.payload_jobs USING btree (has_error);


--
-- Name: payload_jobs_log_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_log_order_idx ON public.payload_jobs_log USING btree (_order);


--
-- Name: payload_jobs_log_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_log_parent_id_idx ON public.payload_jobs_log USING btree (_parent_id);


--
-- Name: payload_jobs_processing_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_processing_idx ON public.payload_jobs USING btree (processing);


--
-- Name: payload_jobs_queue_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_queue_idx ON public.payload_jobs USING btree (queue);


--
-- Name: payload_jobs_task_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_task_slug_idx ON public.payload_jobs USING btree (task_slug);


--
-- Name: payload_jobs_total_tried_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_total_tried_idx ON public.payload_jobs USING btree (total_tried);


--
-- Name: payload_jobs_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_updated_at_idx ON public.payload_jobs USING btree (updated_at);


--
-- Name: payload_jobs_wait_until_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_wait_until_idx ON public.payload_jobs USING btree (wait_until);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_activity_log_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_activity_log_id_idx ON public.payload_locked_documents_rels USING btree (activity_log_id);


--
-- Name: payload_locked_documents_rels_applications_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_applications_id_idx ON public.payload_locked_documents_rels USING btree (applications_id);


--
-- Name: payload_locked_documents_rels_article_categories_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_article_categories_id_idx ON public.payload_locked_documents_rels USING btree (article_categories_id);


--
-- Name: payload_locked_documents_rels_articles_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_articles_id_idx ON public.payload_locked_documents_rels USING btree (articles_id);


--
-- Name: payload_locked_documents_rels_banners_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_banners_id_idx ON public.payload_locked_documents_rels USING btree (banners_id);


--
-- Name: payload_locked_documents_rels_distributors_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_distributors_id_idx ON public.payload_locked_documents_rels USING btree (distributors_id);


--
-- Name: payload_locked_documents_rels_jobs_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_jobs_id_idx ON public.payload_locked_documents_rels USING btree (jobs_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_messages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_messages_id_idx ON public.payload_locked_documents_rels USING btree (messages_id);


--
-- Name: payload_locked_documents_rels_newsletter_subscribers_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_newsletter_subscribers_id_idx ON public.payload_locked_documents_rels USING btree (newsletter_subscribers_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_orders_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_orders_id_idx ON public.payload_locked_documents_rels USING btree (orders_id);


--
-- Name: payload_locked_documents_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_pages_id_idx ON public.payload_locked_documents_rels USING btree (pages_id);


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_points_of_sale_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_points_of_sale_id_idx ON public.payload_locked_documents_rels USING btree (points_of_sale_id);


--
-- Name: payload_locked_documents_rels_press_kit_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_press_kit_id_idx ON public.payload_locked_documents_rels USING btree (press_kit_id);


--
-- Name: payload_locked_documents_rels_pro_accounts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_pro_accounts_id_idx ON public.payload_locked_documents_rels USING btree (pro_accounts_id);


--
-- Name: payload_locked_documents_rels_products_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_products_id_idx ON public.payload_locked_documents_rels USING btree (products_id);


--
-- Name: payload_locked_documents_rels_search_index_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_search_index_id_idx ON public.payload_locked_documents_rels USING btree (search_index_id);


--
-- Name: payload_locked_documents_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_testimonials_id_idx ON public.payload_locked_documents_rels USING btree (testimonials_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_pro_accounts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_pro_accounts_id_idx ON public.payload_preferences_rels USING btree (pro_accounts_id);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: points_of_sale_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX points_of_sale_created_at_idx ON public.points_of_sale USING btree (created_at);


--
-- Name: points_of_sale_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX points_of_sale_updated_at_idx ON public.points_of_sale USING btree (updated_at);


--
-- Name: press_kit_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX press_kit_created_at_idx ON public.press_kit USING btree (created_at);


--
-- Name: press_kit_file_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX press_kit_file_idx ON public.press_kit USING btree (file_id);


--
-- Name: press_kit_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX press_kit_locales_locale_parent_id_unique ON public.press_kit_locales USING btree (_locale, _parent_id);


--
-- Name: press_kit_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX press_kit_updated_at_idx ON public.press_kit USING btree (updated_at);


--
-- Name: pro_accounts_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pro_accounts_created_at_idx ON public.pro_accounts USING btree (created_at);


--
-- Name: pro_accounts_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX pro_accounts_email_idx ON public.pro_accounts USING btree (email);


--
-- Name: pro_accounts_sessions_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pro_accounts_sessions_order_idx ON public.pro_accounts_sessions USING btree (_order);


--
-- Name: pro_accounts_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pro_accounts_sessions_parent_id_idx ON public.pro_accounts_sessions USING btree (_parent_id);


--
-- Name: pro_accounts_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pro_accounts_updated_at_idx ON public.pro_accounts USING btree (updated_at);


--
-- Name: products__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products__status_idx ON public.products USING btree (_status);


--
-- Name: products_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_created_at_idx ON public.products USING btree (created_at);


--
-- Name: products_gallery_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_gallery_image_idx ON public.products_gallery USING btree (image_id);


--
-- Name: products_gallery_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_gallery_order_idx ON public.products_gallery USING btree (_order);


--
-- Name: products_gallery_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_gallery_parent_id_idx ON public.products_gallery USING btree (_parent_id);


--
-- Name: products_images360_frame_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_images360_frame_idx ON public.products_images360 USING btree (frame_id);


--
-- Name: products_images360_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_images360_order_idx ON public.products_images360 USING btree (_order);


--
-- Name: products_images360_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_images360_parent_id_idx ON public.products_images360 USING btree (_parent_id);


--
-- Name: products_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX products_locales_locale_parent_id_unique ON public.products_locales USING btree (_locale, _parent_id);


--
-- Name: products_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_meta_meta_image_idx ON public.products_locales USING btree (meta_image_id, _locale);


--
-- Name: products_minerals_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX products_minerals_locales_locale_parent_id_unique ON public.products_minerals_locales USING btree (_locale, _parent_id);


--
-- Name: products_minerals_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_minerals_order_idx ON public.products_minerals USING btree (_order);


--
-- Name: products_minerals_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_minerals_parent_id_idx ON public.products_minerals USING btree (_parent_id);


--
-- Name: products_packshot_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_packshot_idx ON public.products USING btree (packshot_id);


--
-- Name: products_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX products_slug_idx ON public.products USING btree (slug);


--
-- Name: products_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_updated_at_idx ON public.products USING btree (updated_at);


--
-- Name: products_usage_tag_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_usage_tag_order_idx ON public.products_usage_tag USING btree ("order");


--
-- Name: products_usage_tag_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_usage_tag_parent_idx ON public.products_usage_tag USING btree (parent_id);


--
-- Name: search_index_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_index_created_at_idx ON public.search_index USING btree (created_at);


--
-- Name: search_index_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX search_index_locales_locale_parent_id_unique ON public.search_index_locales USING btree (_locale, _parent_id);


--
-- Name: search_index_rels_articles_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_index_rels_articles_id_idx ON public.search_index_rels USING btree (articles_id);


--
-- Name: search_index_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_index_rels_order_idx ON public.search_index_rels USING btree ("order");


--
-- Name: search_index_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_index_rels_pages_id_idx ON public.search_index_rels USING btree (pages_id);


--
-- Name: search_index_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_index_rels_parent_idx ON public.search_index_rels USING btree (parent_id);


--
-- Name: search_index_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_index_rels_path_idx ON public.search_index_rels USING btree (path);


--
-- Name: search_index_rels_products_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_index_rels_products_id_idx ON public.search_index_rels USING btree (products_id);


--
-- Name: search_index_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_index_updated_at_idx ON public.search_index USING btree (updated_at);


--
-- Name: site_settings_default_og_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX site_settings_default_og_image_idx ON public.site_settings USING btree (default_og_image_id);


--
-- Name: site_settings_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX site_settings_locales_locale_parent_id_unique ON public.site_settings_locales USING btree (_locale, _parent_id);


--
-- Name: site_settings_socials_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX site_settings_socials_order_idx ON public.site_settings_socials USING btree (_order);


--
-- Name: site_settings_socials_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX site_settings_socials_parent_id_idx ON public.site_settings_socials USING btree (_parent_id);


--
-- Name: testimonials_avatar_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX testimonials_avatar_idx ON public.testimonials USING btree (avatar_id);


--
-- Name: testimonials_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX testimonials_created_at_idx ON public.testimonials USING btree (created_at);


--
-- Name: testimonials_locales_locale_parent_id_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX testimonials_locales_locale_parent_id_unique ON public.testimonials_locales USING btree (_locale, _parent_id);


--
-- Name: testimonials_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX testimonials_updated_at_idx ON public.testimonials USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_roles_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_roles_order_idx ON public.users_roles USING btree ("order");


--
-- Name: users_roles_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_roles_parent_idx ON public.users_roles USING btree (parent_id);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: _articles_v_locales _articles_v_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v_locales
    ADD CONSTRAINT _articles_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._articles_v(id) ON DELETE CASCADE;


--
-- Name: _articles_v_locales _articles_v_locales_version_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v_locales
    ADD CONSTRAINT _articles_v_locales_version_meta_image_id_media_id_fk FOREIGN KEY (version_meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _articles_v _articles_v_parent_id_articles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v
    ADD CONSTRAINT _articles_v_parent_id_articles_id_fk FOREIGN KEY (parent_id) REFERENCES public.articles(id) ON DELETE SET NULL;


--
-- Name: _articles_v _articles_v_version_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v
    ADD CONSTRAINT _articles_v_version_author_id_users_id_fk FOREIGN KEY (version_author_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: _articles_v _articles_v_version_category_id_article_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v
    ADD CONSTRAINT _articles_v_version_category_id_article_categories_id_fk FOREIGN KEY (version_category_id) REFERENCES public.article_categories(id) ON DELETE SET NULL;


--
-- Name: _articles_v _articles_v_version_cover_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._articles_v
    ADD CONSTRAINT _articles_v_version_cover_id_media_id_fk FOREIGN KEY (version_cover_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _home_page_v_locales _home_page_v_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v_locales
    ADD CONSTRAINT _home_page_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._home_page_v(id) ON DELETE CASCADE;


--
-- Name: _home_page_v _home_page_v_version_hero_poster_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v
    ADD CONSTRAINT _home_page_v_version_hero_poster_id_media_id_fk FOREIGN KEY (version_hero_poster_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _home_page_v _home_page_v_version_hero_video_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v
    ADD CONSTRAINT _home_page_v_version_hero_video_id_media_id_fk FOREIGN KEY (version_hero_video_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _home_page_v_version_stats_locales _home_page_v_version_stats_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v_version_stats_locales
    ADD CONSTRAINT _home_page_v_version_stats_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._home_page_v_version_stats(id) ON DELETE CASCADE;


--
-- Name: _home_page_v_version_stats _home_page_v_version_stats_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._home_page_v_version_stats
    ADD CONSTRAINT _home_page_v_version_stats_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._home_page_v(id) ON DELETE CASCADE;


--
-- Name: _jobs_v_locales _jobs_v_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._jobs_v_locales
    ADD CONSTRAINT _jobs_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._jobs_v(id) ON DELETE CASCADE;


--
-- Name: _jobs_v_locales _jobs_v_locales_version_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._jobs_v_locales
    ADD CONSTRAINT _jobs_v_locales_version_meta_image_id_media_id_fk FOREIGN KEY (version_meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _jobs_v _jobs_v_parent_id_jobs_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._jobs_v
    ADD CONSTRAINT _jobs_v_parent_id_jobs_id_fk FOREIGN KEY (parent_id) REFERENCES public.jobs(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_cta_buttons_locales _pages_v_blocks_cta_buttons_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_buttons_locales
    ADD CONSTRAINT _pages_v_blocks_cta_buttons_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_cta_buttons(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_cta_buttons _pages_v_blocks_cta_buttons_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_buttons
    ADD CONSTRAINT _pages_v_blocks_cta_buttons_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_cta(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_cta_locales _pages_v_blocks_cta_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_locales
    ADD CONSTRAINT _pages_v_blocks_cta_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_cta(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_cta _pages_v_blocks_cta_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta
    ADD CONSTRAINT _pages_v_blocks_cta_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_gallery_images _pages_v_blocks_gallery_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_gallery_images
    ADD CONSTRAINT _pages_v_blocks_gallery_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_gallery_images _pages_v_blocks_gallery_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_gallery_images
    ADD CONSTRAINT _pages_v_blocks_gallery_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_gallery(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_gallery _pages_v_blocks_gallery_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_gallery
    ADD CONSTRAINT _pages_v_blocks_gallery_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_media_block_locales _pages_v_blocks_media_block_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block_locales
    ADD CONSTRAINT _pages_v_blocks_media_block_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_media_block(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_media_block _pages_v_blocks_media_block_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block
    ADD CONSTRAINT _pages_v_blocks_media_block_media_id_media_id_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_media_block _pages_v_blocks_media_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block
    ADD CONSTRAINT _pages_v_blocks_media_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_quote_locales _pages_v_blocks_quote_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_quote_locales
    ADD CONSTRAINT _pages_v_blocks_quote_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_quote(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_quote _pages_v_blocks_quote_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_quote
    ADD CONSTRAINT _pages_v_blocks_quote_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_rich_text_locales _pages_v_blocks_rich_text_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_rich_text_locales
    ADD CONSTRAINT _pages_v_blocks_rich_text_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_rich_text(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_rich_text _pages_v_blocks_rich_text_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_rich_text
    ADD CONSTRAINT _pages_v_blocks_rich_text_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_stats_items_locales _pages_v_blocks_stats_items_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats_items_locales
    ADD CONSTRAINT _pages_v_blocks_stats_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_stats_items(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_stats_items _pages_v_blocks_stats_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats_items
    ADD CONSTRAINT _pages_v_blocks_stats_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_stats(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_stats_locales _pages_v_blocks_stats_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats_locales
    ADD CONSTRAINT _pages_v_blocks_stats_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_stats(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_stats _pages_v_blocks_stats_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_stats
    ADD CONSTRAINT _pages_v_blocks_stats_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_locales _pages_v_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_locales
    ADD CONSTRAINT _pages_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_locales _pages_v_locales_version_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_locales
    ADD CONSTRAINT _pages_v_locales_version_meta_image_id_media_id_fk FOREIGN KEY (version_meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v _pages_v_parent_id_pages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_parent_id_pages_id_fk FOREIGN KEY (parent_id) REFERENCES public.pages(id) ON DELETE SET NULL;


--
-- Name: _pages_v_version_breadcrumbs _pages_v_version_breadcrumbs_doc_id_pages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_version_breadcrumbs
    ADD CONSTRAINT _pages_v_version_breadcrumbs_doc_id_pages_id_fk FOREIGN KEY (doc_id) REFERENCES public.pages(id) ON DELETE SET NULL;


--
-- Name: _pages_v_version_breadcrumbs _pages_v_version_breadcrumbs_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_version_breadcrumbs
    ADD CONSTRAINT _pages_v_version_breadcrumbs_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v _pages_v_version_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_version_hero_image_id_media_id_fk FOREIGN KEY (version_hero_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v _pages_v_version_parent_id_pages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_version_parent_id_pages_id_fk FOREIGN KEY (version_parent_id) REFERENCES public.pages(id) ON DELETE SET NULL;


--
-- Name: _products_v_locales _products_v_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_locales
    ADD CONSTRAINT _products_v_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._products_v(id) ON DELETE CASCADE;


--
-- Name: _products_v_locales _products_v_locales_version_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_locales
    ADD CONSTRAINT _products_v_locales_version_meta_image_id_media_id_fk FOREIGN KEY (version_meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _products_v _products_v_parent_id_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v
    ADD CONSTRAINT _products_v_parent_id_products_id_fk FOREIGN KEY (parent_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- Name: _products_v_version_gallery _products_v_version_gallery_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_gallery
    ADD CONSTRAINT _products_v_version_gallery_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _products_v_version_gallery _products_v_version_gallery_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_gallery
    ADD CONSTRAINT _products_v_version_gallery_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._products_v(id) ON DELETE CASCADE;


--
-- Name: _products_v_version_images360 _products_v_version_images360_frame_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_images360
    ADD CONSTRAINT _products_v_version_images360_frame_id_media_id_fk FOREIGN KEY (frame_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _products_v_version_images360 _products_v_version_images360_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_images360
    ADD CONSTRAINT _products_v_version_images360_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._products_v(id) ON DELETE CASCADE;


--
-- Name: _products_v_version_minerals_locales _products_v_version_minerals_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_minerals_locales
    ADD CONSTRAINT _products_v_version_minerals_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._products_v_version_minerals(id) ON DELETE CASCADE;


--
-- Name: _products_v_version_minerals _products_v_version_minerals_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_minerals
    ADD CONSTRAINT _products_v_version_minerals_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._products_v(id) ON DELETE CASCADE;


--
-- Name: _products_v _products_v_version_packshot_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v
    ADD CONSTRAINT _products_v_version_packshot_id_media_id_fk FOREIGN KEY (version_packshot_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _products_v_version_usage_tag _products_v_version_usage_tag_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._products_v_version_usage_tag
    ADD CONSTRAINT _products_v_version_usage_tag_parent_fk FOREIGN KEY (parent_id) REFERENCES public._products_v(id) ON DELETE CASCADE;


--
-- Name: activity_log activity_log_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_log
    ADD CONSTRAINT activity_log_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: applications applications_cv_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_cv_id_media_id_fk FOREIGN KEY (cv_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: applications applications_job_id_jobs_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_job_id_jobs_id_fk FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE SET NULL;


--
-- Name: article_categories_locales article_categories_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_categories_locales
    ADD CONSTRAINT article_categories_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.article_categories(id) ON DELETE CASCADE;


--
-- Name: articles articles_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: articles articles_category_id_article_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_category_id_article_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.article_categories(id) ON DELETE SET NULL;


--
-- Name: articles articles_cover_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_cover_id_media_id_fk FOREIGN KEY (cover_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: articles_locales articles_locales_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_locales
    ADD CONSTRAINT articles_locales_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: articles_locales articles_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles_locales
    ADD CONSTRAINT articles_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: banners_locales banners_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.banners_locales
    ADD CONSTRAINT banners_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.banners(id) ON DELETE CASCADE;


--
-- Name: distributors distributors_logo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.distributors
    ADD CONSTRAINT distributors_logo_id_media_id_fk FOREIGN KEY (logo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: footer_columns_links_locales footer_columns_links_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns_links_locales
    ADD CONSTRAINT footer_columns_links_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer_columns_links(id) ON DELETE CASCADE;


--
-- Name: footer_columns_links footer_columns_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns_links
    ADD CONSTRAINT footer_columns_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer_columns(id) ON DELETE CASCADE;


--
-- Name: footer_columns_locales footer_columns_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns_locales
    ADD CONSTRAINT footer_columns_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer_columns(id) ON DELETE CASCADE;


--
-- Name: footer_columns footer_columns_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_columns
    ADD CONSTRAINT footer_columns_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer(id) ON DELETE CASCADE;


--
-- Name: footer_legal_links_locales footer_legal_links_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_legal_links_locales
    ADD CONSTRAINT footer_legal_links_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer_legal_links(id) ON DELETE CASCADE;


--
-- Name: footer_legal_links footer_legal_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_legal_links
    ADD CONSTRAINT footer_legal_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer(id) ON DELETE CASCADE;


--
-- Name: footer_locales footer_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_locales
    ADD CONSTRAINT footer_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer(id) ON DELETE CASCADE;


--
-- Name: home_page home_page_hero_poster_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page
    ADD CONSTRAINT home_page_hero_poster_id_media_id_fk FOREIGN KEY (hero_poster_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: home_page home_page_hero_video_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page
    ADD CONSTRAINT home_page_hero_video_id_media_id_fk FOREIGN KEY (hero_video_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: home_page_locales home_page_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page_locales
    ADD CONSTRAINT home_page_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.home_page(id) ON DELETE CASCADE;


--
-- Name: home_page_stats_locales home_page_stats_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page_stats_locales
    ADD CONSTRAINT home_page_stats_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.home_page_stats(id) ON DELETE CASCADE;


--
-- Name: home_page_stats home_page_stats_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_page_stats
    ADD CONSTRAINT home_page_stats_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.home_page(id) ON DELETE CASCADE;


--
-- Name: jobs_locales jobs_locales_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs_locales
    ADD CONSTRAINT jobs_locales_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: jobs_locales jobs_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs_locales
    ADD CONSTRAINT jobs_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: media_locales media_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_locales
    ADD CONSTRAINT media_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: navigation_primary_children_locales navigation_primary_children_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary_children_locales
    ADD CONSTRAINT navigation_primary_children_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.navigation_primary_children(id) ON DELETE CASCADE;


--
-- Name: navigation_primary_children navigation_primary_children_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary_children
    ADD CONSTRAINT navigation_primary_children_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.navigation_primary(id) ON DELETE CASCADE;


--
-- Name: navigation_primary_locales navigation_primary_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary_locales
    ADD CONSTRAINT navigation_primary_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.navigation_primary(id) ON DELETE CASCADE;


--
-- Name: navigation_primary navigation_primary_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_primary
    ADD CONSTRAINT navigation_primary_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.navigation(id) ON DELETE CASCADE;


--
-- Name: orders orders_account_id_pro_accounts_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_account_id_pro_accounts_id_fk FOREIGN KEY (account_id) REFERENCES public.pro_accounts(id) ON DELETE SET NULL;


--
-- Name: orders_lines orders_lines_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders_lines
    ADD CONSTRAINT orders_lines_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: orders_lines orders_lines_product_id_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders_lines
    ADD CONSTRAINT orders_lines_product_id_products_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_cta_buttons_locales pages_blocks_cta_buttons_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_buttons_locales
    ADD CONSTRAINT pages_blocks_cta_buttons_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_cta_buttons(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_cta_buttons pages_blocks_cta_buttons_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_buttons
    ADD CONSTRAINT pages_blocks_cta_buttons_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_cta(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_cta_locales pages_blocks_cta_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_locales
    ADD CONSTRAINT pages_blocks_cta_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_cta(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_cta pages_blocks_cta_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta
    ADD CONSTRAINT pages_blocks_cta_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_gallery_images pages_blocks_gallery_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_gallery_images
    ADD CONSTRAINT pages_blocks_gallery_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_gallery_images pages_blocks_gallery_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_gallery_images
    ADD CONSTRAINT pages_blocks_gallery_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_gallery(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_gallery pages_blocks_gallery_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_gallery
    ADD CONSTRAINT pages_blocks_gallery_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_media_block_locales pages_blocks_media_block_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_media_block_locales
    ADD CONSTRAINT pages_blocks_media_block_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_media_block(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_media_block pages_blocks_media_block_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_media_block
    ADD CONSTRAINT pages_blocks_media_block_media_id_media_id_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_media_block pages_blocks_media_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_media_block
    ADD CONSTRAINT pages_blocks_media_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_quote_locales pages_blocks_quote_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_quote_locales
    ADD CONSTRAINT pages_blocks_quote_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_quote(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_quote pages_blocks_quote_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_quote
    ADD CONSTRAINT pages_blocks_quote_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_rich_text_locales pages_blocks_rich_text_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_rich_text_locales
    ADD CONSTRAINT pages_blocks_rich_text_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_rich_text(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_rich_text pages_blocks_rich_text_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_rich_text
    ADD CONSTRAINT pages_blocks_rich_text_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_stats_items_locales pages_blocks_stats_items_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats_items_locales
    ADD CONSTRAINT pages_blocks_stats_items_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_stats_items(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_stats_items pages_blocks_stats_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats_items
    ADD CONSTRAINT pages_blocks_stats_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_stats(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_stats_locales pages_blocks_stats_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats_locales
    ADD CONSTRAINT pages_blocks_stats_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_stats(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_stats pages_blocks_stats_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_stats
    ADD CONSTRAINT pages_blocks_stats_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_breadcrumbs pages_breadcrumbs_doc_id_pages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_breadcrumbs
    ADD CONSTRAINT pages_breadcrumbs_doc_id_pages_id_fk FOREIGN KEY (doc_id) REFERENCES public.pages(id) ON DELETE SET NULL;


--
-- Name: pages_breadcrumbs pages_breadcrumbs_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_breadcrumbs
    ADD CONSTRAINT pages_breadcrumbs_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages pages_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_hero_image_id_media_id_fk FOREIGN KEY (hero_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_locales pages_locales_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_locales
    ADD CONSTRAINT pages_locales_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_locales pages_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_locales
    ADD CONSTRAINT pages_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages pages_parent_id_pages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_parent_id_pages_id_fk FOREIGN KEY (parent_id) REFERENCES public.pages(id) ON DELETE SET NULL;


--
-- Name: payload_jobs_log payload_jobs_log_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_jobs_log
    ADD CONSTRAINT payload_jobs_log_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.payload_jobs(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_activity_log_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_activity_log_fk FOREIGN KEY (activity_log_id) REFERENCES public.activity_log(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_applications_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_applications_fk FOREIGN KEY (applications_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_article_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_article_categories_fk FOREIGN KEY (article_categories_id) REFERENCES public.article_categories(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_articles_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_articles_fk FOREIGN KEY (articles_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_banners_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_banners_fk FOREIGN KEY (banners_id) REFERENCES public.banners(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_distributors_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_distributors_fk FOREIGN KEY (distributors_id) REFERENCES public.distributors(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_jobs_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_jobs_fk FOREIGN KEY (jobs_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_messages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_messages_fk FOREIGN KEY (messages_id) REFERENCES public.messages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_newsletter_subscribers_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_newsletter_subscribers_fk FOREIGN KEY (newsletter_subscribers_id) REFERENCES public.newsletter_subscribers(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_orders_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_orders_fk FOREIGN KEY (orders_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_points_of_sale_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_points_of_sale_fk FOREIGN KEY (points_of_sale_id) REFERENCES public.points_of_sale(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_press_kit_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_press_kit_fk FOREIGN KEY (press_kit_id) REFERENCES public.press_kit(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pro_accounts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pro_accounts_fk FOREIGN KEY (pro_accounts_id) REFERENCES public.pro_accounts(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_search_index_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_search_index_fk FOREIGN KEY (search_index_id) REFERENCES public.search_index(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_pro_accounts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pro_accounts_fk FOREIGN KEY (pro_accounts_id) REFERENCES public.pro_accounts(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: press_kit press_kit_file_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.press_kit
    ADD CONSTRAINT press_kit_file_id_media_id_fk FOREIGN KEY (file_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: press_kit_locales press_kit_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.press_kit_locales
    ADD CONSTRAINT press_kit_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.press_kit(id) ON DELETE CASCADE;


--
-- Name: pro_accounts_sessions pro_accounts_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pro_accounts_sessions
    ADD CONSTRAINT pro_accounts_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pro_accounts(id) ON DELETE CASCADE;


--
-- Name: products_gallery products_gallery_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_gallery
    ADD CONSTRAINT products_gallery_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_gallery products_gallery_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_gallery
    ADD CONSTRAINT products_gallery_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_images360 products_images360_frame_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_images360
    ADD CONSTRAINT products_images360_frame_id_media_id_fk FOREIGN KEY (frame_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_images360 products_images360_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_images360
    ADD CONSTRAINT products_images360_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_locales products_locales_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_locales
    ADD CONSTRAINT products_locales_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_locales products_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_locales
    ADD CONSTRAINT products_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products_minerals_locales products_minerals_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_minerals_locales
    ADD CONSTRAINT products_minerals_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products_minerals(id) ON DELETE CASCADE;


--
-- Name: products_minerals products_minerals_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_minerals
    ADD CONSTRAINT products_minerals_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_packshot_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_packshot_id_media_id_fk FOREIGN KEY (packshot_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: products_usage_tag products_usage_tag_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_usage_tag
    ADD CONSTRAINT products_usage_tag_parent_fk FOREIGN KEY (parent_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: search_index_locales search_index_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index_locales
    ADD CONSTRAINT search_index_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.search_index(id) ON DELETE CASCADE;


--
-- Name: search_index_rels search_index_rels_articles_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index_rels
    ADD CONSTRAINT search_index_rels_articles_fk FOREIGN KEY (articles_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: search_index_rels search_index_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index_rels
    ADD CONSTRAINT search_index_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: search_index_rels search_index_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index_rels
    ADD CONSTRAINT search_index_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.search_index(id) ON DELETE CASCADE;


--
-- Name: search_index_rels search_index_rels_products_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_index_rels
    ADD CONSTRAINT search_index_rels_products_fk FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: site_settings site_settings_default_og_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_default_og_image_id_media_id_fk FOREIGN KEY (default_og_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: site_settings_locales site_settings_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings_locales
    ADD CONSTRAINT site_settings_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.site_settings(id) ON DELETE CASCADE;


--
-- Name: site_settings_socials site_settings_socials_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings_socials
    ADD CONSTRAINT site_settings_socials_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.site_settings(id) ON DELETE CASCADE;


--
-- Name: testimonials testimonials_avatar_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_avatar_id_media_id_fk FOREIGN KEY (avatar_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: testimonials_locales testimonials_locales_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials_locales
    ADD CONSTRAINT testimonials_locales_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: users_roles users_roles_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT users_roles_parent_fk FOREIGN KEY (parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


